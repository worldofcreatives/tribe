from .db import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'
    __table_args__ = (
        db.Index('ix_event_date', 'date'),
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    venue = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    time = db.Column(db.Time, nullable=False)
    description = db.Column(db.Text, nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'venue': self.venue,
            'date': self.date.isoformat(),
            'time': self.time.isoformat(),
            'description': self.description,
            'capacity': self.capacity,
            'created_by': self.created_by,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
