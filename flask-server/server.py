from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class

app = Flask(__name__)

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    # Create a random graph (replace this with your actual graph creation logic)
    import networkx as nx
    G = nx.fast_gnp_random_graph(10, 0.5)  # Example random graph

    # Create a Graph instance and initialize with the NetworkX graph
    graph = Graph()
    graph.from_existing_graph(G)
    
    # Extract the statistics and convert to JSON string
    stats_json = graph.to_json()
    
    # Return the stats as a JSON response
    return stats_json  # Flask jsonify() will handle JSON string formatting automatically

if __name__ == '__main__':
    app.run(debug=True)
