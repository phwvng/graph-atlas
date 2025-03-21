from flask import Flask, jsonify
from graph import Graph  # Import the custom Graph class
import networkx as nx
from neo4j import GraphDatabase
from neo4jgraphs import stats_list  # Directly import stats_list


app = Flask(__name__)


@app.route('/graph-api', methods=['GET'])
def get_graph_stats():
    return jsonify(stats_list)

if __name__ == '__main__':
    app.run(debug=True)
