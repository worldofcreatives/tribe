from app.models import db, Event
from datetime import datetime, time

def seed_events():
    events = [
        {
            'name': 'Morning Hike',
            'venue': 'City Park',
            'date': datetime(2023, 6, 15),
            'time': time(8, 0),
            'description': 'A relaxing morning hike through the park.',
            'capacity': 10,
            'created_by': 1,
        }
    ]

    for event_data in events:
        event = Event(
            name=event_data['name'],
            venue=event_data['venue'],
            date=event_data['date'],
            time=event_data['time'],
            description=event_data['description'],
            capacity=event_data['capacity'],
            created_by=event_data['created_by'],
            created_date=datetime.utcnow(),
            updated_date=datetime.utcnow()
        )
        db.session.add(event)

    db.session.commit()

def undo_events():
    db.session.execute("DELETE FROM events")
    db.session.commit()
