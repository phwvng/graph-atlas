import threading
from flask import Flask, jsonify
import sqlite3
import json
import os
from dotenv import load_dotenv
from flask_cors import CORS

from graph import Graph  # Your custom class
from neo4jgraphs import Neo4jGraphFetcher
from supabasegraphs import SupabaseGraphFetcher
from scheduler import JobScheduler, GraphJob

# -------------------- CONFIG --------------------
DB_PATH = "graphs.db"
URI = "neo4j+ssc://demo.neo4jlabs.com"
DATASETS = ["northwind", "movies", "gameofthrones", "stackoverflow", "recommendations", "fincen", "twitter", "neoflix", "wordnet"]

# Load Supabase credentials
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

job_scheduler = JobScheduler(max_workers=4)

# -------------------- INIT DB --------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS graphs (
            id TEXT PRIMARY KEY,
            title TEXT,
            source TEXT,
            stats_json TEXT
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS datasets (
            id TEXT PRIMARY KEY,
            fetched BOOLEAN DEFAULT FALSE
        )
    ''')

    c.execute('CREATE INDEX IF NOT EXISTS idx_graphs_title ON graphs(title COLLATE NOCASE)')

    for dataset in DATASETS:
        c.execute('''
            INSERT OR IGNORE INTO datasets (id) VALUES (?)
        ''', (dataset,))
    
    conn.commit()
    conn.close()

# -------------------- DB UTILS --------------------
def save_graph_to_db(graph: Graph):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    stats_json = graph.to_json()
    c.execute('''
        INSERT OR REPLACE INTO graphs (id, title, source, stats_json)
        VALUES (?, ?, ?, ?)
    ''', (graph.id, graph.title, graph.source, stats_json))
    conn.commit()
    conn.close()

def graph_exists_in_db(graph_id: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT 1 FROM graphs WHERE id = ?", (graph_id,))
    exists = c.fetchone() is not None
    conn.close()
    return exists

def mark_dataset_as_fetched(dataset: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT OR REPLACE INTO datasets (id, fetched) VALUES (?, TRUE)
    ''', (dataset,))
    conn.commit()
    conn.close()

def is_dataset_fetched(dataset: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        SELECT fetched FROM datasets WHERE id = ?
    ''', (dataset,))
    result = c.fetchone()
    conn.close()
    return result and result[0] == 1

def get_all_graph_summaries():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, title, source FROM graphs")
    rows = c.fetchall()
    conn.close()
    summaries = [{"id": row[0], "title": row[1], "source": row[2]} for row in rows]
    return summaries

def get_graph_by_title_from_db(title):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT stats_json FROM graphs WHERE lower(title) = lower(?)", (title,))
    row = c.fetchone()
    conn.close()
    if row:
        return json.loads(row[0])[0]
    else:
        return None

# -------------------- FETCHERS --------------------
def fetch_and_cache_graph(graph_id):
    try:
        if is_dataset_fetched(graph_id):
            print(f"Graph {graph_id} already fetched. Skipping.")
            return None
        fetched_graph = Neo4jGraphFetcher.fetch_all_graphs(URI, [graph_id])
        graph = fetched_graph[0]
        graph.extract_statistics()
        graph.source = "neo4j"
        graph.title = graph.title or "untitled"
        save_graph_to_db(graph)
        mark_dataset_as_fetched(graph.id)
        print(f"Fetched and cached graph {graph_id}")
        return graph.get_statistics()
    except Exception as e:
        print(f"Neo4j fetch error for {graph_id}: {str(e)}")
        return {"error": f"Neo4j fetch error for {graph_id}: {str(e)}"}

def fetch_supabase_graphs():
    try:
        fetcher = SupabaseGraphFetcher(SUPABASE_URL, SUPABASE_KEY)
        graphs = fetcher.get_files_from_metadata()
        for i, G in enumerate(graphs):
            graph = Graph()
            graph.from_existing_graph(G)
            graph.extract_statistics()
            graph.source = "supabase"
            graph.id = graph.title = G.graph.get("title", f"supabase:{i}")
            graph.tags = G.graph.get("tags", [])

            if not is_dataset_fetched(graph.id):
                save_graph_to_db(graph)
                mark_dataset_as_fetched(graph.id)

    except Exception as e:
        print(f"Supabase fetch error: {str(e)}")

# -------------------- JOB INITIALIZATION --------------------
def initialize_jobs():
    for graph_id in DATASETS:
        if not is_dataset_fetched(graph_id):
            job = GraphJob(graph_id, fetch_and_cache_graph, graph_id)
            job_scheduler.schedule(job)

# -------------------- FLASK APP --------------------
app = Flask(__name__)
CORS(app)

init_db()
initialize_jobs()

@app.route('/graphs', methods=['GET'])
def list_graphs():
    try:
        graph_summaries = get_all_graph_summaries()
        return jsonify(graph_summaries)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/graphs/<graph_title>', methods=['GET'])
def get_graph_by_title(graph_title):
    try:
        graph = get_graph_by_title_from_db(graph_title)
        if graph:
            return jsonify(graph)
        else:
            return jsonify({"error": f"Graph with title '{graph_title}' not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/jobs', methods=['GET'])
def list_jobs():
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT id, status, start_time, end_time, progress FROM jobs")
        rows = c.fetchall()
        conn.close()

        jobs = []
        for row in rows:
            jobs.append({
                "id": row[0],
                "status": row[1],
                "start_time": row[2],
                "end_time": row[3],
                "progress": row[4]
            })

        return jsonify(jobs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/jobs/<graph_id>', methods=['GET'])
def get_job_status(graph_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT id, status, start_time, end_time, progress FROM jobs WHERE id = ?", (graph_id,))
        row = c.fetchone()
        conn.close()

        if row:
            job = {
                "id": row[0],
                "status": row[1],
                "start_time": row[2],
                "end_time": row[3],
                "progress": row[4]
            }
            return jsonify(job)
        else:
            return jsonify({"error": f"Job with id '{graph_id}' not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- MAIN --------------------
if __name__ == '__main__':
    app.run(debug=True)
