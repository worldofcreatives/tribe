from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('', methods=['POST'])
@login_required
def submit_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            event_id=form.data['event_id'],
            user_id=current_user.id,
            rating=form.data['rating'],
            review_text=form.data['review_text']
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@review_routes.route('/<int:event_id>', methods=['GET'])
@login_required
def get_reviews(event_id):
    reviews = Review.query.filter_by(event_id=event_id).all()
    return jsonify([review.to_dict() for review in reviews])
