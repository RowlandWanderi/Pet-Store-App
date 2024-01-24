"""created jwt block list

Revision ID: 5102d4a90e74
Revises: 56d879411d69
Create Date: 2024-01-23 21:29:00.333468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5102d4a90e74'
down_revision = '56d879411d69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_blocklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token_blocklist')
    # ### end Alembic commands ###
