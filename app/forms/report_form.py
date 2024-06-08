from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ReportForm(FlaskForm):
    reported_user_id = IntegerField('reported_user_id', validators=[DataRequired()])
    event_id = IntegerField('event_id', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
