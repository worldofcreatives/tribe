from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import UserPreferences, UserAvailability, db
from app.forms import PreferencesForm, AvailabilityForm

preferences_routes = Blueprint('preferences', __name__)

@preferences_routes.route('/preferences', methods=['GET'])
@login_required
def get_preferences():
    preferences = UserPreferences.query.filter_by(user_id=current_user.id).first()
    return jsonify(preferences.to_dict())

@preferences_routes.route('/preferences', methods=['POST'])
@login_required
def set_preferences():
    form = PreferencesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        preferences = UserPreferences(
            user_id=current_user.id,
            event_types=form.data['event_types'],
            activity_types=form.data['activity_types'],
            restaurant_types=form.data['restaurant_types'],
            group_size=form.data['group_size']
        )
        db.session.add(preferences)
        db.session.commit()
        return jsonify(preferences.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@preferences_routes.route('/availability', methods=['GET'])
@login_required
def get_availability():
    availability = UserAvailability.query.filter_by(user_id=current_user.id).first()
    return jsonify(availability.to_dict())

@preferences_routes.route('/availability', methods=['POST'])
@login_required
def set_availability():
    form = AvailabilityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        availability = UserAvailability(
            user_id=current_user.id,
            early_morning=form.data['early_morning'],
            morning=form.data['morning'],
            afternoon=form.data['afternoon'],
            night=form.data['night'],
            late_night=form.data['late_night'],
            days_of_week=form.data['days_of_week']
        )
        db.session.add(availability)
        db.session.commit()
        return jsonify(availability.to_dict()), 201
    return jsonify({'errors': form.errors}), 400
