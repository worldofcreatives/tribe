from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text

def seed_types():
    # List of genre names
    type_names = [
        "Afro", "Country", "Dancehall", "Disco", "Funk",
        "Hip Hop", "Latin", "Neo Soul", "Pop", "R&B",
        "Reggae", "Rock", "Other"
    ]

    # Create Genre instances
    types = [Type(name=name) for name in type_names]

    # Add genres to the session
    db.session.add_all(types)

    db.session.commit()

def undo_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("TRUNCATE TABLE types RESTART IDENTITY CASCADE;"))

    db.session.commit()
