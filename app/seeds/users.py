# from app.models import db, User, UserPreferences, UserAvailability, environment, SCHEMA
# from werkzeug.security import generate_password_hash
# from sqlalchemy.sql import text
# import os
# import binascii
# from datetime import datetime
# import json

# def seed_users():
#     users = [
#         {
#             'username': 'Demo',
#             'email': 'demo@aa.io',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_demo.png',
#             'type': 'Company',
#             'status': 'Accepted',
#             'bio': 'Demo user for testing.',
#             'preferences': {'activities': ['hiking', 'dining'], 'group_size': 'small'},
#             'availability': {
#                 'monday': {'early_morning': False, 'morning': True, 'afternoon': True, 'night': False, 'late_night': False},
#                 'tuesday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'marnie',
#             'email': 'marnie@aa.io',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_marnie.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Creator Marnie.',
#             'preferences': {'activities': ['music', 'reading'], 'group_size': 'large'},
#             'availability': {
#                 'wednesday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': False, 'late_night': False},
#                 'thursday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'bobbie',
#             'email': 'bobbie@aa.io',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_bobbie.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Creator Bobbie.',
#             'preferences': {'activities': ['sports', 'movies'], 'group_size': 'medium'},
#             'availability': {
#                 'friday': {'early_morning': False, 'morning': False, 'afternoon': True, 'night': False, 'late_night': False},
#                 'saturday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'alice',
#             'email': 'alice@example.com',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_alice.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Company Alice.',
#             'preferences': {'activities': ['networking', 'dining'], 'group_size': 'small'},
#             'availability': {
#                 'sunday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'charlie',
#             'email': 'charlie@example.com',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_charlie.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Company Charlie.',
#             'preferences': {'activities': ['tech', 'gaming'], 'group_size': 'large'},
#             'availability': {
#                 'monday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False},
#                 'tuesday': {'early_morning': False, 'morning': False, 'afternoon': True, 'night': False, 'late_night': False}
#             }
#         },
#         {
#             'username': 'dana',
#             'email': 'dana@example.com',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_dana.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Creator Dana.',
#             'preferences': {'activities': ['art', 'travel'], 'group_size': 'medium'},
#             'availability': {
#                 'wednesday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'evan',
#             'email': 'evan@example.com',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_evan.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Company Evan.',
#             'preferences': {'activities': ['finance', 'dining'], 'group_size': 'small'},
#             'availability': {
#                 'thursday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': False, 'late_night': False},
#                 'friday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
#             }
#         },
#         {
#             'username': 'fiona',
#             'email': 'fiona@example.com',
#             'password': 'password',
#             'profile_picture': 'url/to/profile_picture_fiona.png',
#             'type': 'Creator',
#             'status': 'Pre-Apply',
#             'bio': 'Creator Fiona.',
#             'preferences': {'activities': ['music', 'movies'], 'group_size': 'large'},
#             'availability': {
#                 'saturday': {'early_morning': False, 'morning': True, 'afternoon': True, 'night': False, 'late_night': False}
#             }
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
#                 profile_picture=user_data['profile_picture'],
#                 type=user_data['type'],
#                 status=user_data['status'],
#                 bio=user_data['bio'],
#                 created_date=datetime.utcnow(),
#                 updated_date=datetime.utcnow()
#             )
#             db.session.add(user)
#             db.session.commit()

#             preferences = UserPreferences(
#                 user_id=user.id,
#                 event_types=user_data['preferences']['activities'],
#                 activity_types=[],
#                 restaurant_types=[],
#                 group_size=user_data['preferences']['group_size']
#             )
#             db.session.add(preferences)

#             availability_data = user_data['availability']
#             availability = UserAvailability(
#                 user_id=user.id,
#                 monday=json.dumps(availability_data.get('monday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 tuesday=json.dumps(availability_data.get('tuesday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 wednesday=json.dumps(availability_data.get('wednesday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 thursday=json.dumps(availability_data.get('thursday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 friday=json.dumps(availability_data.get('friday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 saturday=json.dumps(availability_data.get('saturday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
#                 sunday=json.dumps(availability_data.get('sunday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False}))
#             )
#             db.session.add(availability)

#     db.session.commit()

# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))

#     db.session.commit()

from app.models import db, User, UserPreferences, UserAvailability, environment, SCHEMA
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text
import os
import binascii
from datetime import datetime
import json

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
            'availability': {
                'monday': {'early_morning': False, 'morning': True, 'afternoon': True, 'night': False, 'late_night': False},
                'tuesday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'wednesday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': False, 'late_night': False},
                'thursday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'friday': {'early_morning': False, 'morning': False, 'afternoon': True, 'night': False, 'late_night': False},
                'saturday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'sunday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'monday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False},
                'tuesday': {'early_morning': False, 'morning': False, 'afternoon': True, 'night': False, 'late_night': False}
            }
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
            'availability': {
                'wednesday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'thursday': {'early_morning': False, 'morning': True, 'afternoon': False, 'night': False, 'late_night': False},
                'friday': {'early_morning': False, 'morning': False, 'afternoon': False, 'night': True, 'late_night': False}
            }
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
            'availability': {
                'saturday': {'early_morning': False, 'morning': True, 'afternoon': True, 'night': False, 'late_night': False}
            }
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
                created_date=datetime.utcnow(),
                updated_date=datetime.utcnow()
            )
            db.session.add(user)
            db.session.commit()

            preferences = UserPreferences(
                user_id=user.id,
                event_types=json.dumps(user_data['preferences']['activities']),
                activity_types=json.dumps([]),
                restaurant_types=json.dumps([]),
                group_size=user_data['preferences']['group_size']
            )
            db.session.add(preferences)

            availability_data = user_data['availability']
            availability = UserAvailability(
                user_id=user.id,
                monday=json.dumps(availability_data.get('monday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                tuesday=json.dumps(availability_data.get('tuesday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                wednesday=json.dumps(availability_data.get('wednesday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                thursday=json.dumps(availability_data.get('thursday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                friday=json.dumps(availability_data.get('friday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                saturday=json.dumps(availability_data.get('saturday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False})),
                sunday=json.dumps(availability_data.get('sunday', {'early_morning': False, 'morning': False, 'afternoon': False, 'night': False, 'late_night': False}))
            )
            db.session.add(availability)

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
