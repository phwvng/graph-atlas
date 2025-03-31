from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class
import networkx as nx
from neo4j import GraphDatabase
from neo4jgraphs import Neo4jGraphFetcher
import random

# Neo4j database connection details
URI = "neo4j+ssc://demo.neo4jlabs.com"
datasets = ["northwind", "movies", "gameofthrones"]

# Fetch all graphs using caching
graph_list = Neo4jGraphFetcher.fetch_all_graphs(URI, datasets)

# Extract statistics from each Graph object
for graph in graph_list:
    graph.source = "neo4j"
stats_list = [graph.get_statistics() for graph in graph_list]

stats_list.append({
    "source": "networkx",
    "graph": "karate",
    "n_nodes": 34,
    "n_edges": 78,
    "density": 0.067,
    "node_types": 3,
    "edge_types": 1,
    "degree_centrality": nx.degree_centrality(nx.karate_club_graph()),
    "title": "Karate Club Graph",
    "id": "karate",
    "tags" : ["networkx", "karate", "graph"],
})


for i in range(5):
    graph = {}
    graph["source"] = "random"
    graph["graph"] = f"random_graph_{i}"
    graph["n_nodes"] = random.randint(5, 500)
    graph["n_edges"] = random.randint(5, 500)
    graph["density"] = random.uniform(0, 1)
    graph["node_types"] = random.randint(1, 5)
    graph["edge_types"] = random.randint(1, 5)
    graph["assortativity"] = random.uniform(-1, 1)
    graph["degree_centrality"] = {str(i): random.uniform(0, 1) for i in range(graph["n_nodes"])}
    graph["title"] = f"Random Graph {i}"
    graph["id"] = f"random_graph_{i}"
    graph["tags"] = random.sample(["random", "graph", "test", "sample"], random.randint(1, 4))
    stats_list.append(graph)
    

app = Flask(__name__)

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    return jsonify(stats_list)

if __name__ == '__main__':
    app.run(debug=True)
