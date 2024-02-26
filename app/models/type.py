from .db import db, environment, SCHEMA

class Type(db.Model):
    __tablename__ = 'types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    typeId = db.Column(db.Integer, primary_key=True)
    typeName = db.Column(db.String(255), unique=True, nullable=False)

    def to_dict(self):
        return {
            'typeId': self.typeId,
            'typeName': self.typeName,
        }
