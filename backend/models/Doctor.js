const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    enum: ['General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist', 'Orthopedic']
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  experience: {
    type: String,
    required: true
  },
  consultations: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: '👨‍⚕️'
  },
  fee: {
    type: Number,
    required: [true, 'Consultation fee is required']
  },
  languages: [{
    type: String
  }],
  availability: [{
    day: String,
    slots: [String]
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster specialty lookups
doctorSchema.index({ specialty: 1 });
doctorSchema.index({ isAvailable: 1 });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
