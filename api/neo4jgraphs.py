import os
import networkx as nx
from neo4j import GraphDatabase
from graph import Graph

class Neo4jGraphFetcher:
    def __init__(self, uri, dataset, username=None, password=None):
        self.uri = uri
        self.dataset = dataset
        self.auth = (username or dataset, password or dataset)  # Allow custom credentials

        # Initialize Neo4j Driver
        try:
            self.driver = GraphDatabase.driver(self.uri, auth=self.auth)
            print(f"Connected to Neo4j for dataset: {dataset}")
        except Exception as e:
            print(f"Error connecting to Neo4j: {e}")
            raise

    def fetch_graph(self):
        """Fetches nodes and relationships from Neo4j and stores them in a NetworkX graph."""
        G = nx.DiGraph()  # Directed graph, change to nx.Graph() if undirected is needed
        try:
            with self.driver.session() as session:
                # Fetch nodes
                nodes_query = "MATCH (n) RETURN id(n) AS id, labels(n) AS labels, properties(n) AS props"
                rel_query = "MATCH (a)-[r]->(b) RETURN id(a) AS source, id(b) AS target, type(r) AS type, properties(r) AS props"

                # Fetch nodes
                for record in session.run(nodes_query):
                    node_id = record["id"]
                    node_labels = record["labels"]
                    node_props = record["props"]
                    node_labels_str = "|".join(node_labels) if node_labels else ""
                    G.add_node(node_id, labels=node_labels_str, **node_props)

                # Fetch relationships
                for record in session.run(rel_query):
                    source = record["source"]
                    target = record["target"]
                    rel_type = record["type"]
                    rel_props = record["props"]
                    G.add_edge(source, target, type=rel_type, **rel_props)

            print(f"Graph fetched successfully! Nodes: {G.number_of_nodes()}, Edges: {G.number_of_edges()}")
        except Exception as e:
            print(f"Error fetching graph: {e}")
            raise

        return G

    def close(self):
        """Closes the Neo4j driver connection."""
        if self.driver:
            self.driver.close()
            print("Neo4j connection closed.")

    @classmethod
    def fetch_all_graphs(cls, uri, datasets, username=None, password=None):
        """Fetch and return NetworkX graphs for all datasets from Neo4j."""
        graph_objects = []
        for dataset in datasets:
            fetcher = cls(uri, dataset, username, password)
            G = fetcher.fetch_graph()  # Always fetch the graph from Neo4j
            
            # Convert NetworkX graph to custom Graph class
            graph = Graph()
            graph.from_existing_graph(G)
            graph.title = dataset
            graph.id = dataset
            graph.domain = "neo4j guides"
            graph.tags = ["neo4j", "guide", dataset]
            graph_objects.append(graph)
            fetcher.close()

        return graph_objects  # Return list of Graph objects
