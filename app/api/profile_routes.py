from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Company, Creator
from app.forms.profile_form import ProfileForm
from werkzeug.utils import secure_filename
import os
import logging
from sqlalchemy.exc import IntegrityError
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

profile_routes = Blueprint('profiles', __name__)

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes

def is_allowed_file(filename, allowed_extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions

def file_size_under_limit(file):
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)  # Reset file pointer to the beginning
    return file_size <= MAX_FILE_SIZE

@profile_routes.route('/', methods=['POST', 'PUT'])
@login_required
def update_profile():
    user = current_user
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Handle Creator profile picture upload
        if user.type == 'Creator' and 'profile_pic' in request.files:
            profile_pic = request.files['profile_pic']
            if profile_pic and is_allowed_file(profile_pic.filename, {'jpg', 'jpeg', 'png', 'gif'}) and file_size_under_limit(profile_pic):
                file_name = get_unique_filename(profile_pic.filename)
                file_url_response = upload_file_to_s3(profile_pic, file_name)
                if "url" in file_url_response:
                    creator = Creator.query.filter_by(user_id=user.id).first()
                    creator.profile_pic = file_url_response["url"]
                else:
                    return jsonify({"errors": "Failed to upload profile picture"}), 500
            else:
                return jsonify({"errors": "Invalid file or file size exceeds limit."}), 400

        # Handle Company logo upload
        if user.type == 'Company' and 'logo' in request.files:
            logo = request.files['logo']
            if logo and is_allowed_file(logo.filename, {'jpg', 'jpeg', 'png', 'gif'}) and file_size_under_limit(logo):
                file_name = get_unique_filename(logo.filename)
                file_url_response = upload_file_to_s3(logo, file_name)
                if "url" in file_url_response:
                    company = Company.query.filter_by(user_id=user.id).first()
                    company.logo = file_url_response["url"]
                else:
                    return jsonify({"errors": "Failed to upload company logo"}), 500
            else:
                return jsonify({"errors": "Invalid file or file size exceeds limit."}), 400

        if user.type == 'Creator':
            creator = Creator.query.filter_by(user_id=user.id).first()

            creator.first_name = form.first_name.data if form.first_name.data else creator.first_name
            creator.last_name = form.last_name.data if form.last_name.data else creator.last_name
            creator.stage_name = form.stage_name.data if form.stage_name.data else creator.stage_name
            creator.bio = form.bio.data if form.bio.data else creator.bio
            creator.phone = form.phone.data if form.phone.data else creator.phone
            creator.address_1 = form.address_1.data if form.address_1.data else creator.address_1
            creator.address_2 = form.address_2.data if form.address_2.data else creator.address_2
            creator.city = form.city.data if form.city.data else creator.city
            creator.state = form.state.data if form.state.data else creator.state
            creator.postal_code = form.postal_code.data if form.postal_code.data else creator.postal_code
            creator.portfolio_url = form.portfolio_url.data if form.portfolio_url.data else creator.portfolio_url
            creator.previous_projects = form.previous_projects.data if form.previous_projects.data else creator.previous_projects
            creator.instagram = form.instagram.data if form.instagram.data else creator.instagram
            creator.twitter = form.twitter.data if form.twitter.data else creator.twitter
            creator.facebook = form.facebook.data if form.facebook.data else creator.facebook
            creator.youtube = form.youtube.data if form.youtube.data else creator.youtube
            creator.other_social_media = form.other_social_media.data if form.other_social_media.data else creator.other_social_media
            creator.reference_name = form.reference_name.data if form.reference_name.data else creator.reference_name
            creator.reference_email = form.reference_email.data if form.reference_email.data else creator.reference_email
            creator.reference_phone = form.reference_phone.data if form.reference_phone.data else creator.reference_phone
            creator.reference_relationship = form.reference_relationship.data if form.reference_relationship.data else creator.reference_relationship
            creator.genres = request.form.getlist('genres') or creator.genres
            creator.types = request.form.getlist('types') or creator.types

        elif user.type == 'Company':
            company = Company.query.filter_by(user_id=user.id).first()

            company.bio = form.bio.data if form.bio.data else company.bio
            company.name = form.name.data if form.name.data else company.name

        db.session.commit()
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'errors': form.errors}), 400

# This route is for getting the current user's profile data

@profile_routes.route('/', methods=['GET'])
@login_required
def get_current_user_profile():
    user = current_user
    user_data = {"id": user.id, "username": user.username, "email": user.email, "type": user.type}

    if user.type == 'Creator':
        creator = Creator.query.filter_by(user_id=user.id).first()
        if creator:
            user_data['creator'] = {
                "first_name": creator.first_name,
                "last_name": creator.last_name,
                "stage_name": creator.stage_name,
                "bio": creator.bio,
                "profile_pic": creator.profile_pic,
                "phone": creator.phone,
                "address_1": creator.address_1,
                "address_2": creator.address_2,
                "city": creator.city,
                "state": creator.state,
                "postal_code": creator.postal_code,
                "portfolio_url": creator.portfolio_url,
                "previous_projects": creator.previous_projects,
                "instagram": creator.instagram,
                "twitter": creator.twitter,
                "facebook": creator.facebook,
                "youtube": creator.youtube,
                "other_social_media": creator.other_social_media,
                "reference_name": creator.reference_name,
                "reference_email": creator.reference_email,
                "reference_phone": creator.reference_phone,
                "reference_relationship": creator.reference_relationship,
                "genres": creator.genres,
                "types": creator.types,
                "created_date": creator.created_date.isoformat(),
                "updated_date": creator.updated_date.isoformat(),
            }
    elif user.type == 'Company':
        company = Company.query.filter_by(user_id=user.id).first()
        if company:
            user_data['company'] = {
                "name": company.name,
                "bio": company.bio,
                "logo": company.logo,
                "created_date": company.created_date.isoformat(),
                "updated_date": company.updated_date.isoformat(),
            }

    return jsonify(user_data), 200
