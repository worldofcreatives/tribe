from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    __table_args__ = (
        db.Index('ix_review_event_id', 'event_id'),
        db.Index('ix_review_user_id', 'user_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'review_text': self.review_text,
            'created_at': self.created_at.isoformat(),
        }
