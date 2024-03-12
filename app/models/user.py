from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
import os
import binascii

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(50), default='Creator', nullable=False)
    status = db.Column(db.String(50), default='Pre-Apply', nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.salt = binascii.hexlify(os.urandom(16)).decode()  # Generate a new salt
        # mix in the the salt with the password before hashing
        self.hashed_password = generate_password_hash(password + self.salt)

    def check_password(self, password):
        # check pw against the hashed password
        return check_password_hash(self.hashed_password, password + self.salt)

    def is_company(self):
        return self.type == 'Company'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'type': self.type,
            'status': self.status,
            # 'company_id': self.company_id,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
