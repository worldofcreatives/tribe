from app.models import db
from app.models import *

def drop_and_create():
    with app.app_context():  # Ensure you're working within the app context
        db.drop_all()  # Drop all tables
        db.create_all()  # Recreate all tables

if __name__ == "__main__":
    from app import app  # Import your Flask app creation function
    app = app()
    drop_and_create()
