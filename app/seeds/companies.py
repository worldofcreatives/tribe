from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_companies():
    # Example companies
    company1 = Company(
        user_id=1,
        name='Demo Corp',
        bio='A demo company for demonstration purposes.',
        logo='path/to/demo/logo.png',
    )

    company2 = Company(
        user_id=5,
        name='Tech Innovations',
        bio='Innovating the future of technology.',
        logo='path/to/tech/innovations/logo.png',
    )

    # Add companies to the session
    db.session.add_all([company1, company2])

    db.session.commit()

def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
