from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange, Optional

class OpportunityForm(FlaskForm):
    name = StringField('Opportunity Name', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=10)])
    target_audience = TextAreaField('Target Audience', validators=[Optional()])
    budget = DecimalField('Budget', validators=[Optional(), NumberRange(min=0)], places=2)
    guidelines = TextAreaField('Guidelines', validators=[Optional()])
