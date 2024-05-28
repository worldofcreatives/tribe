import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import './SubscriptionComponent.css';

const stripePromise = loadStripe('your_stripe_publishable_key');

const SubscriptionComponent = () => {
  const dispatch = useDispatch();

  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price_id: priceId }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="subscription-buttons">
      <button onClick={() => handleCheckout('price_1')} className="subscribe-button">
        Subscribe Monthly ($77)
      </button>
      <button onClick={() => handleCheckout('price_2')} className="subscribe-button">
        Subscribe Annually ($777)
      </button>
    </div>
  );
};

export default SubscriptionComponent;
