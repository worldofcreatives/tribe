from flask import Blueprint, jsonify
from app.models import db, Genre, Type

filter_routes = Blueprint('filter', __name__)

# Get all genres
@filter_routes.route('/genres')
def get_genres():
    genres = Genre.query.all()
    return jsonify([genre.to_dict() for genre in genres])

# Get all types
@filter_routes.route('/types')
def get_types():
    types = Type.query.all()
    return jsonify([type_.to_dict() for type_ in types])
