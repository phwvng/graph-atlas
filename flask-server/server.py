from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class
import networkx as nx
from neo4j import GraphDatabase
from neo4jgraphs import Neo4jGraphFetcher

# Neo4j database connection details
URI = "neo4j+ssc://demo.neo4jlabs.com"
datasets = ["northwind", "movies", "gameofthrones"]

# Fetch all graphs using caching
graph_list = Neo4jGraphFetcher.fetch_all_graphs(URI, datasets)

# Extract statistics from each Graph object
for graph in graph_list:
    graph.source = "neo4j"
stats_list = [graph.get_statistics() for graph in graph_list]

app = Flask(__name__)

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    return jsonify(stats_list)

if __name__ == '__main__':
    app.run(debug=True)
