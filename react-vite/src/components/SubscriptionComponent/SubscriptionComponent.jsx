import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/profile';
import './SubscriptionComponent.css';

const stripePromise = loadStripe('pk_test_51O1YnuBIxhjYY7P2cloS3EG1c3Bv84hHkvSJz331km8OA1VmhhRH0BzAFNGRb2vSQy6Yyjfy9uQO8XhLDv5FBwmP00Z4t3vSpc');

const SubscriptionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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

  const handleManageSubscription = async () => {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id: user.stripe_customer_id }),
    });

    const session = await response.json();
    window.location.href = session.url;  // Redirect to the customer portal URL

    // After user returns from the customer portal, refresh the user data
    window.addEventListener('focus', () => {
      dispatch(fetchUserProfile());
    }, { once: true });
  };

  return (
    <div className="subscription-buttons">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Status: {user.status}</p>
      <button onClick={handleManageSubscription}>Manage Subscription</button>
      <button onClick={() => handleCheckout('price_1PLVpIBIxhjYY7P2UNEsuWfr')} className="subscribe-button">
        Subscribe Monthly ($77)
      </button>
      <button onClick={() => handleCheckout('price_1PLVpbBIxhjYY7P2e7zv0EU2')} className="subscribe-button">
        Subscribe Annually ($777)
      </button>
    </div>
  );
};

export default SubscriptionComponent;
