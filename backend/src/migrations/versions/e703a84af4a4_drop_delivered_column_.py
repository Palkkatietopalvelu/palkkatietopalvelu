"""drop delivered column

Revision ID: e703a84af4a4
Revises: dc258a42ef21
Create Date: 2024-04-28 22:51:34.675432

"""
from alembic import op
from sqlalchemy.sql import text
from sqlalchemy.orm.session import Session


# revision identifiers, used by Alembic.
revision = 'e703a84af4a4'
down_revision = 'dc258a42ef21'
branch_labels = None
depends_on = None


def upgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        ALTER TABLE deadlines DROP COLUMN delivered;   
"""))

    conn.commit()


def downgrade():
    conn = Session(bind=op.get_bind())

    conn.execute(text("""
        ALTER TABLE deadlines ADD COLUMN delivered BOOLEAN DEFAULT FALSE;   
"""))

    conn.commit()
