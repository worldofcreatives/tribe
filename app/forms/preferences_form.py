from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FieldList, HiddenField
from wtforms.validators import DataRequired
import json

class PreferencesForm(FlaskForm):
    event_types = FieldList(StringField('event_type'), min_entries=1, validators=[DataRequired()])
    activity_types = FieldList(StringField('activity_type'), min_entries=1, validators=[DataRequired()])
    restaurant_types = FieldList(StringField('restaurant_type'), min_entries=1, validators=[DataRequired()])
    group_size = SelectField('group_size', choices=[('one-on-one', 'One-on-One'), ('small', 'Small Get Together'), ('medium', 'Gathering'), ('large', 'Crowd')], validators=[DataRequired()])

    def populate_obj(self, obj):
        # Override populate_obj to correctly handle FieldList fields
        for name, field in self._fields.items():
            if isinstance(field, FieldList):
                setattr(obj, name, [subfield.data for subfield in field.entries])
            else:
                setattr(obj, name, field.data)
