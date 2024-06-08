from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Notification, Event, db
# from app.utils import send_spontaneous_notifications

notification_routes = Blueprint('notifications', __name__)

@notification_routes.route('', methods=['GET'])
@login_required
def get_notifications():
    notifications = Notification.query.filter_by(user_id=current_user.id).all()
    return jsonify([notification.to_dict() for notification in notifications])

@notification_routes.route('/<int:id>/read', methods=['PUT'])
@login_required
def mark_as_read(id):
    notification = Notification.query.get(id)
    if not notification:
        return {'error': 'Notification not found'}, 404

    notification.read = True
    db.session.commit()
    return jsonify(notification.to_dict())

@notification_routes.route('/generate', methods=['POST'])
@login_required
def generate_notifications():
    event_id = request.json.get('event_id')
    event = Event.query.get(event_id)
    if not event:
        return {'error': 'Event not found'}, 404

    # Generate and send notifications based on event criteria 👇
    # send_spontaneous_notifications(event)
    return {'message': 'Notifications sent successfully'}, 200
