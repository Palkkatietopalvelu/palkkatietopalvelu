""" backend/app.py """

from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS
from db import init_db, db

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
app.secret_key = getenv("SECRET_KEY")
CORS(app)
init_db(app)

import controllers.clients
import controllers.users
import controllers.login
import controllers.clients

@app.route('/api/data')
def get_data():
    """ Main data page """
    data = [{'id': 1, 'name': 'Example 1'}, {'id': 2, 'name': 'Example 2'}]
    return jsonify(data)


if __name__ == '__main__':
    app.run()
