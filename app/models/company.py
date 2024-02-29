from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import CreateSchema
from sqlalchemy.dialects.postgresql import ENUM
from datetime import datetime

from .db import db, environment, SCHEMA, add_prefix_for_prod

Base = declarative_base()

status_enum = ENUM('Pre-Apply', 'Denied', 'Pending', 'Approved', name='status_enum', metadata=Base.metadata)

class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    bio = Column(Text, nullable=True)
    logo = Column(String(255), nullable=True)
    status = Column(status_enum, default='Pre-Apply', nullable=False)
    created_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_date = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

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
