from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    companyId = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    companyName = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Enum('Pre-Apply', 'Denied', 'Pending', 'Approved'), default='Pre-Apply', nullable=False)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'companyId': self.companyId,
            'userId': self.userId,
            'name': self.name,
            'companyName': self.companyName,
            'bio': self.bio,
            'logo': self.logo,
            'status': self.status,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
        }
