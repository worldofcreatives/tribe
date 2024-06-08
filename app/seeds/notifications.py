from app.models import db, Notification
from datetime import datetime

def seed_notifications():
    notifications = [
        {
            'user_id': 1,
            'message': 'You have been invited to Morning Hike',
            'created_at': datetime.utcnow(),
            'read': False
        }
    ]

    for notification_data in notifications:
        notification = Notification(
            user_id=notification_data['user_id'],
            message=notification_data['message'],
            created_at=notification_data['created_at'],
            read=notification_data['read']
        )
        db.session.add(notification)

    db.session.commit()

def undo_notifications():
    db.session.execute("DELETE FROM notifications")
    db.session.commit()
