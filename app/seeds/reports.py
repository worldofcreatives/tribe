from app.models import db, Report
from datetime import datetime

def seed_reports():
    reports = [
        {
            'reported_by': 1,
            'reported_user': 2,
            'event_id': 1,
            'description': 'User was disruptive during the event.',
            'status': 'pending',
            'created_at': datetime.utcnow()
        }
    ]

    for report_data in reports:
        report = Report(
            reported_by=report_data['reported_by'],
            reported_user=report_data['reported_user'],
            event_id=report_data['event_id'],
            description=report_data['description'],
            status=report_data['status'],
            created_at=report_data['created_at']
        )
        db.session.add(report)

    db.session.commit()

def undo_reports():
    db.session.execute("DELETE FROM reports")
    db.session.commit()
