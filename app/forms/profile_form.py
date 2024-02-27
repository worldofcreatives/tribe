from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SelectMultipleField
from wtforms.validators import DataRequired, Email, Optional
from flask_wtf.file import FileAllowed
from wtforms.widgets import ListWidget, CheckboxInput
from app.models import Genre, Type

class ProfileForm(FlaskForm):
    # Shared fields
    email = StringField('Email', validators=[DataRequired(), Email()])
    bio = TextAreaField('Bio', validators=[Optional()])
    display_name = StringField('Name', validators=[DataRequired()])

    # Creator-specific fields
    profile_picture = FileField('Profile Picture', validators=[
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Images only!'),
        Optional()
    ])
    genres = SelectMultipleField('Genres', choices=[], validators=[Optional()], coerce=int)
    types = SelectMultipleField('Types', choices=[], validators=[Optional()], coerce=int)

    # Company-specific fields
    company_logo = FileField('Company Logo', validators=[
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Images only!'),
        Optional()
    ])

    def __init__(self, *args, user_type=None, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        # Adjusting form fields based on user type
        if user_type == 'Creator':
            del self.company_logo
            self.genres.choices = [(genre.id, genre.name) for genre in Genre.query.all()]
            self.types.choices = [(type.id, type.name) for type in Type.query.all()]
        elif user_type == 'company':
            del self.profile_picture
            del self.genres
            del self.types
