from .db import db
from datetime import datetime

class Report(db.Model):
    __tablename__ = 'reports'
    __table_args__ = (
        db.Index('ix_report_reported_by', 'reported_by'),
        db.Index('ix_report_reported_user', 'reported_user'),
        db.Index('ix_report_event_id', 'event_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    reported_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reported_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'reported_by': self.reported_by,
            'reported_user': self.reported_user,
            'event_id': self.event_id,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
        }
