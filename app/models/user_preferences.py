# from .db import db
# import json

# class UserPreferences(db.Model):
#     __tablename__ = 'user_preferences'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     event_types = db.Column(db.String, nullable=False)  # JSON encoded list
#     activity_types = db.Column(db.String, nullable=False)  # JSON encoded list
#     restaurant_types = db.Column(db.String, nullable=False)  # JSON encoded list
#     group_size = db.Column(db.String, nullable=False)

#     user = db.relationship('User', back_populates='preferences')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'event_types': json.loads(self.event_types),
#             'activity_types': json.loads(self.activity_types),
#             'restaurant_types': json.loads(self.restaurant_types),
#             'group_size': self.group_size
#         }

from .db import db
import json

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_types = db.Column(db.String, nullable=False)  # JSON encoded list
    activity_types = db.Column(db.String, nullable=False)  # JSON encoded list
    restaurant_types = db.Column(db.String, nullable=False)  # JSON encoded list
    group_size = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='preferences')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_types': json.loads(self.event_types),
            'activity_types': json.loads(self.activity_types),
            'restaurant_types': json.loads(self.restaurant_types),
            'group_size': self.group_size
        }
