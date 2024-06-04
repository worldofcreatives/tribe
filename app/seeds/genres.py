from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text

def seed_genres():
    genres = ['Afro', 'Country', 'Dancehall', 'Disco', 'Funk', 'Hip Hop', 'Latin', 'Neo Soul', 'Pop', 'R&B', 'Reggae', 'Rock', 'Other']

    for genre_name in genres:
        existing_genre = Genre.query.filter_by(name=genre_name).first()
        if not existing_genre:
            genre = Genre(name=genre_name)
            db.session.add(genre)

    db.session.commit()

def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("TRUNCATE genres RESTART IDENTITY CASCADE;"))

    db.session.commit()
