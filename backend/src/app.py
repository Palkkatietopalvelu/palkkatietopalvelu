# backend/app.py
from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = getenv("SECRET_KEY")
CORS(app)

import controllers.clients

if __name__ == '__main__':
    app.run()
