import threading
from flask import Flask, jsonify
import sqlite3
import json
import os
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
import time  # To simulate continuous job checking

from graph import Graph  # Your custom class (Graph)
from neo4jgraphs import Neo4jGraphFetcher  # Neo4j fetcher
from supabasegraphs import SupabaseGraphFetcher  # Supabase fetcher
from scheduler import JobScheduler, GraphJob

# -------------------- CONFIG --------------------
DB_PATH = "graphs.db"
URI = "neo4j+ssc://demo.neo4jlabs.com"
DATASETS = ["northwind", "movies", "gameofthrones", "stackoverflow", "recommendations", "fincen", "twitter", "neoflix", "wordnet"]

# Load Supabase credentials from .env
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

job_scheduler = JobScheduler()

# -------------------- INIT DB --------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Graph cache table
    c.execute('''
        CREATE TABLE IF NOT EXISTS graphs (
            id TEXT PRIMARY KEY,
            title TEXT,
            source TEXT,
            stats_json TEXT
        )
    ''')

    # Fetched datasets tracker (Neo4j + Supabase)
    c.execute('''
        CREATE TABLE IF NOT EXISTS datasets (
            id TEXT PRIMARY KEY,
            fetched BOOLEAN DEFAULT FALSE
        )
    ''')

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

def load_graphs_from_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT stats_json FROM graphs")
    rows = c.fetchall()
    conn.close()
    return [json.loads(row[0])[0] for row in rows]

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

# -------------------- FETCHERS --------------------
def fetch_and_cache_graph(graph_id):
    try:
        if is_dataset_fetched(graph_id):
            return None
        fetched_graph = Neo4jGraphFetcher.fetch_all_graphs(URI, [graph_id])
        graph = fetched_graph[0]
        graph.extract_statistics()
        graph.source = "neo4j"
        graph.title = graph.title or "untitled"
        save_graph_to_db(graph)
        mark_dataset_as_fetched(graph.id)
        return graph.get_statistics()
    except Exception as e:
        return {"error": f"Neo4j fetch error for {graph_id}: {str(e)}"}

def fetch_supabase_graphs():
    try:
        fetcher = SupabaseGraphFetcher(SUPABASE_URL, SUPABASE_KEY)
        graphs = fetcher.get_files_from_metadata()
        graph_list = []
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

            graph_list.append(graph.get_statistics())
        return graph_list
    except Exception as e:
        return [{"error": f"Supabase fetch error: {str(e)}"}]

# -------------------- BACKGROUND WORKER --------------------
def background_worker():
    while True:
        # Check for jobs that need to be processed (fetch new graphs, etc.)
        for graph_id in DATASETS:
            if not is_dataset_fetched(graph_id):
                fetch_and_cache_graph(graph_id)
        time.sleep(60)  # Sleep for 60 seconds, then recheck for pending jobs

# Start the background worker thread
background_thread = threading.Thread(target=background_worker, daemon=True)
background_thread.start()

# -------------------- FLASK APP --------------------
app = Flask(__name__)
init_db()

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    try:
        cached_graphs = load_graphs_from_db()
        if cached_graphs:
            return jsonify(cached_graphs)

        # Run Neo4j and Supabase fetches concurrently
        with ThreadPoolExecutor() as executor:
            neo4j_futures = [executor.submit(fetch_and_cache_graph, graph_id) for graph_id in DATASETS]
            supabase_future = executor.submit(fetch_supabase_graphs)

            neo4j_results = [f.result() for f in neo4j_futures if f.result() is not None]
            supabase_results = supabase_future.result()

        all_graphs = [*neo4j_results, *supabase_results]
        return jsonify(all_graphs)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------- MAIN --------------------
if __name__ == '__main__':
    app.run(debug=True)
