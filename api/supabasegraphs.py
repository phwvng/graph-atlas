import os
import requests
import networkx as nx
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd
from io import StringIO

class SupabaseGraphFetcher:
    def __init__(self, supabase_url: str = None, supabase_key: str = None):
        """Initialize the Supabase client."""
        load_dotenv(dotenv_path=".env")
        
        # Get environment variables or use the provided parameters
        self.supabase_url = supabase_url or os.getenv("SUPABASE_URL")
        self.supabase_key = supabase_key or os.getenv("SUPABASE_KEY")
        
        # Initialize Supabase client
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        
        print(f"Connected to Supabase at {self.supabase_url}")

    def get_files_from_metadata(self):
        """Fetch file metadata from the 'file_uploads' table and process files."""
        print("🔍 Fetching file metadata from 'file_uploads'...")

        try:
            # Query the 'file_uploads' table for all records
            response = self.supabase.table("file_uploads").select("*").execute()
            
            # Access the actual data from the response
            files = response.data  # Use .data to access the records
            
            if not files:
                print("⚠️ No files found in the 'file_uploads' table.")
                return []
            
            print(f"✅ Found {len(files)} file(s) in the 'file_uploads' table.")
            
            graph_objects = []
            for file in files:
                print(f"📄 Processing: {file['file_name']}")

                # Ensure full URL
                file_url = file['file_url']
                if self.supabase_url not in file_url:
                    file_url = file_url.replace('https://your-supabase-url', self.supabase_url)

                file_text = self.download_file(file_url)  # Download the file content
                G = self.file_to_digraph(file['file_name'], file_text, file['file_type'])  # Convert file to graph

                # Set title to the Supabase file name from the 'file_name' field
                G.graph['title'] = file['title']  # Correctly assign the title
                G.graph['tags'] = file['tags']  # Assign tags to the graph
                G.graph['id'] = file['file_name']  # Assign the ID to the graph
                G.graph['source'] = file['source']  # Assign the source to the graph
                G.graph['domain'] = file['domain']  # Assign the domain to the graph
                G.graph['file_url'] = file_url  # Assign the file URL to the graph

                # Add the graph to the list
                graph_objects.append(G)

                print(f"✅ Converted to DiGraph: {file['file_name']} with {G.number_of_nodes()} nodes and {G.number_of_edges()} edges.")

            return graph_objects  # Return list of NetworkX DiGraph objects

        except Exception as e:
            print(f"❌ Error fetching file metadata: {e}")
            return []

    def download_file(self, url: str) -> str:
        """Download file content from a public URL."""
        response = requests.get(url)
        if response.status_code != 200:
            raise ValueError(f"Failed to download file: {response.status_code}")
        return response.text

    def file_to_digraph(self, file_name: str, file_text: str, file_type: str) -> nx.DiGraph:
        """Convert the file content to a NetworkX DiGraph based on the file type."""
        if file_type == 'csv':
            # If it's a CSV with 'source' and 'target' columns for the edges
            df = pd.read_csv(StringIO(file_text))
            return nx.from_pandas_edgelist(df, source='source', target='target', create_using=nx.DiGraph)
        elif file_type == 'graphml':
            # If it's a GraphML file
            return nx.read_graphml(StringIO(file_text))
        elif file_type == 'edges':
            # Assuming space-separated edge list file format
            df = pd.read_csv(StringIO(file_text), sep=' ', header=None)
            return nx.from_pandas_edgelist(df, source=0, target=1, create_using=nx.DiGraph)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")

    def close(self):
        """Close any resources if necessary (e.g., database connections)."""
        print("Closing Supabase connection (if needed).")

    @classmethod
    def fetch_all_graphs(cls, supabase_url, supabase_key):
        """Fetch all graphs from Supabase and return as a list of DiGraph objects."""
        fetcher = cls(supabase_url, supabase_key)
        graph_objects = fetcher.get_files_from_metadata()
        fetcher.close()
        return graph_objects
