from app.models import db, Creator, environment, SCHEMA
from sqlalchemy.sql import text

def seed_creators():
    # Example creators
    creators = [
        {
            'user_id': 2,
            'first_name': None,
            'last_name': None,
            'stage_name': None,
            'profile_pic': 'url/profile.png',
            'bio': 'Exploring creativity in every aspect.',
            'phone': None,
            'address_1': None,
            'address_2': None,
            'city': None,
            'state': None,
            'postal_code': None,
            'portfolio_url': None,
            'previous_projects': None,
            'instagram': None,
            'twitter': None,
            'facebook': None,
            'youtube': None,
            'other_social_media': None,
            'reference_name': None,
            'reference_email': None,
            'reference_phone': None,
            'reference_relationship': None,
            'created_date': '2024-05-28 21:23:11.322576',
            'updated_date': '2024-05-28 21:23:11.322579'
        },
        {
            'user_id': 3,
            'first_name': None,
            'last_name': None,
            'stage_name': None,
            'profile_pic': 'url/profile.png',
            'bio': 'Innovating art for the new age.',
            'phone': None,
            'address_1': None,
            'address_2': None,
            'city': None,
            'state': None,
            'postal_code': None,
            'portfolio_url': None,
            'previous_projects': None,
            'instagram': None,
            'twitter': None,
            'facebook': None,
            'youtube': None,
            'other_social_media': None,
            'reference_name': None,
            'reference_email': None,
            'reference_phone': None,
            'reference_relationship': None,
            'created_date': '2024-05-28 21:23:11.322576',
            'updated_date': '2024-05-28 21:23:11.322579'
        },
        # Add more creators as needed
    ]

    for creator_data in creators:
        existing_creator = Creator.query.filter_by(user_id=creator_data['user_id']).first()
        if not existing_creator:
            creator = Creator(
                user_id=creator_data['user_id'],
                first_name=creator_data['first_name'],
                last_name=creator_data['last_name'],
                stage_name=creator_data['stage_name'],
                profile_pic=creator_data['profile_pic'],
                bio=creator_data['bio'],
                phone=creator_data['phone'],
                address_1=creator_data['address_1'],
                address_2=creator_data['address_2'],
                city=creator_data['city'],
                state=creator_data['state'],
                postal_code=creator_data['postal_code'],
                portfolio_url=creator_data['portfolio_url'],
                previous_projects=creator_data['previous_projects'],
                instagram=creator_data['instagram'],
                twitter=creator_data['twitter'],
                facebook=creator_data['facebook'],
                youtube=creator_data['youtube'],
                other_social_media=creator_data['other_social_media'],
                reference_name=creator_data['reference_name'],
                reference_email=creator_data['reference_email'],
                reference_phone=creator_data['reference_phone'],
                reference_relationship=creator_data['reference_relationship'],
                created_date=creator_data['created_date'],
                updated_date=creator_data['updated_date']
            )
            db.session.add(creator)

    db.session.commit()

def undo_creators():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.creators RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM creators"))

    db.session.commit()
