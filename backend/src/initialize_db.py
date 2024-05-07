""" alustaa tietokannan """
import os
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash
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
            payperiod TEXT,
            active BOOLEAN NOT NULL DEFAULT true              
        );
    """))

    db.session.execute(text("SET TIME ZONE 'Europe/Helsinki';"))

    db.session.execute(text("""
        CREATE TABLE deadlines (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients,
            deadline DATE
        );
        """))

    db.session.execute(text("""
        CREATE TABLE files (
            id SERIAL PRIMARY KEY,
            owner INTEGER REFERENCES clients,
            name TEXT,
            path TEXT,
            date TIMESTAMP WITH TIME ZONE,
            delete_date DATE,
            deleted_by INTEGER REFERENCES users
        );
        """))

    db.session.execute(text("""
        CREATE TABLE expired_tokens (
            id SERIAL PRIMARY KEY,
            token TEXT,
            date DATE
        );
        """))

    db.session.execute(text("""
        CREATE TABLE two_factor_secrets (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users,
            totp_secret TEXT,
            active BOOLEAN
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
        DROP TABLE IF EXISTS files CASCADE;
    """))

    db.session.execute(text("""
        DROP TABLE IF EXISTS deadlines CASCADE;
    """))

    db.session.execute(text("""
        DROP TABLE IF EXISTS expired_tokens CASCADE;
    """))

    db.session.execute(text("""
        DROP TABLE IF EXISTS two_factor_secrets CASCADE;
    """))

    db.session.commit()

def create_admin():
    username = os.environ.get('ADMIN_USERNAME')
    password = os.environ.get('ADMIN_PASSWORD')
    hashed_password = generate_password_hash(password)
    role = 1

    db.session.execute(text("""
        INSERT INTO users (username, password, role) VALUES (:username, :password, :role); 
    """), {"username": username, "password": hashed_password, "role": role})

    db.session.commit()

def initialize_database():
    #   alustaa tietokannan

    drop_tables()
    create_tables()
    create_admin()

if __name__ == "__main__":
    initialize_database()
