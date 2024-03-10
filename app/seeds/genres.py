from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text

def seed_genres():
    # List of genre names
    genre_names = [
        "Afro", "Country", "Dancehall", "Disco", "Funk",
        "Hip Hop", "Latin", "Neo Soul", "Pop", "R&B",
        "Reggae", "Rock", "Other"
    ]

    # Create Genre instances
    genres = [Genre(name=name) for name in genre_names]

    # Add genres to the session
    db.session.add_all(genres)

    db.session.commit()

def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("TRUNCATE TABLE genres RESTART IDENTITY CASCADE;"))

    db.session.commit()
