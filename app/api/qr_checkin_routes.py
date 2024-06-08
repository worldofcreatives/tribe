from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Attendance, db

checkin_routes = Blueprint('checkin', __name__)

@checkin_routes.route('/checkin/<int:event_id>', methods=['POST'])
@login_required
def checkin(event_id):
    # Assuming a function generate_qr_code() that generates and returns a QR code
    # qr_code = generate_qr_code(current_user.id, event_id)
    # return jsonify({'qr_code': qr_code}), 201
    return {'feature not built yet': event_id}, 400

@checkin_routes.route('/verify', methods=['POST'])
@login_required
def verify_qr():
    data = request.json
    user_id = data.get('user_id')
    event_id = data.get('event_id')

    # Verify QR code and check in the user
    attendance = Attendance.query.filter_by(user_id=user_id, event_id=event_id).first()
    if attendance:
        attendance.checked_in = True
        db.session.commit()
        return {'message': 'Check-in successful'}, 200
    return {'error': 'Invalid QR code'}, 400
