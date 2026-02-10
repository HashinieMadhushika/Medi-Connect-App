import React, { useState, useEffect } from 'react';
import { Search, Video, Calendar, Star, Clock, ArrowLeft, Filter, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DoctorsPage.css';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://3.80.227.4:5000';

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty, searchTerm]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/doctors?`;
      
      if (selectedSpecialty !== 'all') {
        url += `specialty=${encodeURIComponent(selectedSpecialty)}&`;
      }
      
      if (searchTerm) {
        url += `search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      setDoctors(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again later.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'All Specialties',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Psychiatrist',
    'Orthopedic'
  ];

  const BookingModal = ({ doctor, onClose }) => {
    const [formData, setFormData] = useState({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentDate: '',
      appointmentTime: '',
      consultationType: 'Video Consultation',
      symptoms: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async () => {
      // Basic validation
      if (!formData.patientName || !formData.patientEmail || !formData.patientPhone || 
          !formData.appointmentDate || !formData.appointmentTime) {
        setBookingError('Please fill in all required fields');
        return;
      }

      try {
        setBookingLoading(true);
        setBookingError(null);

        // Get userId from localStorage (assuming it's stored after login)
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setBookingError('Please login to book a consultation');
          return;
        }

        const response = await fetch(`${API_URL}/api/consultations/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            doctorId: doctor._id,
            ...formData
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to book consultation');
        }

        alert('Consultation booked successfully!');
        onClose();
      } catch (err) {
        console.error('Booking error:', err);
        setBookingError(err.message || 'Failed to book consultation. Please try again.');
      } finally {
        setBookingLoading(false);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-image">{doctor.image}</div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <p className="fee">Fee: ${doctor.fee}</p>
          </div>

          <div className="modal-body">
            {bookingError && (
              <div style={{ 
                padding: '10px', 
                marginBottom: '15px', 
                backgroundColor: '#fee', 
                color: '#c33',
                borderRadius: '5px',
                fontSize: '14px'
              }}>
                {bookingError}
              </div>
            )}

            <div className="modal-field">
              <label>Full Name *</label>
              <input 
                type="text" 
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="modal-field">
              <label>Email *</label>
              <input 
                type="email" 
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="modal-field">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                name="patientPhone"
                value={formData.patientPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="modal-field">
              <label>Appointment Date *</label>
              <input 
                type="date" 
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="modal-field">
              <label>Appointment Time *</label>
              <input 
                type="time" 
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-field">
              <label>Consultation Type</label>
              <select 
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
              >
                <option>Video Consultation</option>
                <option>Audio Call</option>
                <option>Chat Consultation</option>
              </select>
            </div>

            <div className="modal-field">
              <label>Brief Description of Symptoms</label>
              <textarea 
                rows="3" 
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe your symptoms..."
                maxLength="500"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={onClose} className="cancel-btn" disabled={bookingLoading}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="confirm-btn"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredDoctors = doctors;

  return (
    <div className="doctors-page">
      {/* Header */}
      <div className="header">
        <div className="header-inner">
          <button onClick={() => window.history.back()} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="title">Welfealth Doctors</h1>
          <button onClick={() => navigate('/consultations')} className="view-consultations-btn">
            <FileText size={18} />
            <span>My Consultations</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-inner">
          <h2>Connect with Top Doctors</h2>
          <p>Get expert medical advice from certified healthcare professionals</p>
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-label">
          <Filter size={18} />
          <span>Filter by Specialty:</span>
        </div>
        <div className="filter-buttons">
          {specialties.map((specialty, index) => (
            <button
              key={index}
              onClick={() => setSelectedSpecialty(index === 0 ? 'all' : specialty)}
              className={`filter-btn ${
                (index === 0 && selectedSpecialty === 'all') || selectedSpecialty === specialty
                  ? 'active'
                  : ''
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {loading ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '50px',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading doctors...
          </div>
        ) : error ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '50px',
            fontSize: '18px',
            color: '#c33'
          }}>
            {error}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '50px',
            fontSize: '18px',
            color: '#666'
          }}>
            No doctors found. Try adjusting your search or filters.
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <div className="doctor-header">
                <div className="doctor-image">{doctor.image}</div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
              <div className="doctor-body">
                <div className="doctor-stats">
                  <div className="rating">
                    <Star size={18} className="star-icon" />
                    <span className="rating-value">{doctor.rating.toFixed(1)}</span>
                    <span className="consultations">({doctor.consultations})</span>
                  </div>
                  <span className="fee">${doctor.fee}</span>
                </div>
                <div className="doctor-info">
                  <div className="info-item">
                    <Clock size={16} />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="info-item">
                    <Calendar size={16} />
                    <span className="available">Available</span>
                  </div>
                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="languages">
                      {doctor.languages.map((lang, i) => (
                        <span key={i} className="lang-tag">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setSelectedDoctor(doctor)} className="book-btn">
                  <Video size={18} />
                  Book Consultation
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedDoctor && (
        <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorsPage;
