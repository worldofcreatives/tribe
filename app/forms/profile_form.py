from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SelectMultipleField
from wtforms.validators import DataRequired, Email, Optional
from flask_wtf.file import FileAllowed
from wtforms.widgets import ListWidget, CheckboxInput
from app.models import Genre, Type

class ProfileForm(FlaskForm):
    # Shared fields
    bio = TextAreaField('Bio', validators=[Optional()])
    name = StringField('Name', validators=[DataRequired()])

    # Creator-specific fields
    profile_pic = FileField('Profile Picture', validators=[
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Images only!'),
        Optional()
    ])
    genres = SelectMultipleField('Genres', choices=[], validators=[Optional()], coerce=int)
    types = SelectMultipleField('Types', choices=[], validators=[Optional()], coerce=int)

    # Company-specific fields
    logo = FileField('Company Logo', validators=[
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Images only!'),
        Optional()
    ])

    def __init__(self, *args, user_type=None, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        # Adjusting form fields based on user type
        if user_type == 'Creator':
            del self.logo
            self.genres.choices = [(genre.id, genre.name) for genre in Genre.query.all()]
            self.types.choices = [(type.id, type.name) for type in Type.query.all()]
        elif user_type == 'Company':
            del self.profile_pic
            del self.genres
            del self.types
