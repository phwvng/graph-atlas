from flask import Flask

app = Flask(__name__)

# Graph API Route
@app.route('/graph-api')
def graph_api():
    return { "graphs": [{
    "id": 'finance',
    "title": 'Finance',
    "url": "https://img.freepik.com/premium-vector/personal-finance-cartoon_24640-41281.jpg",
    "size": '200 nodes, 400 edges',
    "complexity": 'Simple',
    "tags": ['Finance', 'Money', 'Companies'],
    "source": 'Yahoo Finance',
    "description": 'A graph of companies and stock prices'
}, {
    "id": 'social',
    "title": 'Social',
    "url": "https://img.freepik.com/free-vector/social-media-connection-concept-illustration_114360-1076.jpg",
    "size": '100 nodes, 200 edges',
    "complexity": 'Simple',
    "tags": ['Social', 'Friends', 'Connections'],
    "source": 'Facebook',
    "description": 'A graph of friends and connections'
}, {
    "id": 'knowledge',
    "title": 'Knowledge',
    "url": "https://img.freepik.com/free-vector/abstract-education-background_23-2148536950.jpg",
    "size": '500 nodes, 1000 edges',
    "complexity": 'Complex',
    "tags": ['Knowledge', 'Learning', 'Books'],
    "source": 'Wikipedia',
    "description": 'A graph of articles and links'
}
]};

if __name__ == '__main__':
    app.run(debug=True)

