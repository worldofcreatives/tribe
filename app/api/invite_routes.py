from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Invite, db
from app.forms import InviteForm

invite_routes = Blueprint('invites', __name__)

@invite_routes.route('', methods=['POST'])
@login_required
def send_invites():
    form = InviteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        invite = Invite(
            event_id=form.data['event_id'],
            user_id=current_user.id,
            status='pending'
        )
        db.session.add(invite)
        db.session.commit()
        return jsonify(invite.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@invite_routes.route('', methods=['GET'])
@login_required
def get_invites():
    invites = Invite.query.filter_by(user_id=current_user.id).all()
    return jsonify([invite.to_dict() for invite in invites])

@invite_routes.route('/<int:id>/respond', methods=['PUT'])
@login_required
def respond_invite(id):
    invite = Invite.query.get(id)
    if not invite:
        return {'error': 'Invite not found'}, 404

    data = request.get_json()
    invite.status = data.get('status', invite.status)
    db.session.commit()
    return jsonify(invite.to_dict())
