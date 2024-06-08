from app.models import db, Availability

def seed_availability():
    availabilities = [
        {
            'user_id': 1,
            'day_of_week': 'monday',
            'early_morning': True,
            'morning': False,
            'afternoon': True,
            'night': False,
            'late_night': False
        }
    ]

    for availability_data in availabilities:
        availability = Availability(
            user_id=availability_data['user_id'],
            day_of_week=availability_data['day_of_week'],
            early_morning=availability_data['early_morning'],
            morning=availability_data['morning'],
            afternoon=availability_data['afternoon'],
            night=availability_data['night'],
            late_night=availability_data['late_night']
        )
        db.session.add(availability)

    db.session.commit()

def undo_availability():
    db.session.execute("DELETE FROM availability")
    db.session.commit()
