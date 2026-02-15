import './SignUp.css';
import fullicon from '../Images/image2.jpeg';
import image1 from '../Images/image3.png';
import image2 from '../Images/image4.jpeg';
import image3 from '../Images/image5.jpeg';
import image4 from '../Images/image6.jpeg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const API_URL = `http://${window.location.hostname}:5000`;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (message) {
      setMessage('');
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully!');
        setIsError(false);
        
        // Save userId from response
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
        }

        // ✅ Navigate to DoctorsPage after signup
        navigate('/doctors');
      } else {
        setMessage(data.error || 'Signup failed');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image2, image3, image1, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="signup-wrapper"
      style={{
        backgroundImage: `url(${fullicon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-header">
            <h1>Hashinie Madhushika</h1>
            <h2>Create Account</h2>
          </div>

          {message && (
            <div className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="terms" required disabled={isLoading} />
                <label htmlFor="terms">I agree to the terms and conditions</label>
              </div>
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <p className="login-redirect">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>

          <div className="signup-footer">
            <div className="doctor-connect">
              <h3>Connect with a Doctor</h3>
              <p>Users launched at home</p>
            </div>
          </div>
        </div>

        <div className="signup-image">
          <div className="image-container">
            <img
              src={images[currentImageIndex]}
              alt="Medical professional illustration"
              className="medical-image"
            />
            <div className="image-overlay">
              <h3>Quality Healthcare</h3>
              <p>Access to medical professionals from the comfort of your home</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
