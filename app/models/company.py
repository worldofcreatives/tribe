from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Enum('Pre-Apply', 'Denied', 'Pending', 'Approved'), default='Pre-Apply', nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'company_name': self.company_name,
            'bio': self.bio,
            'logo': self.logo,
            'status': self.status,
            'created_date': self.created_date.isoformat(),
            'updated_date': self.updated_date.isoformat(),
        }
