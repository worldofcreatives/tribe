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
        "type": user.type
    }

    # If the user is a company, add company-specific information
    if user.type == 'Company':
        company = Company.query.filter_by(user_id=user_id).first()
        if company:
            user_data.update({
                "company": {
                    "user_id": company.user_id,
                    "name": company.name,
                    "company_name": company.company_name,
                    "bio": company.bio,
                    "logo": company.logo,
                    "status": company.status,
                    "created_date": company.created_date
                }
            })

    # If the user is a creator, add creator-specific information
    elif user.type == 'Creator':
        creator = Creator.query.filter_by(user_id=user_id).first()
        if creator:
            user_data.update({
                "creator": {
                    "name": creator.name,
                    "user_id": creator.user_id,
                    "bio": creator.bio,
                    "status": creator.status,
                    "profile_pic": creator.profile_pic,
                    "created_date": creator.created_date
                }
            })

    return jsonify(user_data), 200



# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import db, User, Company, Creator, Genre, Type
# from app.forms.profile_form import ProfileForm
# from werkzeug.utils import secure_filename
# import os
# import logging
# from sqlalchemy.exc import IntegrityError


# profile_routes = Blueprint('profiles', __name__)

# # GET /api/profiles/<int:user_id> - Get a user's profile

# @profile_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
# def get_user_profile(user_id):
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     if user.type == 'Company' and hasattr(user, 'company'):
#         user_data = {
#             "id": user.id,
#             "username": user.username,
#             "email": user.email,
#             "name": user.company.name,
#             "company_name": user.company.company_name,
#             # Add other relevant company fields
#         }

#     if user.type == 'Creator' and hasattr(user, 'creator'):
#         user_data['creator'] = {
#             "id": user.id,
#             "username": user.username,
#             "email": user.email,
#             "name": user.creator.name,
#             "bio": user.creator.bio,
#             # Add other relevant creator fields
#         }

#     return jsonify(user_data), 200









# ---------------------









# # POST /api/profiles/<int:user_id> - Update a user's profile

# @profile_routes.route('/<int:user_id>', methods=['POST', 'PUT'])
# @login_required
# def update_user_profile(user_id):
#     logging.info(f"Received {request.method} request for user {user_id}")
#     # if current_user.id != user_id:
#     #     return jsonify({"error": "Unauthorized"}), 403

#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     form = ProfileForm(user_type=user.type)
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         # Assuming form fields are named identically to model attributes for simplicity
#         # Update common user attributes here

#         if user.type == 'Company' and hasattr(user, 'company'):
#             # Update specific fields for Company
#             company = user.company
#             company.name = form.name.data if form.name.data else company.name
#             company.company_name = form.company_name.data if form.company_name.data else company.company_name
#             company.bio = form.bio.data if form.bio.data else company.bio
#             company.logo = form.logo.data if form.logo.data else company.logo


#         elif user.type == 'Creator' and hasattr(user, 'creator'):
#             # Update specific fields for Creator
#             creator = user.creator
#             creator.name = form.name.data if form.name.data else creator.name
#             creator.profile_pic = form.profile_pic.data if form.profile_pic.data else creator.profile_pic
#             creator.bio = form.bio.data if form.bio.data else creator.bio
#             # Update genres
#             if 'genres' in form.data:
#                 creator.genres = Genre.query.filter(Genre.id.in_(form.genres.data)).all()
#             # Update types
#             if 'types' in form.data:
#                 creator.types = Type.query.filter(Type.id.in_(form.types.data)).all()

#         try:
#             db.session.commit()
#             return jsonify({"message": "Profile updated successfully"}), 200
#         except Exception as e:
#             db.session.rollback()
#             return jsonify({"error": "Database error", "message": str(e)}), 500
#     else:
#         return jsonify(form.errors), 400
