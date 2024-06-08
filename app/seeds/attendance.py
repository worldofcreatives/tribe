from app.models import db, Attendance
from datetime import datetime

def seed_attendance():
    attendance_records = [
        {
            'event_id': 1,
            'user_id': 1,
            'checked_in': True,
            'checked_in_at': datetime.utcnow()
        }
    ]

    for attendance_data in attendance_records:
        attendance = Attendance(
            event_id=attendance_data['event_id'],
            user_id=attendance_data['user_id'],
            checked_in=attendance_data['checked_in'],
            checked_in_at=attendance_data['checked_in_at']
        )
        db.session.add(attendance)

    db.session.commit()

def undo_attendance():
    db.session.execute("DELETE FROM attendance")
    db.session.commit()
