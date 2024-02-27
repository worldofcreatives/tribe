from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Opportunity, Company
from sqlalchemy.exc import IntegrityError

# Define the opportunities Blueprint
opportunity_routes = Blueprint('opportunities', __name__)

@opportunity_routes.route('/', methods=['POST'])
@login_required
def create_opportunity():
    # Ensure the current user is a company
    if not current_user.is_company():
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    # Basic validation
    if not data.get('name') or not data.get('description'):
        return jsonify({"error": "Name and description are required."}), 400

    # if not data.get('companyId') or data.get('companyId') != current_user.company_id:
    #     return jsonify({"error": "Invalid company ID."}), 400

    # Create a new Opportunity
    new_opportunity = Opportunity(
        name=data['name'],
        description=data['description'],
        targetAudience=data.get('targetAudience'),
        budget=data.get('budget'),
        guidelines=data.get('guidelines'),
        companyId=data['companyId'],
    )

    try:
        db.session.add(new_opportunity)
        db.session.commit()
        return jsonify(new_opportunity.to_dict()), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "message": str(e)}), 500
