require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mediconnect';

const sampleDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '15 years',
    consultations: 2340,
    image: '👩‍⚕️',
    fee: 50,
    languages: ['English', 'Spanish'],
    isAvailable: true
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'General Physician',
    rating: 4.8,
    experience: '12 years',
    consultations: 1890,
    image: '👨‍⚕️',
    fee: 40,
    languages: ['English', 'Mandarin'],
    isAvailable: true
  },
  {
    name: 'Dr. Priya Patel',
    specialty: 'Dermatologist',
    rating: 4.9,
    experience: '10 years',
    consultations: 1560,
    image: '👩‍⚕️',
    fee: 45,
    languages: ['English', 'Hindi'],
    isAvailable: true
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Pediatrician',
    rating: 4.7,
    experience: '18 years',
    consultations: 3120,
    image: '👨‍⚕️',
    fee: 55,
    languages: ['English'],
    isAvailable: true
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Psychiatrist',
    rating: 4.8,
    experience: '14 years',
    consultations: 2100,
    image: '👩‍⚕️',
    fee: 60,
    languages: ['English', 'Spanish'],
    isAvailable: true
  },
  {
    name: 'Dr. Robert Kumar',
    specialty: 'Orthopedic',
    rating: 4.9,
    experience: '20 years',
    consultations: 2890,
    image: '👨‍⚕️',
    fee: 65,
    languages: ['English', 'Hindi'],
    isAvailable: true
  },
  {
    name: 'Dr. Lisa Anderson',
    specialty: 'General Physician',
    rating: 4.6,
    experience: '8 years',
    consultations: 1200,
    image: '👩‍⚕️',
    fee: 35,
    languages: ['English'],
    isAvailable: true
  },
  {
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiologist',
    rating: 4.8,
    experience: '16 years',
    consultations: 2500,
    image: '👨‍⚕️',
    fee: 55,
    languages: ['English', 'Arabic'],
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing doctors
    console.log('Clearing existing doctors...');
    await Doctor.deleteMany({});
    console.log('✅ Cleared existing doctors');

    // Insert sample doctors
    console.log('Inserting sample doctors...');
    const result = await Doctor.insertMany(sampleDoctors);
    console.log(`✅ Successfully inserted ${result.length} doctors`);

    console.log('\n📋 Doctors added:');
    result.forEach((doctor, index) => {
      console.log(`${index + 1}. ${doctor.name} - ${doctor.specialty} ($${doctor.fee})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
