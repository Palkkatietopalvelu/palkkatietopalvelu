# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    data = [{'id': 1, 'name': 'Example 1'}, {'id': 2, 'name': 'Example 2'}]
    return jsonify(data)

if __name__ == '__main__':
    app.run()
