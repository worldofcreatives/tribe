from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange, Optional

class ReviewForm(FlaskForm):
    event_id = IntegerField('event_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    review_text = TextAreaField('review_text', validators=[Optional()])
