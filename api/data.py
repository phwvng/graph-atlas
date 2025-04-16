import os
import io
import pandas as pd
import networkx as nx
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET = os.getenv("SUPABASE_BUCKET")

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_public_url(filename: str) -> str:
    """Retrieve the public URL for a file in a public bucket."""
    print(f"Getting public URL for file: {filename}")  # Debug print
    response = supabase.storage.from_(BUCKET).get_public_url(filename)
    print(f"Public URL: {response}")  # Debug print
    return response  # Directly return the URL string

def download_file(url: str) -> bytes:
    """Download the file content from the public URL."""
    print(f"Downloading file from URL: {url}")  # Debug print
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Failed to download file: {response.status_code}")
    return response.content

def file_to_digraph(file_bytes: bytes) -> nx.DiGraph:
    """Convert file bytes to a directed graph."""
    print("Converting file to directed graph...")  # Debug print
    stream = io.BytesIO(file_bytes)
    df = pd.read_csv(stream, sep=' ', header=None)
    G = nx.from_pandas_edgelist(df, source=0, target=1, create_using=nx.DiGraph)
    return G

def process_all_files_in_bucket():
    """Process all files within the bucket."""
    print("Fetching list of files in the bucket...")  # Debug print
    
    try:
        # List all files in the bucket (no pagination)
        response = supabase.storage.from_(BUCKET).list()
        
        # Debugging: print the full response
        print("Raw response from list():", response)

        # Check if the response contains the files
        if 'data' in response:
            files = response['data']
            print(f"Files fetched: {files}")  # Debug print to see raw response
        else:
            files = []
            print("No files found in the bucket.")  # Debug print if no files are found
            return

    except Exception as e:
        print(f"Error fetching files from bucket: {e}")
        return
    
    # Iterate over each file in the list
    for file in files:
        file_name = file['name']
        print(f"Processing file: {file_name}")
        
        # Get the public URL of the file
        file_url = get_public_url(file_name)
        
        # Download the file content
        try:
            file_bytes = download_file(file_url)
            
            # Convert the file content to a directed graph
            G = file_to_digraph(file_bytes)
            
            # Print basic information about the graph
            print(f"File: {file_name}")
            print(f"Number of nodes: {G.number_of_nodes()}")
            print(f"Number of edges: {G.number_of_edges()}")
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

# Process all files in the bucket
process_all_files_in_bucket()
