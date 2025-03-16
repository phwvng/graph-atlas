from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class

app = Flask(__name__)

@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    # Number of graphs to generate
    num_graphs = 5  # Change this to generate more or fewer graphs
    graph_list = []

    # Create multiple random graphs
    for _ in range(num_graphs):
        import networkx as nx
        G = nx.fast_gnp_random_graph(10, 0.5)  # Example random graph with 10 nodes and 50% edge probability
        
        # Create a Graph instance and initialize with the NetworkX graph
        graph = Graph()
        graph.from_existing_graph(G)
        
        # Extract the statistics as a dictionary (not a JSON string)
        stats_dict = graph.get_statistics()  # Assuming this returns a dictionary

        # Add the graph's statistics to the list
        graph_list.append(stats_dict)

    # Return the list of graph statistics as a JSON response
    return jsonify(graph_list)  # Flask jsonify() will handle proper JSON formatting

if __name__ == '__main__':
    app.run(debug=True)
