import os
import networkx as nx
from neo4j import GraphDatabase
import pickle
from graph import Graph


class Neo4jGraphFetcher:
    def __init__(self, uri, dataset, username=None, password=None, graph_directory="data"):
        self.uri = uri
        self.dataset = dataset
        self.auth = (username or dataset, password or dataset)  # Allow custom credentials
        self.graph_directory = graph_directory
        self.graph_file = os.path.join(self.graph_directory, f"{self.dataset}_graph.gpickle")
        self.G = None  # Will be set later

        # Ensure the directory exists
        os.makedirs(self.graph_directory, exist_ok=True)

        # Initialize Neo4j Driver
        try:
            self.driver = GraphDatabase.driver(self.uri, auth=self.auth)
            print(f"Connected to Neo4j for dataset: {dataset}")
        except Exception as e:
            print(f"Error connecting to Neo4j: {e}")
            raise

    def load_or_fetch_graph(self):
        """Loads graph from cache or fetches from Neo4j if missing."""
        if os.path.exists(self.graph_file):
            print(f"Loading cached graph for {self.dataset} from {self.graph_file}")
            with open(self.graph_file, "rb") as f:
                graph_data = pickle.load(f)
                self.G = nx.from_dict_of_dicts(graph_data)
        else:
            print(f"Fetching graph for {self.dataset} from Neo4j...")
            self.fetch_graph()
            self.save_graph()
        
        return self.G


    def fetch_graph(self):
        """Fetches nodes and relationships from Neo4j and stores them in NetworkX graph."""
        self.G = nx.DiGraph()
        try:
            with self.driver.session() as session:
                nodes_query = "MATCH (n) RETURN id(n) AS id, labels(n) AS labels, properties(n) AS props"
                rel_query = "MATCH (a)-[r]->(b) RETURN id(a) AS source, id(b) AS target, type(r) AS type, properties(r) AS props"

                # Fetch nodes
                for record in session.run(nodes_query):
                    node_id = record["id"]
                    node_labels = record["labels"]
                    node_props = record["props"]
                    node_labels_str = "|".join(node_labels) if node_labels else ""
                    self.G.add_node(node_id, labels=node_labels_str, **node_props)

                # Fetch relationships
                for record in session.run(rel_query):
                    source = record["source"]
                    target = record["target"]
                    rel_type = record["type"]
                    rel_props = record["props"]
                    self.G.add_edge(source, target, type=rel_type, **rel_props)

            print(f"Graph fetched successfully! Nodes: {self.G.number_of_nodes()}, Edges: {self.G.number_of_edges()}")
        except Exception as e:
            print(f"Error fetching graph: {e}")
            raise

    def save_graph(self):
            """Saves the NetworkX graph as a gpickle file."""
            try:
                with open(self.graph_file, "wb") as f:
                    pickle.dump(nx.to_dict_of_dicts(self.G), f)
                print(f"Graph saved as {self.graph_file}")
            except Exception as e:
                print(f"Error saving graph: {e}")

    

    def close(self):
        """Closes the Neo4j driver connection."""
        if self.driver:
            self.driver.close()
            print("Neo4j connection closed.")

    @classmethod
    def fetch_all_graphs(cls, uri, datasets, username=None, password=None):
        """Fetch and return NetworkX graphs for all datasets, using caching."""
        graph_objects = []
        for dataset in datasets:
            fetcher = cls(uri, dataset, username, password)
            G = fetcher.load_or_fetch_graph()  # Use cached version if available
            
            # Convert NetworkX graph to custom Graph class
            graph = Graph()
            graph.from_existing_graph(G)
            graph.title = dataset
            graph.id = dataset

            graph_objects.append(graph)
            fetcher.close()

        return graph_objects  # Return list of Graph objects

# Neo4j database connection details
URI = "neo4j+ssc://demo.neo4jlabs.com"
datasets = ["movies", "northwind"]

# Fetch all graphs using caching
graph_list = Neo4jGraphFetcher.fetch_all_graphs(URI, datasets)

# Extract statistics from each Graph object
stats_list = [graph.get_statistics() for graph in graph_list]
