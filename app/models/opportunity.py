from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from . import opp_media_table

class Opportunity(db.Model):
    __tablename__ = 'opportunities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    oppId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    targetAudience = db.Column(db.String(255), nullable=True)
    budget = db.Column(db.DECIMAL(10,2), nullable=True)
    guidelines = db.Column(db.Text, nullable=True)
    companyId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.companyId')), nullable=False)
    createdDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedDate = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to Company
    company = db.relationship('Company', backref=db.backref('opportunities', lazy=True))

    # Many-to-Many Relationship with Media
    oppMedia = db.relationship('Media', secondary=opp_media_table, backref=db.backref('opportunities', lazy='dynamic'))

    def to_dict(self):
        return {
            'oppId': self.oppId,
            'name': self.name,
            'description': self.description,
            'targetAudience': self.targetAudience,
            'budget': str(self.budget),
            'guidelines': self.guidelines,
            'companyId': self.companyId,
            'isActive': self.isActive,
            'createdDate': self.createdDate.isoformat(),
            'updatedDate': self.updatedDate.isoformat(),
            'oppMedia': [media.to_dict() for media in self.oppMedia],
        }
