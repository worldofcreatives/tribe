from app.models import db, Review
from datetime import datetime

def seed_reviews():
    reviews = [
        {
            'event_id': 1,
            'user_id': 1,
            'rating': 5,
            'review_text': 'Had a great time!',
            'created_at': datetime.utcnow()
        }
    ]

    for review_data in reviews:
        review = Review(
            event_id=review_data['event_id'],
            user_id=review_data['user_id'],
            rating=review_data['rating'],
            review_text=review_data['review_text'],
            created_at=review_data['created_at']
        )
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute("DELETE FROM reviews")
    db.session.commit()
