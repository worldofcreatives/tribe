from .db import db

class Availability(db.Model):
    __tablename__ = 'availability'
    __table_args__ = (
        db.Index('ix_availability_user_id', 'user_id'),
        db.Index('ix_availability_day_of_week', 'day_of_week'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)
    early_morning = db.Column(db.Boolean, nullable=False, default=False)
    morning = db.Column(db.Boolean, nullable=False, default=False)
    afternoon = db.Column(db.Boolean, nullable=False, default=False)
    night = db.Column(db.Boolean, nullable=False, default=False)
    late_night = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'day_of_week': self.day_of_week,
            'early_morning': self.early_morning,
            'morning': self.morning,
            'afternoon': self.afternoon,
            'night': self.night,
            'late_night': self.late_night,
        }
