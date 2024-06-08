from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Attendance, db
from app.forms import AttendanceForm

attendance_routes = Blueprint('attendances', __name__)

@attendance_routes.route('/check-in', methods=['POST'])
@login_required
def check_in():
    form = AttendanceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        attendance = Attendance(
            event_id=form.data['event_id'],
            user_id=current_user.id,
            checked_in=True
        )
        db.session.add(attendance)
        db.session.commit()
        return jsonify(attendance.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@attendance_routes.route('/<int:event_id>', methods=['GET'])
@login_required
def get_attendees(event_id):
    attendees = Attendance.query.filter_by(event_id=event_id).all()
    return jsonify([attendee.to_dict() for attendee in attendees])
