from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileAllowed

class MediaForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    file = FileField('Music', validators=[
        FileAllowed(["mp3", "wav", "ogg", "flac"], 'Music only!'),
        Optional()
    ])

    def __init__(self, *args, is_update=False, **kwargs):
        super(MediaForm, self).__init__(*args, **kwargs)
        if is_update:
            self.file.validators.append(Optional())
