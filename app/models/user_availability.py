from .db import db
import json

class UserAvailability(db.Model):
    __tablename__ = 'user_availability'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    early_morning = db.Column(db.Boolean, nullable=False)
    morning = db.Column(db.Boolean, nullable=False)
    afternoon = db.Column(db.Boolean, nullable=False)
    night = db.Column(db.Boolean, nullable=False)
    late_night = db.Column(db.Boolean, nullable=False)
    days_of_week = db.Column(db.String, nullable=False)  # JSON encoded list

    user = db.relationship('User', back_populates='availability')

    def __init__(self, user_id, early_morning, morning, afternoon, night, late_night, days_of_week):
        self.user_id = user_id
        self.early_morning = early_morning
        self.morning = morning
        self.afternoon = afternoon
        self.night = night
        self.late_night = late_night
        self.days_of_week = json.dumps(days_of_week)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'early_morning': self.early_morning,
            'morning': self.morning,
            'afternoon': self.afternoon,
            'night': self.night,
            'late_night': self.late_night,
            'days_of_week': json.loads(self.days_of_week)
        }




# from .db import db
# import json

# class UserAvailability(db.Model):
#     __tablename__ = 'user_availability'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     early_morning = db.Column(db.Boolean, default=False, nullable=False)
#     morning = db.Column(db.Boolean, default=False, nullable=False)
#     afternoon = db.Column(db.Boolean, default=False, nullable=False)
#     night = db.Column(db.Boolean, default=False, nullable=False)
#     late_night = db.Column(db.Boolean, default=False, nullable=False)
#     days_of_week = db.Column(db.Text, nullable=False)

#     user = db.relationship('User', back_populates='availability')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'early_morning': self.early_morning,
#             'morning': self.morning,
#             'afternoon': self.afternoon,
#             'night': self.night,
#             'late_night': self.late_night,
#             'days_of_week': json.loads(self.days_of_week),
#         }

#     def from_dict(self, data):
#         for field in ['early_morning', 'morning', 'afternoon', 'night', 'late_night', 'days_of_week']:
#             if field in data:
#                 setattr(self, field, json.dumps(data[field]) if isinstance(data[field], list) else data[field])
