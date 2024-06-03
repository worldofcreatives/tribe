from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_companies():
    # Example companies
    companies = [
        {
            'user_id': 1,
            'name': 'Demo Corp',
            'bio': 'A demo company for demonstration purposes.',
            'logo': 'path/to/demo/logo.png',
        },
        {
            'user_id': 5,
            'name': 'Tech Innovations',
            'bio': 'Innovating the future of technology.',
            'logo': 'path/to/tech/innovations/logo.png',
        }
    ]

    for company_data in companies:
        existing_company = Company.query.filter_by(user_id=company_data['user_id']).first()
        if not existing_company:
            company = Company(
                user_id=company_data['user_id'],
                name=company_data['name'],
                bio=company_data['bio'],
                logo=company_data['logo']
            )
            db.session.add(company)

    db.session.commit()

def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
