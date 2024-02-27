from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import Enum
from . import sub_media_table

class Submission(db.Model):
    __tablename__ = 'submissions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    subId = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('creators.creatorId')), nullable=False)
    oppId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('opportunities.oppId')), nullable=False)
    name = db.Column(db.Text, nullable=False)
    status = db.Column(Enum('Pending', 'Reviewing', 'Accepted', 'Rejected', 'Archived'), default='Pending', nullable=False)
    notes = db.Column(db.Text, nullable=True)
    bpm = db.Column(db.Integer, nullable=True)
    collaborators = db.Column(db.String(500), nullable=True)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to Creator
    creator = db.relationship('Creator', backref=db.backref('submissions', lazy=True))

    # Relationship to Opportunity
    opportunity = db.relationship('Opportunity', backref=db.backref('submissions', lazy=True))

    # Many-to-Many Relationship with Media
    subMedia = db.relationship('Media', secondary=sub_media_table, backref=db.backref('submissions', lazy='dynamic'))

    def to_dict(self):
        return {
            'subId': self.subId,
            'creatorId': self.creatorId,
            'oppId': self.oppId,
            'name': self.name,
            'status': self.status,
            'notes': self.notes,
            'bpm': self.bpm,
            'collaborators': self.collaborators,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
            'subMedia': [media.to_dict() for media in self.subMedia],
        }
