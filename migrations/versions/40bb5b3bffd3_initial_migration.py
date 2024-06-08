"""Initial migration

Revision ID: 40bb5b3bffd3
Revises: 
Create Date: 2024-06-08 12:31:43.502388

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40bb5b3bffd3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('salt', sa.String(length=255), nullable=False),
    sa.Column('profile_picture', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_index('ix_user_email', ['email'], unique=False)
        batch_op.create_index('ix_user_username', ['username'], unique=False)

    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('day_of_week', sa.String(length=10), nullable=False),
    sa.Column('early_morning', sa.Boolean(), nullable=False),
    sa.Column('morning', sa.Boolean(), nullable=False),
    sa.Column('afternoon', sa.Boolean(), nullable=False),
    sa.Column('night', sa.Boolean(), nullable=False),
    sa.Column('late_night', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('availability', schema=None) as batch_op:
        batch_op.create_index('ix_availability_day_of_week', ['day_of_week'], unique=False)
        batch_op.create_index('ix_availability_user_id', ['user_id'], unique=False)

    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('logo', sa.String(length=255), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('creators',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=True),
    sa.Column('last_name', sa.String(length=255), nullable=True),
    sa.Column('stage_name', sa.String(length=255), nullable=True),
    sa.Column('profile_pic', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('address_1', sa.String(length=255), nullable=True),
    sa.Column('address_2', sa.String(length=255), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('state', sa.String(length=100), nullable=True),
    sa.Column('postal_code', sa.String(length=20), nullable=True),
    sa.Column('portfolio_url', sa.String(length=255), nullable=True),
    sa.Column('previous_projects', sa.Text(), nullable=True),
    sa.Column('instagram', sa.String(length=255), nullable=True),
    sa.Column('twitter', sa.String(length=255), nullable=True),
    sa.Column('facebook', sa.String(length=255), nullable=True),
    sa.Column('youtube', sa.String(length=255), nullable=True),
    sa.Column('other_social_media', sa.Text(), nullable=True),
    sa.Column('reference_name', sa.String(length=255), nullable=True),
    sa.Column('reference_email', sa.String(length=255), nullable=True),
    sa.Column('reference_phone', sa.String(length=20), nullable=True),
    sa.Column('reference_relationship', sa.String(length=100), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('venue', sa.String(length=255), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.create_index('ix_event_date', ['date'], unique=False)

    op.create_table('notifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('read', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.create_index('ix_notification_created_at', ['created_at'], unique=False)
        batch_op.create_index('ix_notification_user_id', ['user_id'], unique=False)

    op.create_table('user_availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('monday', sa.JSON(), nullable=False),
    sa.Column('tuesday', sa.JSON(), nullable=False),
    sa.Column('wednesday', sa.JSON(), nullable=False),
    sa.Column('thursday', sa.JSON(), nullable=False),
    sa.Column('friday', sa.JSON(), nullable=False),
    sa.Column('saturday', sa.JSON(), nullable=False),
    sa.Column('sunday', sa.JSON(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_preferences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('event_types', sa.String(), nullable=False),
    sa.Column('activity_types', sa.String(), nullable=False),
    sa.Column('restaurant_types', sa.String(), nullable=False),
    sa.Column('group_size', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('attendance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('checked_in', sa.Boolean(), nullable=False),
    sa.Column('checked_in_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('attendance', schema=None) as batch_op:
        batch_op.create_index('ix_attendance_event_id', ['event_id'], unique=False)
        batch_op.create_index('ix_attendance_user_id', ['user_id'], unique=False)

    op.create_table('creator_genres',
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['creators.id'], ),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.PrimaryKeyConstraint('creator_id', 'genre_id')
    )
    op.create_table('creator_types',
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['creators.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], ),
    sa.PrimaryKeyConstraint('creator_id', 'type_id')
    )
    op.create_table('invites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('invite_sent_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('opportunities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('target_audience', sa.String(length=255), nullable=True),
    sa.Column('budget', sa.DECIMAL(precision=10, scale=2), nullable=True),
    sa.Column('guidelines', sa.Text(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reports',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('reported_by', sa.Integer(), nullable=False),
    sa.Column('reported_user', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['reported_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['reported_user'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('reports', schema=None) as batch_op:
        batch_op.create_index('ix_report_event_id', ['event_id'], unique=False)
        batch_op.create_index('ix_report_reported_by', ['reported_by'], unique=False)
        batch_op.create_index('ix_report_reported_user', ['reported_user'], unique=False)

    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review_text', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.create_index('ix_review_event_id', ['event_id'], unique=False)
        batch_op.create_index('ix_review_user_id', ['user_id'], unique=False)

    op.create_table('opportunity_genres',
    sa.Column('opportunity_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['opportunity_id'], ['opportunities.id'], ),
    sa.PrimaryKeyConstraint('opportunity_id', 'genre_id')
    )
    op.create_table('opportunity_types',
    sa.Column('opportunity_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['opportunity_id'], ['opportunities.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], ),
    sa.PrimaryKeyConstraint('opportunity_id', 'type_id')
    )
    op.create_table('submissions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('opportunity_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('bpm', sa.Integer(), nullable=True),
    sa.Column('file_url', sa.String(length=500), nullable=True),
    sa.Column('collaborators', sa.String(length=500), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['opportunity_id'], ['opportunities.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('feedback',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('submission_id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('feedback', sa.Text(), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['submission_id'], ['submissions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('media',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('file', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('opportunity_id', sa.Integer(), nullable=True),
    sa.Column('submission_id', sa.Integer(), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=False),
    sa.Column('updated_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['opportunity_id'], ['opportunities.id'], ),
    sa.ForeignKeyConstraint(['submission_id'], ['submissions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('submission_genres',
    sa.Column('submission_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['submission_id'], ['submissions.id'], ),
    sa.PrimaryKeyConstraint('submission_id', 'genre_id')
    )
    op.create_table('submission_types',
    sa.Column('submission_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['submission_id'], ['submissions.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], ),
    sa.PrimaryKeyConstraint('submission_id', 'type_id')
    )
    op.create_table('feedback_media',
    sa.Column('feedback_id', sa.Integer(), nullable=False),
    sa.Column('media_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['feedback_id'], ['feedback.id'], ),
    sa.ForeignKeyConstraint(['media_id'], ['media.id'], ),
    sa.PrimaryKeyConstraint('feedback_id', 'media_id')
    )
    op.create_table('opp_media',
    sa.Column('opportunities_id', sa.Integer(), nullable=False),
    sa.Column('media_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['media_id'], ['media.id'], ),
    sa.ForeignKeyConstraint(['opportunities_id'], ['opportunities.id'], ),
    sa.PrimaryKeyConstraint('opportunities_id', 'media_id')
    )
    op.create_table('sub_media',
    sa.Column('submissions_id', sa.Integer(), nullable=False),
    sa.Column('media_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['media_id'], ['media.id'], ),
    sa.ForeignKeyConstraint(['submissions_id'], ['submissions.id'], ),
    sa.PrimaryKeyConstraint('submissions_id', 'media_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sub_media')
    op.drop_table('opp_media')
    op.drop_table('feedback_media')
    op.drop_table('submission_types')
    op.drop_table('submission_genres')
    op.drop_table('media')
    op.drop_table('feedback')
    op.drop_table('submissions')
    op.drop_table('opportunity_types')
    op.drop_table('opportunity_genres')
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_index('ix_review_user_id')
        batch_op.drop_index('ix_review_event_id')

    op.drop_table('reviews')
    with op.batch_alter_table('reports', schema=None) as batch_op:
        batch_op.drop_index('ix_report_reported_user')
        batch_op.drop_index('ix_report_reported_by')
        batch_op.drop_index('ix_report_event_id')

    op.drop_table('reports')
    op.drop_table('opportunities')
    op.drop_table('invites')
    op.drop_table('creator_types')
    op.drop_table('creator_genres')
    with op.batch_alter_table('attendance', schema=None) as batch_op:
        batch_op.drop_index('ix_attendance_user_id')
        batch_op.drop_index('ix_attendance_event_id')

    op.drop_table('attendance')
    op.drop_table('user_preferences')
    op.drop_table('user_availability')
    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.drop_index('ix_notification_user_id')
        batch_op.drop_index('ix_notification_created_at')

    op.drop_table('notifications')
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_index('ix_event_date')

    op.drop_table('events')
    op.drop_table('creators')
    op.drop_table('companies')
    with op.batch_alter_table('availability', schema=None) as batch_op:
        batch_op.drop_index('ix_availability_user_id')
        batch_op.drop_index('ix_availability_day_of_week')

    op.drop_table('availability')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index('ix_user_username')
        batch_op.drop_index('ix_user_email')

    op.drop_table('users')
    op.drop_table('types')
    op.drop_table('genres')
    # ### end Alembic commands ###