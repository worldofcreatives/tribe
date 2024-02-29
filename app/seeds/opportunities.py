from app.models import db, Opportunity, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_opportunities():
    opportunity1 = Opportunity(
        company_id=1,
        name='Music for Commercial',
        description='Seeking original music to feature in a national commercial.',
        target_audience='All Ages',
        budget=5000.00,
        guidelines='Original music only, any genre.',
        created_date=datetime.now(),
        updated_date=datetime.now()
    )

    opportunity2 = Opportunity(
        company_id=1,
        name='Theme Song for Podcast',
        description='Looking for a catchy theme song for our new tech podcast.',
        target_audience='Tech Enthusiasts',
        budget=2000.00,
        guidelines='Must be catchy and no longer than 30 seconds.',
        created_date=datetime.now(),
        updated_date=datetime.now()
    )

    # Add opportunities to the session
    db.session.add_all([opportunity1, opportunity2])

    db.session.commit()

def undo_opportunities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.opportunities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM opportunities"))

    db.session.commit()
