from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
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

# This route is for getting the current user's profile data
