from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class NotificationForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired()])
