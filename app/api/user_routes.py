from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from sqlalchemy.exc import SQLAlchemyError

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/update_status/applied', methods=['PUT'])
@login_required
def update_status_to_applied():
    try:
        # Assuming current_user gives you the user object of the logged-in user
        user = User.query.get(current_user.id)
        if user:
            user.status = "Applied"
            db.session.commit()
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
