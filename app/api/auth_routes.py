from flask import Blueprint, request, jsonify
from app.models import User, db, Creator
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        if user and user.check_password(form.data['password']):
            login_user(user)
            return user.to_dict()
        else:
            return {'errors': ['Invalid email or password.']}, 401
    return form.errors, 401

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user, sets them as a creator, and logs them in.
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Create and add new user
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            type='Creator'
        )
        db.session.add(user)
        db.session.commit()

        # Create and add new creator linked to the user
        creator = Creator(
            user_id=user.id,
        )
        db.session.add(creator)
        db.session.commit()

        # Log the user in
        login_user(user)
        return jsonify(user.to_dict()), 201
    else:
        return jsonify({'errors': form.errors}), 401

# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
