from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Company, Creator, Genre, Type
from app.forms.profile_form import ProfileForm
from werkzeug.utils import secure_filename
import os
import logging
from sqlalchemy.exc import IntegrityError


profile_routes = Blueprint('profiles', __name__)

# GET /api/profiles/<int:user_id> - Get a user's profile

@profile_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Initialize an empty dictionary to hold user data
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "type": user.type  # Include the user type in the response
    }

    # If the user is a company, add company-specific information
    if user.type == 'Company':
        company = Company.query.filter_by(user_id=user_id).first()  # Fetch the company associated with the user
        if company:
            user_data.update({
                "company": {
                    "name": company.name,
                    "company_name": company.company_name,
                    "bio": company.bio,
                    "logo": company.logo,
                    "status": company.status
                    # Add other relevant company fields
                }
            })

    # If the user is a creator, add creator-specific information
    elif user.type == 'Creator':
        creator = Creator.query.filter_by(user_id=user_id).first()  # Fetch the creator associated with the user
        if creator:
            user_data.update({
                "creator": {
                    "name": creator.name,
                    "bio": creator.bio
                    # Add other relevant creator fields
                }
            })

    return jsonify(user_data), 200

