""" backend/app.py """

from os import getenv
from flask import Flask
from flask_cors import CORS
from db import init_db
from config import DATABASE_URL

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.secret_key = getenv("SECRET_KEY")
CORS(app)
#db.init_app(app)
init_db(app)

# pylint: disable=unused-import,wrong-import-position
from controllers import users, clients, login
# pylint: enable=unused-import,wrong-import-position

if __name__ == '__main__':
    #db.init_app(app)
    app.run()
