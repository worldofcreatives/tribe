import os
from flask import Blueprint, request, jsonify
import stripe
from app.models import db, User
from flask_login import login_required, current_user

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

stripe_routes = Blueprint('stripe', __name__)

@stripe_routes.route('/create-checkout-session', methods=['POST'])
@login_required
def create_checkout_session():
    data = request.get_json()
    price_id = data.get('price_id')

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=request.host_url + 'success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.host_url + 'cancel',
            customer_email=current_user.email
        )
        return jsonify({'id': checkout_session.id})
    except Exception as e:
        return jsonify(error=str(e)), 403

@stripe_routes.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        return jsonify({'error': 'Invalid signature'}), 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        handle_checkout_session(session)

    if event['type'] == 'invoice.payment_failed':
        session = event['data']['object']
        handle_failed_payment(session)

    return jsonify({'status': 'success'}), 200

def handle_checkout_session(session):
    user = User.query.filter_by(email=session['customer_email']).first()
    if user:
        if session['mode'] == 'subscription':
            subscription = stripe.Subscription.retrieve(session['subscription'])
            price_id = subscription['items']['data'][0]['price']['id']
            if price_id == 'price_1':
                user.status = 'Premium Monthly'
            elif price_id == 'price_2':
                user.status = 'Premium Annual'
            db.session.commit()

def handle_failed_payment(session):
    user = User.query.filter_by(email=session['customer_email']).first()
    if user:
        user.status = 'Basic'
        db.session.commit()
