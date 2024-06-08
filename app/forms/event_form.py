from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, TimeField, IntegerField
from wtforms.validators import DataRequired, Length, Optional

class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=255)])
    venue = StringField('venue', validators=[DataRequired(), Length(max=255)])
    date = DateField('date', format='%Y-%m-%d', validators=[DataRequired()])
    time = TimeField('time', format='%H:%M:%S', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired(), Length(min=10)])
    capacity = IntegerField('capacity', validators=[DataRequired()])
