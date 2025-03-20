from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class
import networkx as nx
from neo4j import GraphDatabase
import asyncio

app = Flask(__name__)

# Neo4j database connection details
URI = "neo4j+ssc://demo.neo4jlabs.com"
AUTH = ("movies", "movies")
title = "movies"

G = nx.DiGraph()
# Connect to the Neo4j database
def fetch_graph():
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        with driver.session() as session:
            # Fetching nodes and relationships in one go (can be further optimized)
            
            # Fetch all nodes and relationships (no query batching in this case)
            nodes_query = "MATCH (n) RETURN id(n) AS id, labels(n) AS labels, properties(n) AS props"
            rel_query = "MATCH (a)-[r]->(b) RETURN id(a) AS source, id(b) AS target, type(r) AS type, properties(r) AS props"
            
            # Add nodes to NetworkX graph
            for record in session.run(nodes_query):
                node_id = record["id"]
                node_labels = record["labels"]
                node_props = record["props"]
                
                # Add the node to the graph
                node_labels_str = "|".join(node_labels) if node_labels else ""
                G.add_node(node_id, labels=node_labels_str, **node_props)
            
            # Add edges to NetworkX graph
            for record in session.run(rel_query):
                source = record["source"]
                target = record["target"]
                rel_type = record["type"]
                rel_props = record["props"]
                
                # Add the edge to the graph
                G.add_edge(source, target, type=rel_type, **rel_props)
    print(f"Graph loaded into NetworkX! Nodes: {G.number_of_nodes()}, Edges: {G.number_of_edges()}")
    return G;

# Fetch the graph data and load it into the NetworkX graph

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():

    fetch_graph()
    graph = Graph()
    graph.from_existing_graph(G)
    graph.title = title
    graph.id = title
    graph_list = []

        
    # Extract the statistics as a dictionary (not a JSON string)
    stats_dict = graph.get_statistics()  # Assuming this returns a dictionary

        # Add the graph's statistics to the list
    graph_list.append(stats_dict)

    # Return the list of graph statistics as a JSON response
    return jsonify(graph_list)  # Flask jsonify() will handle proper JSON formatting

if __name__ == '__main__':
    app.run(debug=True)
