from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class InviteForm(FlaskForm):
    event_id = IntegerField('event_id', validators=[DataRequired()])
