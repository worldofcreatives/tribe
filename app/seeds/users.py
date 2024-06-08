from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text
import os
import binascii
from datetime import datetime

def seed_users():
    users = [
        {
            'username': 'Demo',
            'email': 'demo@aa.io',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_demo.png',
            'type': 'Company',
            'status': 'Accepted',
            'bio': 'Demo user for testing.',
            'preferences': {'activities': ['hiking', 'dining'], 'group_size': 'small'},
            'availability': {'monday': ['morning', 'afternoon'], 'tuesday': ['night']}
        },
        {
            'username': 'marnie',
            'email': 'marnie@aa.io',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_marnie.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Creator Marnie.',
            'preferences': {'activities': ['music', 'reading'], 'group_size': 'large'},
            'availability': {'wednesday': ['morning'], 'thursday': ['night']}
        },
        {
            'username': 'bobbie',
            'email': 'bobbie@aa.io',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_bobbie.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Creator Bobbie.',
            'preferences': {'activities': ['sports', 'movies'], 'group_size': 'medium'},
            'availability': {'friday': ['afternoon'], 'saturday': ['night']}
        },
        {
            'username': 'alice',
            'email': 'alice@example.com',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_alice.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Company Alice.',
            'preferences': {'activities': ['networking', 'dining'], 'group_size': 'small'},
            'availability': {'sunday': ['morning', 'night']}
        },
        {
            'username': 'charlie',
            'email': 'charlie@example.com',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_charlie.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Company Charlie.',
            'preferences': {'activities': ['tech', 'gaming'], 'group_size': 'large'},
            'availability': {'monday': ['night'], 'tuesday': ['afternoon']}
        },
        {
            'username': 'dana',
            'email': 'dana@example.com',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_dana.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Creator Dana.',
            'preferences': {'activities': ['art', 'travel'], 'group_size': 'medium'},
            'availability': {'wednesday': ['morning', 'night']}
        },
        {
            'username': 'evan',
            'email': 'evan@example.com',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_evan.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Company Evan.',
            'preferences': {'activities': ['finance', 'dining'], 'group_size': 'small'},
            'availability': {'thursday': ['morning'], 'friday': ['night']}
        },
        {
            'username': 'fiona',
            'email': 'fiona@example.com',
            'password': 'password',
            'profile_picture': 'url/to/profile_picture_fiona.png',
            'type': 'Creator',
            'status': 'Pre-Apply',
            'bio': 'Creator Fiona.',
            'preferences': {'activities': ['music', 'movies'], 'group_size': 'large'},
            'availability': {'saturday': ['morning', 'afternoon']}
        }
    ]

    for user_data in users:
        existing_user = User.query.filter_by(email=user_data['email']).first()
        if not existing_user:
            salt = binascii.hexlify(os.urandom(16)).decode()
            hashed_password = generate_password_hash(user_data['password'] + salt)
            user = User(
                username=user_data['username'],
                email=user_data['email'],
                hashed_password=hashed_password,
                salt=salt,
                profile_picture=user_data['profile_picture'],
                type=user_data['type'],
                status=user_data['status'],
                bio=user_data['bio'],
                preferences=user_data['preferences'],
                availability=user_data['availability'],
                created_date=datetime.utcnow(),
                updated_date=datetime.utcnow()
            )
            db.session.add(user)

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()


# from app.models import db, User, environment, SCHEMA
# from werkzeug.security import generate_password_hash
# from sqlalchemy.sql import text
# import os
# import binascii

# def seed_users():
#     users = [
#         {
#             'username': 'Demo',
#             'email': 'demo@aa.io',
#             'password': 'password',
#             'type': 'Company',
#             'status': 'Accepted'
#         },
#         {
#             'username': 'marnie',
#             'email': 'marnie@aa.io',
#             'password': 'password',
#             'type': 'Creator',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'bobbie',
#             'email': 'bobbie@aa.io',
#             'password': 'password',
#             'type': 'Creator',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'alice',
#             'email': 'alice@example.com',
#             'password': 'password',
#             'type': 'Company',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'charlie',
#             'email': 'charlie@example.com',
#             'password': 'password',
#             'type': 'Company',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'dana',
#             'email': 'dana@example.com',
#             'password': 'password',
#             'type': 'Creator',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'evan',
#             'email': 'evan@example.com',
#             'password': 'password',
#             'type': 'Company',
#             'status': 'Pre-Apply'
#         },
#         {
#             'username': 'fiona',
#             'email': 'fiona@example.com',
#             'password': 'password',
#             'type': 'Creator',
#             'status': 'Pre-Apply'
#         }
#     ]

#     for user_data in users:
#         existing_user = User.query.filter_by(email=user_data['email']).first()
#         if not existing_user:
#             salt = binascii.hexlify(os.urandom(16)).decode()
#             hashed_password = generate_password_hash(user_data['password'] + salt)
#             user = User(
#                 username=user_data['username'],
#                 email=user_data['email'],
#                 hashed_password=hashed_password,
#                 salt=salt,
#                 type=user_data['type'],
#                 status=user_data['status']
#             )
#             db.session.add(user)

#     db.session.commit()

# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))

#     db.session.commit()
