""" Application Database """

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = None

def init_db(app):
    global migrate
    db.init_app(app)
    migrate = Migrate(app, db)