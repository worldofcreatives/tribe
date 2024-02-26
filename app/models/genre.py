from .db import db, environment, SCHEMA, add_prefix_for_prod

class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    genreId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def to_dict(self):
        return {
            'genreId': self.genreId,
            'name': self.name,
        }
