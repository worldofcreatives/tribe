from .db import db
from .db import environment, SCHEMA, add_prefix_for_prod

# # Associations

# opp_media_table = db.Table('opp_media',
#     db.Column('opportunities_id', db.Integer, db.ForeignKey(add_prefix_for_prod('opportunities.id')), primary_key=True),
#     db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
# )
# if environment == "production":
#        opp_media_table.schema = SCHEMA

# sub_media_table = db.Table('sub_media',
#     db.Column('submissions_id', db.Integer, db.ForeignKey(add_prefix_for_prod('submissions.id')), primary_key=True),
#     db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
# )
# if environment == "production":
#        sub_media_table.schema = SCHEMA

# feedback_media_table = db.Table('feedback_media',
#     db.Column('feedback_id', db.Integer, db.ForeignKey(add_prefix_for_prod('feedback.id')), primary_key=True),
#     db.Column('media_id', db.Integer, db.ForeignKey(add_prefix_for_prod('media.id')), primary_key=True)
# )
# if environment == "production":
#        feedback_media_table.schema = SCHEMA


# Models
from .user import User
from .event import Event
from .attendance import Attendance
from .review import Review
from .report import Report
from .notification import Notification
from .availability import Availability
from .invite import Invite
from .user_preferences import UserPreferences
from .user_availability import UserAvailability
