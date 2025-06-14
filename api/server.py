import threading
from flask import Flask, jsonify
import sqlite3
import json
import os
from dotenv import load_dotenv
import time
import requests
from flask_cors import CORS

from graph import Graph
from neo4jgraphs import Neo4jGraphFetcher
from supabasegraphs import SupabaseGraphFetcher
from scheduler import JobScheduler, GraphJob

# -------------------- CONFIG --------------------
DB_PATH = "graphs.db"
URI = "neo4j+ssc://demo.neo4jlabs.com"
DATASETS = ["northwind", "movies", "gameofthrones", "stackoverflow", "recommendations", "fincen", "twitter", "neoflix", "wordnet"]

guides = {
    "movies": [
         {
    "title": "Exploring the Graph",
    "description": "Learn how to explore the graph visually using GraphPolaris.",
    "link": "",
    "stepId": "step1"
  },
  {
    "title": "Filtering Nodes",
    "description": "Apply filters to view specific subsets of data nodes.",
    "link": "",
    "stepId": "step2"
  },
    ],
    # Add other guides here, e.g.
    "northwind": [
        "Step 1 for northwind",
        "Step 2 for northwind"
    ],}
# Load Supabase credentials
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

job_scheduler = JobScheduler()

# -------------------- INIT DB --------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Graph cache
    c.execute('''
        CREATE TABLE IF NOT EXISTS graphs (
            id TEXT PRIMARY KEY,
            title TEXT,
            source TEXT,
            stats_json TEXT
        )
    ''')

    # Fetched datasets tracker
    c.execute('''
        CREATE TABLE IF NOT EXISTS datasets (
            id TEXT PRIMARY KEY,
            fetched BOOLEAN DEFAULT FALSE
        )
    ''')

    # Jobs tracking
    c.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id TEXT PRIMARY KEY,
            status TEXT,
            start_time TEXT,
            end_time TEXT,
            progress REAL,
            total_steps INTEGER,
            current_step INTEGER
        )
    ''')

    # Index for fast title lookup
    c.execute('CREATE INDEX IF NOT EXISTS idx_graphs_title ON graphs(title COLLATE NOCASE)')

    # Seed Neo4j datasets
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
    c.execute('SELECT fetched FROM datasets WHERE id = ?', (dataset,))
    result = c.fetchone()
    conn.close()
    return result and result[0] == 1

def get_all_graph_summaries():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, title, source FROM graphs")
    rows = c.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "source": row[2]} for row in rows]

def get_graph_by_title_from_db(title):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT stats_json FROM graphs WHERE lower(title) = lower(?)", (title,))
    row = c.fetchone()
    conn.close()
    return json.loads(row[0])[0] if row else None

# -------------------- FETCHERS --------------------
def fetch_and_cache_graph(graph_id):
    if is_dataset_fetched(graph_id):
        return

    try:
        fetched_graph = Neo4jGraphFetcher.fetch_all_graphs(URI, [graph_id])
        graph = fetched_graph[0]
        graph.extract_statistics()
        graph.source = "neo4j"
        graph.title = graph.title or "untitled"
        graph.guide = guides.get(graph_id, "")
        save_graph_to_db(graph)
        mark_dataset_as_fetched(graph.id)
        return graph.get_statistics()
    except Exception as e:
        print(f"Neo4j fetch error for {graph_id}: {str(e)}")
        return {"error": str(e)}

def fetch_supabase_graphs():
    try:
        fetcher = SupabaseGraphFetcher(SUPABASE_URL, SUPABASE_KEY)
        graphs = fetcher.get_files_from_metadata()
        
        for i, G in enumerate(graphs):
            graph = Graph()
            graph.from_existing_graph(G)
            
            # Populate fields from Supabase metadata
            graph.source = G.graph.get("source", "supabase")
            graph.id = graph.title = G.graph.get("title", f"supabase:{i}")
            graph.tags = G.graph.get("tags", [])
            graph.domain = G.graph.get("domain", "")
            graph.file_url = G.graph.get("file_url", "")
            
            try:
                graph.extract_statistics()
            except Exception as stat_error:
                print(f"⚠️ Failed to extract statistics for {graph.id}: {stat_error}")
                continue  # Skip this graph and move on

            if not is_dataset_fetched(graph.id):
                try:
                    print(f"📦 Saving Supabase graph to DB: {graph.id}")
                    save_graph_to_db(graph)
                    mark_dataset_as_fetched(graph.id)
                except Exception as db_error:
                    print(f"❌ Error saving {graph.id} to DB: {db_error}")

    except Exception as e:
        print(f"❌ Supabase fetch error: {str(e)}")

# -------------------- BACKGROUND WORKER --------------------
def background_worker():
    while True:
        for graph_id in DATASETS:
            if not is_dataset_fetched(graph_id):
                job = GraphJob(graph_id, fetch_and_cache_graph, graph_id)
                job_scheduler.schedule(job)
        time.sleep(180)

background_thread = threading.Thread(target=background_worker, daemon=True)
background_thread.start()


# -------------------- FLASK APP --------------------
app = Flask(__name__)
CORS(app)
init_db()

@app.route('/graphs', methods=['GET'])
def list_graphs():
    try:
        return jsonify(get_all_graph_summaries())
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


# -------------------- MAIN --------------------
if __name__ == '__main__':
    app.run(debug=True)
