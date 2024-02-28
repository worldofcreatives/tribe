from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField, FileField
from wtforms.validators import Optional, Length, DataRequired
from flask_wtf.file import FileAllowed

class SubmissionForm(FlaskForm):
    name = TextAreaField('Notes', validators=[DataRequired()])
    notes = TextAreaField('Notes', validators=[Optional()])
    bpm = IntegerField('BPM', validators=[Optional()])
    collaborators = StringField('Collaborators', validators=[Optional(), Length(max=500)])
    file = FileField('Audio', validators=[
        FileAllowed(['mp3', 'wav'], 'Audio only!'),
        Optional()
    ])
