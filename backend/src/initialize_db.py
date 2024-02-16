""" alustaa tietokannan """

from sqlalchemy.sql import text
from db import db
from app import app

app.app_context().push()

def create_tables():
    """ Luo sql taulut """

    db.session.execute(text("""
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role INTEGER
        );
    """))

    db.session.execute(text("""
        CREATE TABLE clients (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users,
            company TEXT,
            email TEXT,
            phonenumber TEXT,
            bi_code TEXT,
            payperiod TEXT
        );
    """))

    db.session.execute(text("""
        CREATE TABLE deadlines (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients,
            deadline DATE
        );
    """))

    db.session.commit()

def drop_tables():
    """ Poistaa sql taulut """

    db.session.execute(text("""
        DROP TABLE IF EXISTS users CASCADE;
    """))

    db.session.execute(text("""
        DROP TABLE IF EXISTS clients CASCADE;
    """))

    db.session.execute(text("""
        DROP TABLE IF EXISTS deadlines CASCADE;
    """))

    db.session.commit()

def initialize_database():
    """   alustaa tietokannan """

    drop_tables()
    create_tables()

if __name__ == "__main__":
    initialize_database()
