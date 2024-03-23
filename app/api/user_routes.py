from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Creator
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

@user_routes.route('/<int:user_id>/update-status', methods=['PUT'])
@login_required
def update_user_status(user_id):
    if not current_user.is_company():
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'Missing status'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.status = new_status
    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Could not update user status', 'details': str(e)}), 500

# @user_routes.route('/all', methods=['GET'])
# @login_required
# def get_all_users():
#     if not current_user.is_company():
#         return jsonify({"error": "Unauthorized access"}), 403

#     users = User.query.all()
#     users_list = [{
#         "email": user.email,
#         "username": user.username,
#         "status": user.status,
#         "type": user.type,
#         "profile_link": f"/profile/{user.id}"  # Assuming profile link is structured like this
#     } for user in users]

#     return jsonify(users_list)

@user_routes.route('/all', methods=['GET'])
@login_required
def get_all_users():
    if not current_user.is_company():
        return jsonify({"error": "Unauthorized access"}), 403

    users = User.query.all()
    users_list = []
    for user in users:
        user_data = {
            "email": user.email,
            "username": user.username,
            "status": user.status,
            "type": user.type,
            "created_date": user.created_date,
            "profile_link": f"/profile/{user.id}",  # Assuming profile link is structured like this
        }

        # Fetch creator information if exists
        creator = Creator.query.filter_by(user_id=user.id).first()
        if creator:
            creator_data = creator.to_dict()
            # Extract and include only the relevant creator information
            user_data.update({
                "creator": {
                    "first_name": creator_data["first_name"],
                    "last_name": creator_data["last_name"],
                    "stage_name": creator_data["stage_name"],
                    "profile_pic": creator_data["profile_pic"],
                    "bio": creator_data["bio"],
                    "phone": creator_data["phone"],
                    "address_1": creator_data["address_1"],
                    "address_2": creator_data["address_2"],
                    "city": creator_data["city"],
                    "state": creator_data["state"],
                    "postal_code": creator_data["postal_code"],
                    "portfolio_url": creator_data["portfolio_url"],
                    "previous_projects": creator_data["previous_projects"],
                    "instagram": creator_data["instagram"],
                    "twitter": creator_data["twitter"],
                    "facebook": creator_data["facebook"],
                    "youtube": creator_data["youtube"],
                    "other_social_media": creator_data["other_social_media"],
                    "reference_name": creator_data["reference_name"],
                    "reference_email": creator_data["reference_email"],
                    "reference_phone": creator_data["reference_phone"],
                    "reference_relationship": creator_data["reference_relationship"],
                    "genres": creator_data["genres"],
                    "types": creator_data["types"]
                }
            })

        users_list.append(user_data)

    return jsonify(users_list)
