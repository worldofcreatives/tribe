from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import opp_media_table, opp_genre_table, opp_type_table

class Opportunity(db.Model):
    __tablename__ = 'opportunities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    target_audience = db.Column(db.String(255), nullable=True)
    budget = db.Column(db.DECIMAL(10,2), nullable=True)
    guidelines = db.Column(db.Text, nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to Company
    company = db.relationship('Company', backref=db.backref('opportunities', lazy=True))

    # Many-to-Many Relationship with Media
    opp_media = db.relationship('Media', secondary=opp_media_table, backref=db.backref('opportunities', lazy='dynamic'))

    # Many-to-Many Relationship with Genres
    genres = db.relationship('Genre', secondary=opp_genre_table, backref='opportunities')

    # Many-to-Many Relationship with Types
    types = db.relationship('Type', secondary=opp_type_table, backref='opportunities')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'genres': [genre.to_dict() for genre in self.genres],
            'types': [type.to_dict() for type in self.types],
            'description': self.description,
            'target_audience': self.target_audience,
            'budget': str(self.budget),
            'guidelines': self.guidelines,
            'created_date': self.created_date.isoformat(),
            'user_id': self.user_id,
            'submissions_count': len(self.submissions),
            'updated_date': self.updated_date.isoformat(),
            'opp_media': [media.to_dict() for media in self.opp_media],
        }
