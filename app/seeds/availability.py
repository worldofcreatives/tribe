from app.models import db, UserAvailability

def seed_availability():
    availabilities = [
        {
            'user_id': 1,
            'monday': {
                'early_morning': True,
                'morning': False,
                'afternoon': True,
                'night': False,
                'late_night': False
            },
            'tuesday': {
                'early_morning': False,
                'morning': True,
                'afternoon': False,
                'night': True,
                'late_night': False
            },
            'wednesday': {
                'early_morning': False,
                'morning': False,
                'afternoon': True,
                'night': False,
                'late_night': True
            },
            'thursday': {
                'early_morning': True,
                'morning': False,
                'afternoon': False,
                'night': False,
                'late_night': True
            },
            'friday': {
                'early_morning': False,
                'morning': True,
                'afternoon': False,
                'night': True,
                'late_night': False
            },
            'saturday': {
                'early_morning': False,
                'morning': False,
                'afternoon': True,
                'night': True,
                'late_night': False
            },
            'sunday': {
                'early_morning': True,
                'morning': False,
                'afternoon': False,
                'night': False,
                'late_night': True
            }
        },
        {
            'user_id': 2,
            'monday': {
                'early_morning': False,
                'morning': True,
                'afternoon': False,
                'night': True,
                'late_night': True
            },
            'tuesday': {
                'early_morning': True,
                'morning': False,
                'afternoon': True,
                'night': False,
                'late_night': False
            },
            'wednesday': {
                'early_morning': True,
                'morning': True,
                'afternoon': False,
                'night': True,
                'late_night': False
            },
            'thursday': {
                'early_morning': False,
                'morning': False,
                'afternoon': True,
                'night': False,
                'late_night': True
            },
            'friday': {
                'early_morning': True,
                'morning': True,
                'afternoon': False,
                'night': False,
                'late_night': False
            },
            'saturday': {
                'early_morning': False,
                'morning': True,
                'afternoon': True,
                'night': False,
                'late_night': True
            },
            'sunday': {
                'early_morning': True,
                'morning': False,
                'afternoon': True,
                'night': True,
                'late_night': False
            }
        }
    ]

    for availability_data in availabilities:
        availability = UserAvailability(
            user_id=availability_data['user_id'],
            monday=availability_data['monday'],
            tuesday=availability_data['tuesday'],
            wednesday=availability_data['wednesday'],
            thursday=availability_data['thursday'],
            friday=availability_data['friday'],
            saturday=availability_data['saturday'],
            sunday=availability_data['sunday']
        )
        db.session.add(availability)

    db.session.commit()

def undo_availability():
    db.session.execute("DELETE FROM user_availability")
    db.session.commit()




# from app.models import db, Availability

# def seed_availability():
#     availabilities = [
#         {
#             'user_id': 1,
#             'day_of_week': 'monday',
#             'early_morning': True,
#             'morning': False,
#             'afternoon': True,
#             'night': False,
#             'late_night': False
#         }
#     ]

#     for availability_data in availabilities:
#         availability = Availability(
#             user_id=availability_data['user_id'],
#             day_of_week=availability_data['day_of_week'],
#             early_morning=availability_data['early_morning'],
#             morning=availability_data['morning'],
#             afternoon=availability_data['afternoon'],
#             night=availability_data['night'],
#             late_night=availability_data['late_night']
#         )
#         db.session.add(availability)

#     db.session.commit()

# def undo_availability():
#     db.session.execute("DELETE FROM availability")
#     db.session.commit()

