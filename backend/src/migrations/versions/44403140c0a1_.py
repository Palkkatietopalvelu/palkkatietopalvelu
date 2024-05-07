"""Table for keys used for two factor authentication

Revision ID: 44403140c0a1
Revises: e703a84af4a4
Create Date: 2024-05-06 13:33:07.207920

"""
from alembic import op
from sqlalchemy.sql import text
from sqlalchemy.orm.session import Session


# revision identifiers, used by Alembic.
revision = '44403140c0a1'
down_revision = 'e703a84af4a4'
branch_labels = None
depends_on = None


def upgrade():
    conn = Session(bind=op.get_bind())
    
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS two_factor_secrets (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users,
            totp_secret TEXT,
            active BOOLEAN
        );
"""))


def downgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
    DROP TABLE IF EXISTS two_factor_secrets CASCADE;
"""))
