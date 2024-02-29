from sqlalchemy.dialects.postgresql import ENUM
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import creator_genre_table, creator_type_table

creator_status_enum = ENUM('Pre-Apply', 'Denied', 'Pending', 'Approved', name='creator_status_enum', metadata=db.metadata)

class Creator(db.Model):
    __tablename__ = 'creators'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    status = db.Column(creator_status_enum, default='Pre-Apply', nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Many-to-Many Relationship for Genres
    genres = db.relationship('Genre', secondary=creator_genre_table, backref=db.backref('creators', lazy='dynamic'))

    # Many-to-Many Relationship for Types
    types = db.relationship('Type', secondary=creator_type_table, backref=db.backref('creators', lazy='dynamic'))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'status': self.status,
            'types': [type.to_dict() for type in self.types],
            'genres': [genre.to_dict() for genre in self.genres],
            'profile_pic': self.profile_pic,
            'bio': self.bio,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
