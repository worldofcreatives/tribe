from app.models import db, Creator, environment, SCHEMA
from sqlalchemy.sql import text

def seed_creators():
    creator1 = Creator(
        user_id=2,
        name='Creative Mind',
        status='Approved',
        profile_pic='url/profile.png',
        bio='Exploring creativity in every aspect.'
    )

    creator2 = Creator(
        user_id=3,
        name='Innovative Artist',
        status='Pending',
        profile_pic='url/profile2.png',
        bio='Innovating art for the new age.'
    )

    db.session.add_all([creator1, creator2])

    db.session.commit()

def undo_creators():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.creators RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM creators"))

    db.session.commit()
