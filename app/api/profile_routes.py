from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Company, Creator

profile_routes = Blueprint('profiles', __name__)

# GET /api/profiles/<int:userId> - Get a user's profile
@profile_routes.route('/<int:userId>', methods=['GET'])
@login_required
def get_user_profile(userId):
    user = User.query.get(userId)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        # Add other relevant user fields
    }

    if user.type == 'Company' and hasattr(user, 'company'):
        user_data['company'] = {
            "name": user.company.name,
            "companyName": user.company.companyName,
            # Add other relevant company fields
        }

    if user.type == 'Creator' and hasattr(user, 'creator'):
        user_data['creator'] = {
            "name": user.creator.name,
            "bio": user.creator.bio,
            # Add other relevant creator fields
        }

    return jsonify(user_data), 200
