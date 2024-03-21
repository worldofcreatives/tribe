from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text

VALID_TYPES = [
    "Songwriter", "Musician", "Producer", "Artist"
]

def seed_types():
    for type_name in VALID_TYPES:
        type_ = Type(name=type_name)
        db.session.add(type_)

    db.session.commit()

def undo_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("TRUNCATE types RESTART IDENTITY CASCADE;"))

    db.session.commit()
