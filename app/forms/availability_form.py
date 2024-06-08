from flask_wtf import FlaskForm
from wtforms import BooleanField, FormField
from wtforms.validators import DataRequired

class DayAvailabilityForm(FlaskForm):
    early_morning = BooleanField('early_morning', default=False)
    morning = BooleanField('morning', default=False)
    afternoon = BooleanField('afternoon', default=False)
    night = BooleanField('night', default=False)
    late_night = BooleanField('late_night', default=False)

class AvailabilityForm(FlaskForm):
    monday = FormField(DayAvailabilityForm)
    tuesday = FormField(DayAvailabilityForm)
    wednesday = FormField(DayAvailabilityForm)
    thursday = FormField(DayAvailabilityForm)
    friday = FormField(DayAvailabilityForm)
    saturday = FormField(DayAvailabilityForm)
    sunday = FormField(DayAvailabilityForm)


# from flask_wtf import FlaskForm
# from wtforms import BooleanField, SelectMultipleField
# from wtforms.validators import DataRequired

# class AvailabilityForm(FlaskForm):
#     early_morning = BooleanField('early_morning', default=False)
#     morning = BooleanField('morning', default=False)
#     afternoon = BooleanField('afternoon', default=False)
#     night = BooleanField('night', default=False)
#     late_night = BooleanField('late_night', default=False)
#     days_of_week = SelectMultipleField('days_of_week', choices=[('monday', 'Monday'), ('tuesday', 'Tuesday'), ('wednesday', 'Wednesday'), ('thursday', 'Thursday'), ('friday', 'Friday'), ('saturday', 'Saturday'), ('sunday', 'Sunday')], validators=[DataRequired()])
