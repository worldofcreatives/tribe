from app.models import db, Invite
from datetime import datetime

def seed_invites():
    invites = [
        {
            'event_id': 1,
            'user_id': 1,
            'status': 'pending',
            'invite_sent_at': datetime.utcnow()
        }
    ]

    for invite_data in invites:
        invite = Invite(
            event_id=invite_data['event_id'],
            user_id=invite_data['user_id'],
            status=invite_data['status'],
            invite_sent_at=invite_data['invite_sent_at']
        )
        db.session.add(invite)

    db.session.commit()

def undo_invites():
    db.session.execute("DELETE FROM invites")
    db.session.commit()
