# email_utils.py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')

def send_email(to_email, subject, content):
    message = Mail(
        from_email='7PACKS <info@7packs.com>',
        to_emails=to_email,
        subject=subject,
        html_content=content)

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(str(e))
