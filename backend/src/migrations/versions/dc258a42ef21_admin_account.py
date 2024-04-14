"""add admin account

Revision ID: dc258a42ef21
Revises: d010c3150f7f
Create Date: 2024-04-07 21:26:17.259263

"""
from alembic import op
from sqlalchemy.sql import text
from sqlalchemy.orm.session import Session
import os
from werkzeug.security import generate_password_hash

# revision identifiers, used by Alembic.
revision = 'dc258a42ef21'
down_revision = 'd010c3150f7f'
branch_labels = None
depends_on = None

def upgrade():
    username = os.environ.get('ADMIN_USERNAME')
    password = os.environ.get('ADMIN_PASSWORD')
    hashed_password = generate_password_hash(password)
    role = 1
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        INSERT INTO users (username, password, role) VALUES (:username, :password, :role); 
    """), {"username": username, "password": hashed_password, "role": role})

    conn.commit()

def downgrade():
    username = os.environ.get('ADMIN_USERNAME')
    conn = Session(bind=op.get_bind())
    conn.execute(text("""
        DELETE FROM users WHERE username=:username; 
    """), {"username": username})

    conn.commit()
