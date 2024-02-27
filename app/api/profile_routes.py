from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Company, Creator, Genre, Type
from app.forms.profile_form import ProfileForm
from werkzeug.utils import secure_filename
import os

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



from flask import request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Company, Creator
from datetime import datetime
# Assuming ProfileUpdateForm is properly defined elsewhere with appropriate fields

@profile_routes.route('/<int:userId>', methods=['POST', 'PUT'])
@login_required
def update_user_profile(userId):
    if current_user.id != userId:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(userId)
    if not user:
        return jsonify({"error": "User not found"}), 404

    form = ProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Assuming form fields are named identically to model attributes for simplicity
        # Update common user attributes here

        if user.type == 'Company' and hasattr(user, 'company'):
            # Update specific fields for Company
            company = user.company
            company.name = form.name.data if form.name.data else company.name
            company.companyName = form.companyName.data if form.companyName.data else company.companyName
            company.bio = form.bio.data if form.bio.data else company.bio
            company.logo = form.logo.data if form.logo.data else company.logo
            # Update genres
            if 'genres' in form.data:
                creator.genres = Genre.query.filter(Genre.id.in_(form.genres.data)).all()
            # Update types
            if 'types' in form.data:
                creator.types = Type.query.filter(Type.id.in_(form.types.data)).all()


        elif user.type == 'Creator' and hasattr(user, 'creator'):
            # Update specific fields for Creator
            creator = user.creator
            creator.name = form.name.data if form.name.data else creator.name
            creator.profilePic = form.profilePic.data if form.profilePic.data else creator.profilePic
            creator.bio = form.bio.data if form.bio.data else creator.bio
            # Assuming form contains fields for all attributes you wish to update

        try:
            db.session.commit()
            return jsonify({"message": "Profile updated successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Database error", "message": str(e)}), 500
    else:
        return jsonify(form.errors), 400
