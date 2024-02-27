from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from app.models import db, Opportunity
from app.forms.opportunity_form import OpportunityForm
from sqlalchemy.exc import IntegrityError

opportunity_routes = Blueprint('opportunities', __name__)

# GET /api/opportunities - Get all opportunities

@opportunity_routes.route('/', methods=['GET'])
@login_required
def get_opportunities():
    opportunities = Opportunity.query.all()
    opportunities_data = [opportunity.to_dict() for opportunity in opportunities]
    return jsonify(opportunities_data), 200

# GET /api/opportunities/:id - Get a single opportunity

@opportunity_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_opportunity(id):
    opportunity = Opportunity.query.get(id)
    if opportunity:
        return jsonify(opportunity.to_dict()), 200
    else:
        return jsonify({"error": "Opportunity not found"}), 404

# POST /api/opportunities - Create a new opportunity

@opportunity_routes.route('/', methods=['POST'])
@login_required
def create_opportunity():

    # Ensure the current user is a company
    if not current_user.is_company():
        return jsonify({"error": "Unauthorized"}), 403

    form = OpportunityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_opportunity = Opportunity(
            name=form.name.data,
            description=form.description.data,
            target_audience=form.target_audience.data,
            budget=form.budget.data,
            guidelines=form.guidelines.data,
            company_id=current_user.company_id,
        )
        try:
            db.session.add(new_opportunity)
            db.session.commit()
            return jsonify(new_opportunity.to_dict()), 201
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "Database error", "message": str(e)}), 500
    elif request.method == 'POST':
        return jsonify(form.errors), 400
    return jsonify({"message": "Submit your opportunity details."}), 200

# PUT /api/opportunities/:id - Update an opportunity

@opportunity_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_opportunity(id):
    opportunity = Opportunity.query.get(id)
    if not opportunity:
        return jsonify({"error": "Opportunity not found"}), 404

    # Ensure the current user is authorized to update the opportunity
    if not current_user.is_company() or current_user.company_id != opportunity.id:
        return jsonify({"error": "Unauthorized"}), 403

    form = OpportunityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        opportunity.name = form.name.data
        opportunity.description = form.description.data
        opportunity.target_audience = form.target_audience.data
        opportunity.budget = form.budget.data
        opportunity.guidelines = form.guidelines.data

        try:
            db.session.commit()
            return jsonify(opportunity.to_dict()), 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "Database error", "message": str(e)}), 500
    else:
        return jsonify(form.errors), 400

# DELETE /api/opportunities/:id - Delete an opportunity

@opportunity_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_opportunity(id):
    opportunity = Opportunity.query.get(id)
    if not opportunity:
        return jsonify({"error": "Opportunity not found"}), 404

    # Ensure the current user is authorized to delete the opportunity
    if not current_user.is_company() or current_user.company_id != opportunity.company_id:
        return jsonify({"error": "Unauthorized"}), 403

    try:
        db.session.delete(opportunity)
        db.session.commit()
        return jsonify({"message": "Opportunity deleted successfully"}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "message": str(e)}), 500


# from flask import Blueprint, request, jsonify
# from flask_login import login_required, current_user
# from app.models import db, Opportunity, Company
# from sqlalchemy.exc import IntegrityError

# # Define the opportunities Blueprint
# opportunity_routes = Blueprint('opportunities', __name__)

# @opportunity_routes.route('/', methods=['POST'])
# @login_required
# def create_opportunity():
#     # Ensure the current user is a company
#     if not current_user.is_company():
#         return jsonify({"error": "Unauthorized"}), 403

#     data = request.get_json()

#     # Basic validation
#     if not data.get('name') or not data.get('description'):
#         return jsonify({"error": "Name and description are required."}), 400

#     # if not data.get('id') or data.get('id') != current_user.company_id:
#     #     return jsonify({"error": "Invalid company ID."}), 400

#     # Create a new Opportunity
#     new_opportunity = Opportunity(
#         name=data['name'],
#         description=data['description'],
#         target_audience=data.get('target_audience'),
#         budget=data.get('budget'),
#         guidelines=data.get('guidelines'),
#         id=current_user.company_id,
#     )

#     try:
#         db.session.add(new_opportunity)
#         db.session.commit()
#         return jsonify(new_opportunity.to_dict()), 201
#     except IntegrityError as e:
#         db.session.rollback()
#         return jsonify({"error": "Database error", "message": str(e)}), 500
