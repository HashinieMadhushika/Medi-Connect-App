import React, { useState } from 'react';
import { Search, Video, Calendar, Star, Clock, ArrowLeft, Filter } from 'lucide-react';
import './DoctorsPage.css';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialties = [
    'All Specialties',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Psychiatrist',
    'Orthopedic'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: '15 years',
      consultations: 2340,
      nextAvailable: 'Today, 2:00 PM',
      image: '👩‍⚕️',
      fee: '$50',
      languages: ['English', 'Spanish']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      rating: 4.8,
      experience: '12 years',
      consultations: 1890,
      nextAvailable: 'Today, 4:30 PM',
      image: '👨‍⚕️',
      fee: '$40',
      languages: ['English', 'Mandarin']
    },
    {
      id: 3,
      name: 'Dr. Priya Patel',
      specialty: 'Dermatologist',
      rating: 4.9,
      experience: '10 years',
      consultations: 1560,
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: '👩‍⚕️',
      fee: '$45',
      languages: ['English', 'Hindi']
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Pediatrician',
      rating: 4.7,
      experience: '18 years',
      consultations: 3120,
      nextAvailable: 'Today, 5:00 PM',
      image: '👨‍⚕️',
      fee: '$55',
      languages: ['English']
    },
    {
      id: 5,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Psychiatrist',
      rating: 4.8,
      experience: '14 years',
      consultations: 2100,
      nextAvailable: 'Tomorrow, 9:00 AM',
      image: '👩‍⚕️',
      fee: '$60',
      languages: ['English', 'Spanish']
    },
    {
      id: 6,
      name: 'Dr. Robert Kumar',
      specialty: 'Orthopedic',
      rating: 4.9,
      experience: '20 years',
      consultations: 2890,
      nextAvailable: 'Today, 3:00 PM',
      image: '👨‍⚕️',
      fee: '$65',
      languages: ['English', 'Hindi']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  const BookingModal = ({ doctor, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-image">{doctor.image}</div>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <label>Select Date & Time</label>
            <input type="datetime-local" />
          </div>

          <div className="modal-field">
            <label>Consultation Type</label>
            <select>
              <option>Video Consultation</option>
              <option>Audio Call</option>
              <option>Chat Consultation</option>
            </select>
          </div>

          <div className="modal-field">
            <label>Brief Description</label>
            <textarea rows="3" placeholder="Describe your symptoms..." />
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Consultation booked successfully!');
              onClose();
            }}
            className="confirm-btn"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );

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
          <div className="spacer"></div>
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
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-image">{doctor.image}</div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
            <div className="doctor-body">
              <div className="doctor-stats">
                <div className="rating">
                  <Star size={18} className="star-icon" />
                  <span className="rating-value">{doctor.rating}</span>
                  <span className="consultations">({doctor.consultations})</span>
                </div>
                <span className="fee">{doctor.fee}</span>
              </div>
              <div className="doctor-info">
                <div className="info-item">
                  <Clock size={16} />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span className="available">{doctor.nextAvailable}</span>
                </div>
                <div className="languages">
                  {doctor.languages.map((lang, i) => (
                    <span key={i} className="lang-tag">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedDoctor(doctor)} className="book-btn">
                <Video size={18} />
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
};

export default DoctorsPage;
