from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import feedback_media_table

class Feedback(db.Model):
    __tablename__ = 'feedback'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    submission_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('submissions.id')), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationship to Submission
    submission = db.relationship('Submission', backref=db.backref('feedbacks', lazy=True))

    # Many-to-Many Relationship with Media
    feedMedia = db.relationship('Media', secondary=feedback_media_table, backref=db.backref('feedbacks', lazy='dynamic'))

    def to_dict(self):
        return {
            'id': self.id,
            'submission_id': self.submission_id,
            'sender_id': self.sender_id,
            'message': self.message,
            'created_date': self.created_date.isoformat(),
            'feedMedia': [media.to_dict() for media in self.feedMedia],
        }
