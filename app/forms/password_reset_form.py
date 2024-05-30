# app/forms/password_reset_form.py
from flask_wtf import FlaskForm
from wtforms import PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo

class PasswordResetForm(FlaskForm):
    password = PasswordField('New Password', validators=[DataRequired(message="Password is required.")])
    confirm_password = PasswordField('Confirm Password', validators=[
        DataRequired(message="Please confirm your password."),
        EqualTo('password', message='Passwords must match.')
    ])
    submit = SubmitField('Reset Password')


# # app/forms/password_reset_form.py
# from flask_wtf import FlaskForm
# from wtforms import PasswordField, SubmitField
# from wtforms.validators import DataRequired, EqualTo

# class PasswordResetForm(FlaskForm):
#     password = PasswordField('New Password', validators=[DataRequired()])
#     confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
#     submit = SubmitField('Reset Password')
