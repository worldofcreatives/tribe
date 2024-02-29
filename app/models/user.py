from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM
import os
import binascii

# Define the ENUM type with a name for user types
user_type_enum = ENUM('Creator', 'Company', name='user_type_enum', metadata=db.metadata)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    # Use the defined ENUM type
    type = db.Column(user_type_enum, default='Creator', nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('creators.id')), nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    company = db.relationship('Company', backref=db.backref('user', uselist=False), foreign_keys=[company_id], lazy=True)
    creator = db.relationship('Creator', backref=db.backref('user', uselist=False), foreign_keys=[creator_id], lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.salt = binascii.hexlify(os.urandom(16)).decode()  # Generate a new salt
        # Mix in the the salt with the password before hashing
        self.hashed_password = generate_password_hash(password + self.salt)

    def check_password(self, password):
        # Check password against the hashed password
        return check_password_hash(self.hashed_password, password + self.salt)

    def is_company(self):
        return self.type == 'Company'

    def to_dict(self):
        return {
            'user_id': self.id,
            'username': self.username,
            'email': self.email,
            'type': self.type,
            'id': self.company_id or self.creator_id,  # Assuming you want to return the relevant ID
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
