from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import Optional, Length, DataRequired

class SubmissionForm(FlaskForm):
    name = TextAreaField('Notes', validators=[DataRequired()])
    notes = TextAreaField('Notes', validators=[Optional()])
    bpm = IntegerField('BPM', validators=[Optional()])
    collaborators = StringField('Collaborators', validators=[Optional(), Length(max=500)])

