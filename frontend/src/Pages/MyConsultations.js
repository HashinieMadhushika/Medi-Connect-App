import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MyConsultations.css';

const MyConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://3.80.227.4:5000';

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError('Please login to view your consultations');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/consultations/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }

      const data = await response.json();
      setConsultations(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      setError('Failed to load consultations. Please try again later.');
      setConsultations([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'confirmed':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const filteredConsultations = filter === 'all' 
    ? consultations 
    : consultations.filter(c => c.status === filter);

  return (
    <div className="consultations-page">
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <button onClick={() => navigate('/doctors')} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="title">My Consultations</h1>
          <div className="spacer"></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Consultations List */}
      <div className="consultations-container">
        {loading ? (
          <div className="loading">Loading consultations...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredConsultations.length === 0 ? (
          <div className="no-data">
            <Calendar size={64} style={{ color: '#ccc', marginBottom: '20px' }} />
            <h3>No consultations found</h3>
            <p>Book a consultation with a doctor to get started</p>
            <button onClick={() => navigate('/doctors')} className="book-now-btn">
              Book Consultation
            </button>
          </div>
        ) : (
          <div className="consultations-grid">
            {filteredConsultations.map((consultation) => (
              <div key={consultation._id} className="consultation-card">
                <div className="consultation-header">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      {consultation.doctorId?.image || '👨‍⚕️'}
                    </div>
                    <div>
                      <h3>{consultation.doctorId?.name || 'Doctor'}</h3>
                      <p className="specialty">{consultation.doctorId?.specialty}</p>
                    </div>
                  </div>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(consultation.status) }}
                  >
                    {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                  </span>
                </div>

                <div className="consultation-body">
                  <div className="info-row">
                    <Calendar size={18} />
                    <span>{formatDate(consultation.appointmentDate)}</span>
                  </div>
                  <div className="info-row">
                    <Clock size={18} />
                    <span>{consultation.appointmentTime}</span>
                  </div>
                  <div className="info-row">
                    <User size={18} />
                    <span>{consultation.patientName}</span>
                  </div>
                  <div className="info-row">
                    <Phone size={18} />
                    <span>{consultation.patientPhone}</span>
                  </div>
                  <div className="info-row">
                    <Mail size={18} />
                    <span>{consultation.patientEmail}</span>
                  </div>
                  {consultation.symptoms && (
                    <div className="info-row symptoms">
                      <FileText size={18} />
                      <span>{consultation.symptoms}</span>
                    </div>
                  )}
                  <div className="consultation-footer">
                    <span className="consultation-type">{consultation.consultationType}</span>
                    <span className="fee">${consultation.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConsultations;
