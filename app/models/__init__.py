from .db import db
from .db import environment, SCHEMA, add_prefix_for_prod

# Associations
creator_genre_table = db.Table('creator_genres',
    db.Column('creatorId', db.Integer, db.ForeignKey(add_prefix_for_prod('creators.creatorId')), primary_key=True),
    db.Column('genreId', db.Integer, db.ForeignKey(add_prefix_for_prod('genres.genreId')), primary_key=True)
)

creator_type_table = db.Table('creator_types',
    db.Column('creatorId', db.Integer, db.ForeignKey(add_prefix_for_prod('creators.creatorId')), primary_key=True),
    db.Column('typeId', db.Integer, db.ForeignKey(add_prefix_for_prod('types.typeId')), primary_key=True)
)


# Models
from .user import User
from .creator import Creator
from .genre import Genre
from .type import Type
