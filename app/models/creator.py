from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import creator_genre_table

class Creator(db.Model):
    __tablename__ = 'creators'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    creatorId = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Enum('Producer', 'Writer', 'Musician', name='creator_types'), nullable=False)
    status = db.Column(db.String(255), nullable=True)
    profilePic = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Many-to-Many Relationship
    genres = db.relationship('Genre', secondary=creator_genre_table, backref=db.backref('creators', lazy='dynamic'))

    def to_dict(self):
        return {
            'creatorId': self.creatorId,
            'userId': self.userId,
            'name': self.name,
            'type': self.type,
            'genres': [genre.to_dict() for genre in self.genres],
            'status': self.status,
            'profilePic': self.profilePic,
            'bio': self.bio,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
        }
