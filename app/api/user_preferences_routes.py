from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import UserPreferences, UserAvailability, db
from app.forms import PreferencesForm, AvailabilityForm
import json
from wtforms import StringField


preferences_routes = Blueprint('preferences', __name__)

@preferences_routes.route('/all', methods=['GET'])
@login_required
def get_preferences():
    preferences = UserPreferences.query.filter_by(user_id=current_user.id).first()
    if preferences:
        return jsonify(preferences.to_dict())
    else:
        return jsonify({'errors': {'message': 'Preferences not found'}}), 404


@preferences_routes.route('/update', methods=['POST'])
@login_required
def set_preferences():
    data = request.get_json()
    print("🚀🚀🚀", data)

    form = PreferencesForm(csrf_token=request.cookies['csrf_token'])

    # Populate FieldList entries manually
    form.event_types.process(None, data.get('event_types', []))
    form.activity_types.process(None, data.get('activity_types', []))
    form.restaurant_types.process(None, data.get('restaurant_types', []))
    form.group_size.process(None, data.get('group_size', ''))

    print("🔥🔥🔥🔥", form.data)

    if form.validate():
        preferences = UserPreferences.query.filter_by(user_id=current_user.id).first()
        if preferences:
            preferences.event_types = json.dumps(form.event_types.data)
            preferences.activity_types = json.dumps(form.activity_types.data)
            preferences.restaurant_types = json.dumps(form.restaurant_types.data)
            preferences.group_size = form.group_size.data
        else:
            preferences = UserPreferences(
                user_id=current_user.id,
                event_types=json.dumps(form.event_types.data),
                activity_types=json.dumps(form.activity_types.data),
                restaurant_types=json.dumps(form.restaurant_types.data),
                group_size=form.group_size.data
            )
            db.session.add(preferences)
        db.session.commit()
        return jsonify(preferences.to_dict()), 201
    return jsonify({'errors': form.errors}), 400



@preferences_routes.route('/availability', methods=['GET'])
@login_required
def get_availability():
    availability = UserAvailability.query.filter_by(user_id=current_user.id).first()
    if availability:
        return jsonify(availability.to_dict())
    return jsonify({'message': 'No availability found'}), 404

@preferences_routes.route('/availability', methods=['POST'])
@login_required
def set_availability():
    data = request.get_json()
    form = AvailabilityForm(csrf_token=request.cookies['csrf_token'])

    # Populate the form with the request data
    for day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
        for slot in ['early_morning', 'morning', 'afternoon', 'night', 'late_night']:
            form[day][slot].process(None, data.get(day, {}).get(slot, False))

    if form.validate_on_submit():
        availability = UserAvailability.query.filter_by(user_id=current_user.id).first()
        if availability:
            for day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
                setattr(availability, day, json.dumps(form[day].data))
        else:
            availability = UserAvailability(
                user_id=current_user.id,
                monday=json.dumps(form.monday.data),
                tuesday=json.dumps(form.tuesday.data),
                wednesday=json.dumps(form.wednesday.data),
                thursday=json.dumps(form.thursday.data),
                friday=json.dumps(form.friday.data),
                saturday=json.dumps(form.saturday.data),
                sunday=json.dumps(form.sunday.data)
            )
            db.session.add(availability)
        db.session.commit()
        return jsonify(availability.to_dict()), 201
    return jsonify({'errors': form.errors}), 400
