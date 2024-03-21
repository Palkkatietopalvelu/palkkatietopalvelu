"""initial migration

Revision ID: ed2ed6b66b9a
Revises: 
Create Date: 2024-03-20 15:43:46.217322

"""
from alembic import op
#import sqlalchemy as sa
#from sqlalchemy.dialects import postgresql
from sqlalchemy.sql import text
from sqlalchemy.orm.session import Session

# revision identifiers, used by Alembic.
revision = 'ed2ed6b66b9a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role INTEGER
        );
    """))

    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS clients (
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

    conn.execute(text("SET TIME ZONE 'Europe/Helsinki';"))

    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS deadlines (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients,
            deadline DATE,
            delivered BOOLEAN
        );
    """))

    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            owner INTEGER REFERENCES clients,
            name TEXT,
            path TEXT,
            date TIMESTAMP WITH TIME ZONE
        );
    """))

    conn.commit()


def downgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        DROP TABLE IF EXISTS users CASCADE;
    """))

    conn.execute(text("""
        DROP TABLE IF EXISTS clients CASCADE;
    """))

    conn.execute(text("""
        DROP TABLE IF EXISTS files CASCADE;
    """))

    conn.execute(text("""
        DROP TABLE IF EXISTS deadlines CASCADE;
    """))

    conn.commit()
