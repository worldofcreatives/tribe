from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import feedback_media_table

class Feedback(db.Model):
    __tablename__ = 'feedback'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    submissionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('submissions.id')), nullable=False)
    senderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.Text, nullable=False)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationship to Submission
    submission = db.relationship('Submission', backref=db.backref('feedbacks', lazy=True))

    # Many-to-Many Relationship with Media
    feedMedia = db.relationship('Media', secondary=feedback_media_table, backref=db.backref('feedbacks', lazy='dynamic'))

    def to_dict(self):
        return {
            'id': self.id,
            'submissionId': self.submissionId,
            'senderId': self.senderId,
            'message': self.message,
            'createdDate': self.createdDate.isoformat(),
            'feedMedia': [media.to_dict() for media in self.feedMedia],
        }
