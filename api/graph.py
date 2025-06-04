import networkx as nx
import random
import uuid  # To generate a unique ID if desired
from typing import Dict, Any, List
from dataclasses import dataclass, field, asdict
from networkx.algorithms.community import girvan_newman, modularity
from utils import is_spatial, is_temporal
from statistics import stdev
import json

@dataclass
class Graph(nx.Graph):
    # New id field, default is None but can be set to a unique value
    id: str = field(default_factory=lambda: str(uuid.uuid4()))  # Generates a unique ID by default
    title: str = field(default="title")  # Title of the graph
    source: str = field(default="source")  # Source of the graph
    tags: List[str] = field(default_factory=list)  # Tags for the graph
    domain: str = field(default="")  # Domain of the graph
    file_url: str = field(default="")  # URL of the file associated with the graph
    # Overview
    graph_type: int = field(init=False)
    is_directed_int: int = field(init=False)
    has_spatial_attributes: int = field(init=False)
    has_temporal_attributes: int = field(init=False)
    is_bipartite: int = field(init=False)

    # Topology
    n_components: int = field(init=False)
    avg_betweenness_centrality: float = field(init=False)
    avg_closeness_centrality: float = field(init=False)
    avg_eigenvector_centrality: float = field(init=False)
    avg_degree: float = field(init=False)
    std_degree: float = field(init=False)
    clustering_coefficient: float = field(init=False)
    transitivity: float = field(init=False)
    modularity: float = field(init=False)
    communities: int = field(init=False)
    avg_shortest_path_length: float = field(init=False)
    radius: int = field(init=False)
    diameter: int = field(init=False)
    assortativity: float = field(init=False)
    vertex_connectivity: float = field(init=False)
    eccentricity_avg: float = field(init=False)
    
    # Node/Edge
    n_nodes: int = field(init=False)
    node_types: int = field(init=False)
    node_attributes: int = field(init=False)
    number_of_isolates: int = field(init=False)
    density: float = field(init=False)
    n_edges: int = field(init=False)
    edge_types: int = field(init=False)
    edge_attributes: int = field(init=False)
    n_parallel_edges: int = field(init=False)
    n_self_loops: int = field(init=False)

    def __post_init__(self):
        """ Initialize the graph and extract statistics. """
        super().__init__()

    # New method to initialize with another graph
    def from_existing_graph(self, graph: nx.Graph):
        """Initialize this graph from an existing NetworkX graph."""
        self.add_nodes_from(graph.nodes(data=True))
        self.add_edges_from(graph.edges(data=True))

    def calculate_modularity(self) -> float:
        """Calculate modularity based on detected communities."""
        try:
            # Check if the graph has enough nodes and edges
            if self.number_of_edges() == 0 or self.number_of_nodes() == 0:
                raise ValueError("Graph must have at least one edge and one node to calculate modularity.")
            
            # Detect communities using the Girvan-Newman method
            communities_generator = girvan_newman(self)
            top_level_communities = next(communities_generator, None)
            
            # Ensure that communities were detected
            if not top_level_communities:
                raise ValueError("No communities were detected.")
            
            communities = tuple(sorted(c) for c in top_level_communities)
            self.communities = len(communities)

            # Calculate modularity based on the detected communities
            return modularity(self, communities)
        except Exception as e:
            print(f"Error calculating modularity: {e}")
            return 0

    def extract_statistics(self, testing=False, force_recalculate=False) -> None:
        """ Extract statistics from the graph (cache results if already computed). """
        if hasattr(self, "_cached_stats") and not force_recalculate:
            return  # If stats are already cached, return without recalculating.

        # Perform the statistics extraction as normal
        # [Insert original statistics calculation code here...]
        
        # Cache the result
        self._cached_stats = True
        # Topological Measures
        self.n_nodes = self.number_of_nodes()
        self.n_edges = self.number_of_edges()
        
        if testing:
            self.is_directed_int = random.randint(0, 1)
            self.is_bipartite = random.randint(0, 1)
            self.n_components = random.randint(0, 10)
        else:
            self.is_bipartite = 1 if nx.is_bipartite(self) else 0
            self.is_directed_int = int(self.is_directed())
            self.n_components = nx.number_weakly_connected_components(self) if self.is_directed() else nx.number_connected_components(self)
        
        self.density = nx.density(self)
        self.transitivity = nx.transitivity(self)

        # If the graph is connected, calculate diameter, radius, and shortest path length
        if nx.is_connected(self):
            self.diameter = nx.diameter(self)
            self.avg_shortest_path_length = nx.average_shortest_path_length(self)
            ecc = nx.eccentricity(self)
            self.eccentricity_avg = sum(ecc.values()) / len(ecc) if ecc else 0.0
            self.radius = nx.radius(self)
        else:
            self.diameter = -1
            self.avg_shortest_path_length = -1
            self.eccentricity_avg = -1
            self.radius = -1

        # Graph type
        if nx.is_tree(self):
            self.graph_type = 1  # Tree
        elif self.n_nodes == self.n_edges and all(degree == 2 for _, degree in self.degree()):
            self.graph_type = 2  # Cycle
        else:
            self.graph_type = 3 if self.density <= 0.1 else 4

        # Node Measures
        if testing:
            self.node_types = random.randint(1, 5)
            self.node_attributes = random.randint(0, 15)
        else:
            node_types_set = {",".join(data['label']) if isinstance(data['label'], list) else data['label'] 
                    for _, data in self.nodes(data=True) if 'label' in data}
            self.node_types = len(node_types_set)

            # Calculate the average number of attributes per node
            total_node_attributes = sum(len(data) for _, data in self.nodes(data=True))
            self.node_attributes = total_node_attributes / self.n_nodes if self.n_nodes > 0 else 0

        degrees = [degree for _, degree in self.degree()]
        self.avg_degree = sum(degrees) / self.n_nodes if self.n_nodes > 0 else 0
        self.std_degree = stdev(degrees) if len(degrees) > 1 else 0
        self.clustering_coefficient = nx.average_clustering(self)
        self.vertex_connectivity = nx.node_connectivity(self)
        self.number_of_isolates = nx.number_of_isolates(self)

        # Betweenness centrality
        betweenness = nx.betweenness_centrality(self)
        self.avg_betweenness_centrality = sum(betweenness.values()) / len(betweenness) if betweenness else 0.0
        
        closeness = nx.closeness_centrality(self)
        self.avg_closeness_centrality = sum(closeness.values()) / len(closeness) if closeness else 0.0

        eigenvector = nx.eigenvector_centrality(self)
        self.avg_eigenvector_centrality = sum(eigenvector.values()) / len(eigenvector) if eigenvector else 0.0

        # Edge Measures
        if testing:
            self.edge_types = random.randint(1, 5)
            self.edge_attributes = random.randint(0, 15)
        else:
            edge_types_set = {data.get('type') for _, _, data in self.edges(data=True) if 'type' in data}
            self.edge_types = len(edge_types_set)
        
            # Calculate the average number of attributes per edge
            total_edge_attributes = sum(len(data) for _, _, data in self.edges(data=True))
            self.edge_attributes = total_edge_attributes / self.n_edges if self.n_edges > 0 else 0

        if testing:
            self.n_self_loops = random.randint(0, 5)
            self.n_parallel_edges = random.randint(0, 5)
        else:
            self.n_self_loops = nx.number_of_selfloops(self)
            self.n_parallel_edges = sum(1 for u, v, k in self.edges(keys=True) if self.number_of_edges(u, v) > 1) if isinstance(self, (nx.MultiGraph, nx.MultiDiGraph)) else 0

        # Assortativity
        if self.n_edges > 0:
            try:
                self.assortativity = float(nx.degree_assortativity_coefficient(self))
            except Exception as e:
                print(f"Error calculating assortativity: {e}")
                self.assortativity = -1
        else:
            self.assortativity = -1

        if testing:
            self.has_spatial_attributes = random.randint(0, 1)
            self.has_temporal_attributes = random.randint(0, 1)
        else:
            # Check for spatial and temporal attributes using utility functions
            self.has_spatial_attributes = int(any(
                is_spatial(key) for _, data in self.nodes(data=True) for key in data.keys()
            ) or any(
                is_spatial(key) for _, _, data in self.edges(data=True) for key in data.keys()
            ))

            self.has_temporal_attributes = int(any(
                is_temporal(key) for _, data in self.nodes(data=True) for key in data.keys()
            ) or any(
                is_temporal(key) for _, _, data in self.edges(data=True) for key in data.keys()
            ))

        try:
            self.modularity = self.calculate_modularity()
        except Exception as e:
            print(f"Error calculating modularity: {e}")
            self.modularity = float('nan')

    def get_statistic(self, name: str) -> Any:
        """Retrieve a statistic by its name."""
        self.extract_statistics()
        return getattr(self, name, None)

    def get_statistics(self, testing=False) -> Dict[str, Any]:
        """Convert the statistics to a dictionary format."""
        if not hasattr(self, "_cached_stats"):
            self.extract_statistics(testing)
        return {field_name: getattr(self, field_name) for field_name in self.__dataclass_fields__}


    def get_statistics_values(self) -> List[Any]:
        """Get the values of all statistics."""
        return [getattr(self, field_name) for field_name in self.__dataclass_fields__]
    
    def to_json(self) -> str:
        """Convert the graph's statistics and metadata to a JSON string in a list format."""
        try:
            # Ensure that statistics are extracted before converting to JSON
            self.extract_statistics()

            # Create a dictionary with both metadata and statistics
            graph_data = asdict(self)

            # Custom handler for non-serializable objects
            def custom_handler(obj):
                # Handle specific cases where the object is not serializable
                if isinstance(obj, set):
                    return list(obj)  # Convert sets to lists
                elif isinstance(obj, complex):
                    return {"real": obj.real, "imag": obj.imag}  # Handle complex numbers
                return str(obj)  # Default case

            # Convert to JSON with indentation and custom handling for non-serializable objects
            json_str = json.dumps([graph_data], default=custom_handler, indent=4)

            return json_str
        except Exception as e:
            print(f"Error converting to JSON: {e}")
            return "[]"
