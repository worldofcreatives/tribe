from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
import os
import binascii

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    __table_args__ = (
        db.Index('ix_user_email', 'email'),
        db.Index('ix_user_username', 'username'),
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    type = db.Column(db.String(50), default='Creator', nullable=False)
    status = db.Column(db.String(50), default='Pre-Apply', nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    preferences = db.relationship('UserPreferences', back_populates='user', uselist=False)
    availability = db.relationship('UserAvailability', back_populates='user', uselist=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.salt = binascii.hexlify(os.urandom(16)).decode()  # Generate a new salt
        self.hashed_password = generate_password_hash(password + self.salt)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password + self.salt)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'type': self.type,
            'status': self.status,
            'profile_picture': self.profile_picture,
            'bio': self.bio,
            'preferences': self.preferences.to_dict() if self.preferences else None,
            'availability': self.availability.to_dict() if self.availability else None,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }



#
# from .db import db, environment, SCHEMA
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
# from datetime import datetime
# import os
# import binascii
# from app.utils.email_utils import send_email

# class User(db.Model, UserMixin):
#     __tablename__ = 'users'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     username = db.Column(db.String(40), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)
#     salt = db.Column(db.String(255), nullable=False)
#     type = db.Column(db.String(50), default='Creator', nullable=False)
#     _status = db.Column("status", db.String(50), default='Pre-Apply', nullable=False)
#     stripe_customer_id = db.Column(db.String(120), unique=True)
#     stripe_subscription_id = db.Column(db.String(120), unique=True)
#     created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.salt = binascii.hexlify(os.urandom(16)).decode()  # Generate a new salt
#         self.hashed_password = generate_password_hash(password + self.salt)

#     def check_password(self, password):
#         return check_password_hash(self.hashed_password, password + self.salt)

#     def is_company(self):
#         return self.type == 'Company'

#     @property
#     def status(self):
#         return self._status

#     @status.setter
#     def status(self, new_status):
#         if new_status != self._status:
#             self.send_status_change_email(new_status, self._status)
#             self._status = new_status

#     def send_status_change_email(self, new_status, old_status):
#         if new_status == 'Applied':
#             send_email(self.email, 'Application Received', 'Thank you for applying!')
#         elif new_status == 'Accepted':
#             # Check if the old status is not Premium Monthly or Premium Annual
#             if old_status not in ['Premium Monthly', 'Premium Annual']:
#                 send_email(self.email, 'Application Accepted', 'Congratulations, your application has been accepted!')
#         elif new_status == 'Denied':
#             send_email(self.email, 'Application Denied', 'We regret to inform you that your application has been denied.')
#         elif new_status == 'Premium Monthly':
#             send_email(self.email, 'Subscription Upgraded', 'You have successfully upgraded to a Premium Monthly subscription.')
#         elif new_status == 'Premium Annual':
#             send_email(self.email, 'Subscription Upgraded', 'You have successfully upgraded to a Premium Annual subscription.')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'username': self.username,
#             'email': self.email,
#             'type': self.type,
#             'status': self.status,
#             'stripe_customer_id': self.stripe_customer_id,
#             'stripe_subscription_id': self.stripe_subscription_id,
#             'created_date': self.created_date.isoformat(),
#             'updated_date': self.updated_date.isoformat(),
#         }
