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
    type = db.Column(db.Enum('Creator', 'Company'), default='Creator', nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.companyId'), nullable=True)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # # Relationship to Company (if applicable)
    # company = db.relationship('Company', backref='users', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.salt = binascii.hexlify(os.urandom(16)).decode()  # Generate a new salt
        # Incorporate the salt with the password before hashing
        self.hashed_password = generate_password_hash(password + self.salt)

    def check_password(self, password):
        # Use the salt from the database with the input password to check against the hashed password
        return check_password_hash(self.hashed_password, password + self.salt)

    def is_company(self):
        return self.type == 'Company'

    def to_dict(self):
        return {
            'userId': self.id,
            'username': self.username,
            'email': self.email,
            'type': self.type,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
        }
