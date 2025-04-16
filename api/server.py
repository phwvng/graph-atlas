from flask import Flask, jsonify
import sqlite3
import json
from graph import Graph  # Your custom class
from neo4jgraphs import Neo4jGraphFetcher  # Your fetcher
import networkx as nx

# -------------------- CONFIG --------------------
DB_PATH = "graphs.db"
URI = "neo4j+ssc://demo.neo4jlabs.com"
DATASETS = ["northwind", "movies", "gameofthrones", "stackoverflow", "recommendations", "fincen", "twitter", "neoflix", "wordnet"]

# -------------------- INIT DB --------------------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Create the graphs table if it doesn't exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS graphs (
            id TEXT PRIMARY KEY,
            title TEXT,
            source TEXT,
            stats_json TEXT
        )
    ''')

    # Create the datasets table to track the datasets
    c.execute('''
        CREATE TABLE IF NOT EXISTS datasets (
            id TEXT PRIMARY KEY,
            fetched BOOLEAN DEFAULT FALSE
        )
    ''')

    # Add datasets to the datasets table (if they don't already exist)
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
    return [json.loads(row[0])[0] for row in rows]  # JSON is stored as list of one dict

def graph_exists_in_db(graph_id: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT 1 FROM graphs WHERE id = ?", (graph_id,))
    exists = c.fetchone() is not None
    conn.close()
    return exists

def mark_dataset_as_fetched(dataset: str):
    """Mark a dataset as fetched in the 'datasets' table."""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        UPDATE datasets
        SET fetched = TRUE
        WHERE id = ?
    ''', (dataset,))
    conn.commit()
    conn.close()

def is_dataset_fetched(dataset: str):
    """Check if a dataset is marked as fetched in the 'datasets' table."""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        SELECT fetched FROM datasets WHERE id = ?
    ''', (dataset,))
    result = c.fetchone()
    conn.close()
    return result and result[0] == 1

# -------------------- FETCH & CACHE --------------------
def fetch_and_cache_graph(graph_id):
    """Fetch a graph and immediately cache it in the DB."""
    fetched_graph = Neo4jGraphFetcher.fetch_all_graphs(URI, [graph_id])  # Fetch only the specific graph
    graph = fetched_graph[0]  # There should only be one graph fetched
    
    graph.extract_statistics()
    graph.source = "neo4j"
    graph.title = graph.title or "untitled"

    if not graph_exists_in_db(graph.id):
        save_graph_to_db(graph)
    
    return graph.get_statistics()

# -------------------- FLASK APP --------------------
app = Flask(__name__)
init_db()  # Ensure DB exists on startup

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    try:
        # Get the list of graphs from the DB (or empty if none are available)
        cached_graphs = load_graphs_from_db()

        # If cached graphs exist, return them immediately
        if cached_graphs:
            return jsonify(cached_graphs)

        # Otherwise, fetch and cache the graphs one by one
        graph_list = []
        for graph_id in DATASETS:
            # Only fetch and cache the dataset if it's not already fetched
            if not is_dataset_fetched(graph_id):
                graph_stats = fetch_and_cache_graph(graph_id)
                graph_list.append(graph_stats)
                mark_dataset_as_fetched(graph_id)  # Mark this dataset as fetched
            else:
                # If the graph was already fetched, just load the stats
                cached_graphs = load_graphs_from_db()
                graph_list.extend(cached_graphs)

        return jsonify(graph_list)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------- MAIN --------------------
if __name__ == '__main__':
    app.run(debug=True)
