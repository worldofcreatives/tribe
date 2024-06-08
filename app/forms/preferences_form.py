from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FieldList
from wtforms.validators import DataRequired

class PreferencesForm(FlaskForm):
    event_types = FieldList(StringField('event_type', validators=[DataRequired()]), min_entries=1)
    activity_types = FieldList(StringField('activity_type', validators=[DataRequired()]), min_entries=1)
    restaurant_types = FieldList(StringField('restaurant_type', validators=[DataRequired()]), min_entries=1)
    group_size = SelectField('group_size', choices=[('one-on-one', 'One-on-One'), ('small', 'Small Get Together'), ('medium', 'Gathering'), ('large', 'Crowd')], validators=[DataRequired()])
