from .db import db

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_types = db.Column(db.String, nullable=False)  # JSON encoded list
    activity_types = db.Column(db.String, nullable=False)  # JSON encoded list
    restaurant_types = db.Column(db.String, nullable=False)  # JSON encoded list
    group_size = db.Column(db.String, nullable=False)

    def __init__(self, user_id, event_types, activity_types, restaurant_types, group_size):
        self.user_id = user_id
        self.event_types = json.dumps(event_types)
        self.activity_types = json.dumps(activity_types)
        self.restaurant_types = json.dumps(restaurant_types)
        self.group_size = group_size

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_types': json.loads(self.event_types),
            'activity_types': json.loads(self.activity_types),
            'restaurant_types': json.loads(self.restaurant_types),
            'group_size': self.group_size
        }




# from .db import db

# class UserPreferences(db.Model):
#     __tablename__ = 'user_preferences'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     event_types = db.Column(db.ARRAY(db.String), nullable=False)
#     activity_types = db.Column(db.ARRAY(db.String), nullable=False)
#     restaurant_types = db.Column(db.ARRAY(db.String), nullable=False)
#     group_size = db.Column(db.String(50), nullable=False)

#     user = db.relationship('User', back_populates='preferences')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'event_types': self.event_types,
#             'activity_types': self.activity_types,
#             'restaurant_types': self.restaurant_types,
#             'group_size': self.group_size,
#         }
