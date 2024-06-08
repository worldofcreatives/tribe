from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Report, db
from app.forms import ReportForm

report_routes = Blueprint('reports', __name__)

@report_routes.route('', methods=['POST'])
@login_required
def submit_report():
    form = ReportForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        report = Report(
            reported_by=current_user.id,
            reported_user_id=form.data['reported_user_id'],
            event_id=form.data['event_id'],
            description=form.data['description'],
            status='pending'
        )
        db.session.add(report)
        db.session.commit()
        return jsonify(report.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@report_routes.route('', methods=['GET'])
@login_required
def get_reports():
    if current_user.type != 'admin':
        return {'errors': ['Unauthorized']}, 403

    reports = Report.query.all()
    return jsonify([report.to_dict() for report in reports])

@report_routes.route('/<int:id>/status', methods=['PUT'])
@login_required
def update_report_status(id):
    report = Report.query.get(id)
    if not report:
        return {'error': 'Report not found'}, 404

    data = request.get_json()
    report.status = data.get('status', report.status)
    db.session.commit()
    return jsonify(report.to_dict())
