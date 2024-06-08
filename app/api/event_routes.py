from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Event, db
from app.forms import EventForm

event_routes = Blueprint('events', __name__)

@event_routes.route('', methods=['POST'])
@login_required
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            name=form.data['name'],
            venue=form.data['venue'],
            date=form.data['date'],
            time=form.data['time'],
            description=form.data['description'],
            capacity=form.data['capacity'],
            created_by=current_user.id
        )
        db.session.add(event)
        db.session.commit()
        return jsonify(event.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@event_routes.route('', methods=['GET'])
@login_required
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

@event_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_event(id):
    event = Event.query.get(id)
    if event:
        return jsonify(event.to_dict())
    return {'error': 'Event not found'}, 404

@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
    event = Event.query.get(id)
    if not event:
        return {'error': 'Event not found'}, 404

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event.name = form.data['name']
        event.venue = form.data['venue']
        event.date = form.data['date']
        event.time = form.data['time']
        event.description = form.data['description']
        event.capacity = form.data['capacity']
        db.session.commit()
        return jsonify(event.to_dict())
    return jsonify({'errors': form.errors}), 400

@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    event = Event.query.get(id)
    if not event:
        return {'error': 'Event not found'}, 404

    db.session.delete(event)
    db.session.commit()
    return {'message': 'Event deleted successfully'}
