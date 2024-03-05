import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src="/image.jpg" alt="header-image" className="landing-header-img"/>
        <h1>Your Main Heading Here</h1>
        <p>Your inspiring subheading text.</p>
      </header>
      <section className="features-section">
      <h2>Our Features</h2>
      <div className="feature">
        <h3>Feature 1</h3>
        <p>Description of feature 1.</p>
      </div>
      <div className="feature">
        <h3>Feature 2</h3>
        <p>Description of feature 2.</p>
      </div>
      <div className="feature">
        <h3>Feature 3</h3>
        <p>Description of feature 3.</p>
      </div>
    </section>
    <section className="how-it-works-section">
      <h2>How It Works</h2>
      <div className="step">
        <h3>Step 1</h3>
        <p>Explanation of step 1.</p>
        <h3>Step 2</h3>
        <p>Explanation of step 2.</p>
        <h3>Step 3</h3>
        <p>Explanation of step 3.</p>
      </div>
    </section>
    <section className="faqs-section">
      <h2>FAQs</h2>
      <div className="faq">
        <h3>FAQ Question?</h3>
        <p>Answer to the question.</p>
      </div>
      <div className="faq">
        <h3>FAQ Question?</h3>
        <p>Answer to the question.</p>
      </div>
      <div className="faq">
        <h3>FAQ Question?</h3>
        <p>Answer to the question.</p>
      </div>
    </section>
    <section className="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Join us now and start your journey.</p>
      <button>Sign Up</button>
    </section>
    </div>
  );
};

export default LandingPage;
