import React, { useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  Play,
  MessageSquare,
  Bell,
  Calendar,
  Shield,
  Zap,
} from "lucide-react";
import "./EasyToUsePage.css";

const EasyToUsePage = () => {
  const [activeDevice, setActiveDevice] = useState("phone");
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: <Smartphone size={32} />,
      title: "Mobile-First Design",
      description: "Optimized for smartphones with intuitive touch controls.",
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description: "Quick loading times and smooth transitions.",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Private",
      description: "End-to-end encryption for your health data.",
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Real-time Chat",
      description: "Instant messaging with doctors and support team.",
    },
    {
      icon: <Bell size={32} />,
      title: "Smart Notifications",
      description: "Reminders for appointments and medication.",
    },
    {
      icon: <Calendar size={32} />,
      title: "Easy Scheduling",
      description: "Book or reschedule appointments in a few taps.",
    },
  ];

  const demoSteps = [
    { title: "Sign Up in Seconds", image: "📱" },
    { title: "Complete Your Profile", image: "👤" },
    { title: "Find Your Doctor", image: "🔍" },
    { title: "Book Consultation", image: "📅" },
    { title: "Connect & Consult", image: "💬" },
    { title: "Get Prescription", image: "💊" },
  ];

  const devices = [
    { id: "phone", name: "Smartphone", icon: <Smartphone size={24} /> },
    { id: "tablet", name: "Tablet", icon: <Tablet size={24} /> },
    { id: "desktop", name: "Desktop", icon: <Monitor size={24} /> },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Patient",
      text: "Booked my first consultation in under 2 minutes!",
    },
    {
      name: "John D.",
      role: "Senior User",
      text: "Even at 70, this platform is so easy to use!",
    },
    {
      name: "Priya K.",
      role: "Professional",
      text: "Perfect for my busy schedule. I use it during lunch breaks.",
    },
  ];

  return (
    <div className="easy-page">
      {/* Header */}
      <header className="header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        <h1 className="page-title">Easy to Use Platform</h1>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Healthcare Made Simple</h2>
        <p>Accessible from any device, designed for everyone</p>
        <button onClick={() => setShowDemo(true)} className="hero-btn">
          <Play size={22} /> Watch Demo
        </button>
      </section>

      {/* Devices */}
      <section className="devices">
        <h3>Works on All Devices</h3>
        <div className="device-buttons">
          {devices.map((d) => (
            <button
              key={d.id}
              className={`device-btn ${
                activeDevice === d.id ? "active" : ""
              }`}
              onClick={() => setActiveDevice(d.id)}
            >
              {d.icon} {d.name}
            </button>
          ))}
        </div>
        <div className="device-display">
          <div className="device-icon">
            {activeDevice === "phone" && "📱"}
            {activeDevice === "tablet" && "📲"}
            {activeDevice === "desktop" && "💻"}
          </div>
          <p>Optimized for {devices.find((d) => d.id === activeDevice)?.name}</p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h3>Why Users Love Our Platform</h3>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.text}"</p>
              <h5>{t.name}</h5>
              <span>{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>Ready to Experience It Yourself?</h3>
        <p>Join thousands of satisfied users today</p>
        <div className="cta-buttons">
          <button onClick={() => setShowDemo(true)} className="btn-primary">
            Try Demo
          </button>
          <button className="btn-outline">Sign Up Free</button>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowDemo(false)}>
              ✕
            </button>
            <h3>{demoSteps[currentStep].title}</h3>
            <div className="modal-image">{demoSteps[currentStep].image}</div>
            <div className="modal-controls">
              <button
                onClick={() =>
                  setCurrentStep((prev) => Math.max(0, prev - 1))
                }
                disabled={currentStep === 0}
              >
                Previous
              </button>
              {currentStep < demoSteps.length - 1 ? (
                <button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert("Demo completed!");
                    setShowDemo(false);
                    setCurrentStep(0);
                  }}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasyToUsePage;
