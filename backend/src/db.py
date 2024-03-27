""" Application Database """

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_migrate import upgrade, downgrade


db = SQLAlchemy()
migrate = Migrate()


def init_db(app):
    db.init_app(app)
    migrate.init_app(app, db)
