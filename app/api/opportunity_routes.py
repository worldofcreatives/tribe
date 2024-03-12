from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from app.models import db, Opportunity, Submission, Feedback, Company, Creator
from app.forms.opportunity_form import OpportunityForm
from app.forms.submission_form import SubmissionForm
from app.forms.feedback_form import FeedbackForm
from sqlalchemy.exc import IntegrityError
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3
import os

opportunity_routes = Blueprint('opportunities', __name__)

# GET /api/opportunities - Get all opportunities

@opportunity_routes.route('', methods=['GET'])
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

@opportunity_routes.route('', methods=['POST'])
@login_required
def create_opportunity():

    # Ensure the current user is a company
    if not current_user.is_company():
        return jsonify({"error": "Unauthorized"}), 403

    # company = Company.query.filter_by(user_id=current_user.id).first()

    form = OpportunityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_opportunity = Opportunity(
            name=form.name.data,
            description=form.description.data,
            target_audience=form.target_audience.data,
            budget=form.budget.data,
            guidelines=form.guidelines.data,
            # company_id=company.id,
            user_id=current_user.id
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

    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if not company:
    #     return jsonify({"error": "Unauthorized - User is not associated with any company"}), 403

    if opportunity.user_id != current_user.id:
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

    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if not company:
    #     return jsonify({"error": "Unauthorized - User is not associated with any company"}), 403

    if opportunity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    try:
        db.session.delete(opportunity)
        db.session.commit()
        return jsonify({"message": "Opportunity deleted successfully"}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "message": str(e)}), 500


# POST /api/opportunities/:id/submit - Create a new submission

