from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    # Existing users
    demo = User(
        username='Demo', email='demo@aa.io', password='password', type='Company', company_id=1)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', creator_id=1)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', creator_id=2)

    # New users
    alice = User(
        username='alice', email='alice@example.com', password='password', type='Creator')
    charlie = User(
        username='charlie', email='charlie@example.com', password='password', type='Company', company_id=2)
    dana = User(
        username='dana', email='dana@example.com', password='password')
    evan = User(
        username='evan', email='evan@example.com', password='password', type='Company')
    fiona = User(
        username='fiona', email='fiona@example.com', password='password')

    db.session.add_all([demo, marnie, bobbie, alice, charlie, dana, evan, fiona])

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
