from .db import db
from datetime import datetime

class Notification(db.Model):
    __tablename__ = 'notifications'
    __table_args__ = (
        db.Index('ix_notification_user_id', 'user_id'),
        db.Index('ix_notification_created_at', 'created_at'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    read = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'created_at': self.created_at.isoformat(),
            'read': self.read,
        }