def is_allowed_file(filename, allowed_extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions

# Assuming MAX_FILE_SIZE is defined at the top of your file
MAX_FILE_SIZE = 50 * 1024 * 1024  # 5MB in bytes

def file_size_under_limit(file):
    file.seek(0, os.SEEK_END)  # Go to the end of the file
    file_size = file.tell()  # Get the position of EOF
    file.seek(0)  # Reset the file position to the beginning
    return file_size <= MAX_FILE_SIZE

@opportunity_routes.route('/<int:id>/submit', methods=['POST'])
@login_required
def create_submission(id):
    form = SubmissionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    opportunity = Opportunity.query.get(id)

    if form.validate_on_submit():
        file = form.file.data

        # Check both file type and file size
        if file and is_allowed_file(file.filename, {"mp3", "wav"}) and file_size_under_limit(file):
            file_name = get_unique_filename(file.filename)
            file_url_response = upload_file_to_s3(file, file_name)

            if "url" in file_url_response:
                new_submission = Submission(
                    # creator_id=current_user.id,
                    opportunity_id=opportunity.id,
                    user_id=current_user.id,
                    username=current_user.username,
                    name=form.name.data,
                    notes=form.notes.data,
                    bpm=form.bpm.data,
                    collaborators=form.collaborators.data,
                    file_url=file_url_response["url"],
                )
                db.session.add(new_submission)
                db.session.commit()
                return jsonify(new_submission.to_dict()), 201
            else:
                error_message = file_url_response.get("errors", "Unknown error during file upload.")
                return jsonify({"errors": f"File upload failed: {error_message}"}), 500
        else:
            # Return an appropriate error message if the file type is not allowed or file size exceeds the limit
            if not is_allowed_file(file.filename, {"mp3", "wav"}):
                return jsonify({"error": "File type not allowed"}), 400
            if not file_size_under_limit(file):
                return jsonify({"error": "File size exceeds limit"}), 400

    else:
        return jsonify({'errors': form.errors}), 400


# GET /api/opportunities/:id/submissions - Get all submissions for an opportunity

@opportunity_routes.route('/<int:id>/submissions', methods=['GET'])
@login_required
def get_submissions_for_opportunity(id):
    opportunity = Opportunity.query.get(id)

    if not opportunity:
        return jsonify({"error": "Opportunity not found"}), 404

    # # Query for the company associated with the current user
    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if not company:
    #     return jsonify({"error": "Access denied. User is not associated with any company."}), 403

    # # Ensure the current user is authorized to view submissions for the opportunity
    # if opportunity.company_id != company.id:
    #     return jsonify({"error": "Access denied. User did not create this opportunity."}), 403

    # Ensure the current user is authorized to view submissions for the opportunity
    if opportunity.user_id != current_user.id:
        return jsonify({"error": "Access denied. User did not create this opportunity."}), 403

    submissions = Submission.query.filter_by(opportunity_id=id).all()
    submissions_list = [submission.to_dict() for submission in submissions]

    return jsonify(submissions_list), 200

# GET /api/opportunities/:opp_id/submissions/:sub_id - Get a specific submission

@opportunity_routes.route('/<int:opp_id>/submissions/<int:sub_id>', methods=['GET'])
@login_required
def get_specific_submission(opp_id, sub_id):
    submission = Submission.query.filter_by(id=sub_id, opportunity_id=opp_id).first()
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    opportunity = Opportunity.query.get(opp_id)
    if not opportunity:
        return jsonify({"error": "Opportunity not found"}), 404

    # creator = Creator.query.filter_by(user_id=current_user.id).first()
    # if creator and submission.creator_id == creator.id:
    #     return jsonify(submission.to_dict()), 200

    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if company and opportunity.company_id == company.id:
    #     return jsonify(submission.to_dict()), 200

    if opportunity.user_id == current_user.id:
        return jsonify(submission.to_dict()), 200

    return jsonify({"error": "Access denied."}), 403


# PUT /api/opportunities/:opp_id/submissions/:sub_id - Update a submission status

@opportunity_routes.route('/<int:opp_id>/submissions/<int:sub_id>', methods=['PUT'])
@login_required
def update_submission_status(opp_id, sub_id):
    submission = Submission.query.get(sub_id)
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    if submission.opportunity_id != opp_id:
        return jsonify({"error": "Submission does not belong to the given opportunity"}), 400

    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if not company:
    #     return jsonify({"error": "Unauthorized to update submission status - User is not associated with any company"}), 403

    opportunity = Opportunity.query.get(opp_id)
    if not opportunity or current_user.id != opportunity.user_id:
        return jsonify({"error": "Unauthorized to update submission status"}), 403

    data = request.get_json()
    new_status = data.get('status')

    if new_status not in ['Pending', 'Reviewing', 'Accepted', 'Rejected', 'Archived']:
        return jsonify({"error": "Invalid status value"}), 400

    submission.status = new_status
    db.session.commit()

    return jsonify(submission.to_dict()), 200


# DELETE /api/opportunities/:opp_id/submissions/:sub_id - Delete a submission

@opportunity_routes.route('/<int:opp_id>/submissions/<int:sub_id>', methods=['DELETE'])
@login_required
def delete_submission(opp_id, sub_id):
    submission = Submission.query.get(sub_id)
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    if submission.opportunity_id != opp_id:
        return jsonify({"error": "Submission does not belong to the given opportunity"}), 400

    opportunity = Opportunity.query.get(opp_id)
    if not opportunity:
        return jsonify({"error": "Opportunity not found"}), 404

    # creator = Creator.query.filter_by(user_id=current_user.id).first()
    # if creator and submission.creator_id == creator.id:
    #     db.session.delete(submission)
    #     db.session.commit()
    #     return jsonify({"message": "Submission successfully deleted"}), 200

    # company = Company.query.filter_by(user_id=current_user.id).first()
    # if company and opportunity.company_id == company.id:
    #     db.session.delete(submission)
    #     db.session.commit()
    #     return jsonify({"message": "Submission successfully deleted"}), 200

    if opportunity.user_id == current_user.id:
        db.session.delete(submission)
        db.session.commit()
        return jsonify({"message": "Submission successfully deleted"}), 200

    return jsonify({"error": "Unauthorized to delete this submission"}), 403


# POST /api/opportunities/:opp_id/submissions/:sub_id/feedback - Create feedback for a submission

@opportunity_routes.route('/<int:opp_id>/submissions/<int:sub_id>/feedback', methods=['POST'])
@login_required
def submit_feedback(opp_id, sub_id):
    form = FeedbackForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    submission = Submission.query.filter_by(id=sub_id, opportunity_id=opp_id).first()
    if not submission:
        return jsonify({'error': 'Submission not found or does not belong to the specified opportunity'}), 404

    creator = Creator.query.filter_by(user_id=current_user.id).first()
    if creator and submission.creator_id == creator.id:
        pass
    else:
        company = Company.query.filter_by(user_id=current_user.id).first()
        if not company or company.id != submission.opportunity.company_id:
            return jsonify({'error': 'You are unauthorized'}), 403

    if form.validate_on_submit():
        new_feedback = Feedback(
            submission_id=sub_id,
            sender_id=current_user.id,
            feedback=form.feedback.data
        )
        db.session.add(new_feedback)
        try:
            db.session.commit()
            return jsonify(new_feedback.to_dict()), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'Database error'}), 500
    else:
        return jsonify({'errors': form.errors}), 400


# GET /api/opportunities/:opp_id/submissions/:sub_id/feedback - List feedback for a submission

@opportunity_routes.route('/<int:opp_id>/submissions/<int:sub_id>/feedback', methods=['GET'])
@login_required
def list_feedback_for_submission(opp_id, sub_id):
    submission = Submission.query.filter_by(id=sub_id, opportunity_id=opp_id).first()
    if not submission:
        return jsonify({'error': 'Submission not found or does not belong to the specified opportunity'}), 404

    is_creator = submission.creator_id == current_user.id
    company = Company.query.filter_by(user_id=current_user.id).first()
    is_company_associated = company and company.id == submission.opportunity.company_id

    if not is_creator and not is_company_associated:
        return jsonify({'error': 'Unauthorized access to feedback'}), 403

    feedback_list = Feedback.query.filter_by(submission_id=sub_id).all()
    feedback_data = [feedback.to_dict() for feedback in feedback_list]

    return jsonify(feedback_data), 200


@opportunity_routes.route('/myopps', methods=['GET'])
@login_required
def user_opportunities():
    current_user_id = current_user.id

    # Fetch opportunities created by the user
    created_opportunities = Opportunity.query.filter_by(user_id=current_user_id).all()
    created_opportunities_data = [opportunity.to_dict() for opportunity in created_opportunities]

    return jsonify(created_opportunities_data)
