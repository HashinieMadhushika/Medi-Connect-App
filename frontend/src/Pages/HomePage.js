// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Welfealth</h1>
        <p>Your trusted healthcare partner</p>
      </header>
      
      <main className="home-main">
        <div className="hero-section">
          <h2>Quality Healthcare Made Accessible</h2>
          <p>Connect with doctors, manage your health, and get the care you deserve from the comfort of your home.</p>
          
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/signup')}
            >
              Get Started - Sign Up
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => navigate('/login')}
            >
              I Already Have an Account
            </button>
          </div>
        </div>
        
        <div className="features-section">
          <div 
            className="feature" 
            onClick={() => navigate('/doctors')}
            style={{ cursor: 'pointer' }}
          >
            <h3>👨‍⚕️ Connect with Doctors</h3>
            <p>Video consultations with certified healthcare professionals</p>
          </div>
          <div 
            className="feature"
            onClick={() => navigate('/prescriptions')}
            style={{ cursor: 'pointer' }}
          >
            <h3>💊 Online Prescriptions</h3>
            <p>Get prescriptions delivered to your doorstep</p>
          </div>
          <div 
            className="feature"
            onClick={() => navigate('/platform')}
            style={{ cursor: 'pointer' }}
          >
            <h3>📱 Easy to Use</h3>
            <p>User-friendly platform accessible from any device</p>
          </div>
        </div>
      </main>
      
      <footer className="home-footer">
        <p>© 2023 Welfealth. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;