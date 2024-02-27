from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Media(db.Model):
    __tablename__ = 'media'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    file = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    opportunity_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('opportunities.id')), nullable=True)
    submission_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('submissions.id')), nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to User
    user = db.relationship('User', backref=db.backref('media', lazy=True))

    # Relationship to Opportunity
    opportunity = db.relationship('Opportunity', backref=db.backref('media', lazy=True))

    # Relationship to Submission
    submission = db.relationship('Submission', backref=db.backref('media', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'file': self.file,
            'user_id': self.user_id,
            'opportunity_id': self.opportunity_id,
            'submission_id': self.submission_id,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
