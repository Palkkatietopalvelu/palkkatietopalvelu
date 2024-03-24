"""password expire & recycle bin

Revision ID: d010c3150f7f
Revises: ed2ed6b66b9a
Create Date: 2024-03-22 13:48:04.595527

"""
from alembic import op
from sqlalchemy.sql import text
from sqlalchemy.orm.session import Session

# revision identifiers, used by Alembic.
revision = 'd010c3150f7f'
down_revision = 'ed2ed6b66b9a'
branch_labels = None
depends_on = None


def upgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS expired_tokens (
            id SERIAL PRIMARY KEY,
            token TEXT,
            date DATE
        );        
"""))

    conn.execute(text("""
        ALTER TABLE files ADD delete_date IF NOT EXISTS DATE; 
"""))

    conn.execute(text("""
        ALTER TABLE files ADD deleted_by IF NOT EXISTS INREGER REFERENCES users; 
"""))

    conn.commit()

def downgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
    DROP TABLE IF EXISTS expired_tokens CASCADE;
"""))

    conn.execute(text("""
        ALTER TABLE files DROP delete_date IF EXISTS CASCADE; 
"""))

    conn.execute(text("""
        ALTER TABLE files DROP deleted_by IF EXISTS CASCADE; 
"""))

    conn.commit()
