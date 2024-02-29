from .db import db
from .db import environment, SCHEMA, add_prefix_for_prod

# Associations
creator_genre_table = db.Table('creator_genres',
    db.Column('creator_id', db.Integer, db.ForeignKey(add_prefix_for_prod('creators.id')), primary_key=True),
    db.Column('genre_id', db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), primary_key=True)
)

creator_type_table = db.Table('creator_types',
    db.Column('creator_id', db.Integer, db.ForeignKey(add_prefix_for_prod('creators.id')), primary_key=True),
    db.Column('genre_id', db.Integer, db.ForeignKey(add_prefix_for_prod('types.id')), primary_key=True)
)

opp_genre_table = db.Table('opp_genres',
    db.Column('opportunities_id', db.Integer, db.ForeignKey(add_prefix_for_prod('opportunities.id')), primary_key=True),
    db.Column('genres_id', db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), primary_key=True)
)

opp_type_table = db.Table('opp_types',
    db.Column('opportunities_id', db.Integer, db.ForeignKey('opportunities.id'), primary_key=True),
    db.Column('types_id', db.Integer, db.ForeignKey('types.id'), primary_key=True)
)

opp_media_table = db.Table('opp_media',
    db.Column('opportunities_id', db.Integer, db.ForeignKey(add_prefix_for_prod('opportunities.id')), primary_key=True),
    db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
)

sub_media_table = db.Table('sub_media',
    db.Column('submissions_id', db.Integer, db.ForeignKey(add_prefix_for_prod('submissions.id')), primary_key=True),
    db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
)

feedback_media_table = db.Table('feedback_media',
    db.Column('feedback_id', db.Integer, db.ForeignKey(add_prefix_for_prod('feedback.id')), primary_key=True),
    db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
)



# Models
from .user import User
from .creator import Creator
from .genre import Genre
from .type import Type
from .company import Company
from .opportunity import Opportunity
from .media import Media
from .submission import Submission
from .feedback import Feedback
