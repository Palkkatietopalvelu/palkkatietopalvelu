""" backend/app.py """

from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = getenv("SECRET_KEY")
CORS(app)


import controllers.clients

@app.route('/api/data')
def get_data():
    """ Main data page """
    data = [{'id': 1, 'name': 'Example 1'}, {'id': 2, 'name': 'Example 2'}]
    return jsonify(data)

import controllers.clients

if __name__ == '__main__':
    app.run()
