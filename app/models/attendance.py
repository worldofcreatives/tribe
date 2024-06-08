from .db import db
from datetime import datetime

class Attendance(db.Model):
    __tablename__ = 'attendance'
    __table_args__ = (
        db.Index('ix_attendance_event_id', 'event_id'),
        db.Index('ix_attendance_user_id', 'user_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    checked_in = db.Column(db.Boolean, nullable=False, default=False)
    checked_in_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'checked_in': self.checked_in,
            'checked_in_at': self.checked_in_at.isoformat() if self.checked_in_at else None,
        }
