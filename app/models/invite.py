from .db import db
from datetime import datetime

class Invite(db.Model):
    __tablename__ = 'invites'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    invite_sent_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'status': self.status,
            'invite_sent_at': self.invite_sent_at.isoformat(),
        }
