FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG S3_BUCKET
ARG S3_KEY
ARG S3_SECRET

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .


# Install psycopg2 if not already included in requirements.txt
RUN pip install psycopg2

# Run the script to drop all tables and recreate them
RUN python reset_db.py

# Apply any further migrations (this might be optional if reset_db.py already creates the schema as needed)
RUN flask db upgrade

# Seed the database
RUN flask seed all

CMD gunicorn app:app

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app
