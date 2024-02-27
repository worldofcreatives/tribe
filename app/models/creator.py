from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import creator_genre_table, creator_type_table

class Creator(db.Model):
    __tablename__ = 'creators'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Enum('Pre-Apply', 'Denied', 'Pending', 'Approved'), default='Pre-Apply', nullable=False)
    profilePic = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Many-to-Many Relationship for Genres
    genres = db.relationship('Genre', secondary=creator_genre_table, backref=db.backref('creators', lazy='dynamic'))

    # Many-to-Many Relationship for Types
    types = db.relationship('Type', secondary=creator_type_table, backref=db.backref('creators', lazy='dynamic'))


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'types': [type.to_dict() for type in self.types],
            'genres': [genre.to_dict() for genre in self.genres],
            'status': self.status,
            'profilePic': self.profilePic,
            'bio': self.bio,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
        }
