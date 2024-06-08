from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Notification, db
from app.forms import NotificationForm

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
