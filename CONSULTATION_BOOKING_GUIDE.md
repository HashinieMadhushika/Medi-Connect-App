# Doctor Consultation Booking System - Setup Guide

## 🎉 New Features Added

This guide explains the new doctor consultation booking system that has been integrated into your Medi-Connect application.

## 📋 What's New

### Backend Components

1. **MongoDB Models**
   - `Doctor.js` - Schema for doctor profiles
   - `Consultation.js` - Schema for booking consultations

2. **API Routes**
   - `GET /api/doctors` - Fetch all doctors (with filtering)
   - `GET /api/doctors/:id` - Get single doctor details
   - `POST /api/consultations/book` - Book a consultation
   - `GET /api/consultations/user/:userId` - Get user's consultations
   - `GET /api/consultations/doctor/:doctorId` - Get doctor's consultations
   - `PATCH /api/consultations/:id/status` - Update consultation status

3. **Database Seeding**
   - `backend/seed.js` - Populates database with sample doctors

### Frontend Components

1. **Updated Pages**
   - `DoctorsPage.js` - Now fetches doctors from API and includes booking modal
   - `Login.js` - Saves userId to localStorage
   - `SignUp.js` - Saves userId after registration

2. **New Pages**
   - `MyConsultations.js` - View all your booked consultations

## 🚀 Setup Instructions

### Step 1: Deploy Updated Code

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Add doctor consultation booking system"

# Push to trigger deployment
git push
```

### Step 2: Seed the Database

After deployment completes, SSH into your EC2 instance and seed the database with sample doctors:

```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@3.80.227.4

# Enter the backend container
docker exec -it medi-backend sh

# Run the seed script
npm run seed

# Exit container
exit
```

You should see output like:
```
✅ Connected to MongoDB
✅ Cleared existing doctors
✅ Successfully inserted 8 doctors

📋 Doctors added:
1. Dr. Sarah Johnson - Cardiologist ($50)
2. Dr. Michael Chen - General Physician ($40)
...
```

## 🎯 How to Use

### For Users

1. **Sign Up / Login**
   - Create an account or login
   - Your userId is automatically saved

2. **Browse Doctors**
   - Navigate to `/doctors` page
   - Filter by specialty
   - Search by name or specialty

3. **Book Consultation**
   - Click "Book Consultation" on any doctor card
   - Fill in:
     - Patient Name
     - Email
     - Phone Number
     - Appointment Date & Time
     - Consultation Type (Video/Audio/Chat)
     - Symptoms description
   - Click "Confirm Booking"

4. **View Consultations**
   - Click "My Consultations" button in header
   - Filter by status: All, Pending, Confirmed, Completed, Cancelled
   - See all your booking details

## 📊 Database Schema

### Doctor Model
```javascript
{
  name: String,
  specialty: String, // 'General Physician', 'Cardiologist', etc.
  rating: Number, // 0-5
  experience: String,
  consultations: Number, // Total count
  image: String, // Emoji
  fee: Number,
  languages: [String],
  isAvailable: Boolean
}
```

### Consultation Model
```javascript
{
  userId: ObjectId, // Reference to User
  doctorId: ObjectId, // Reference to Doctor
  patientName: String,
  patientEmail: String,
  patientPhone: String,
  appointmentDate: Date,
  appointmentTime: String,
  consultationType: String, // 'Video Consultation', 'Audio Call', 'Chat Consultation'
  symptoms: String,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  fee: Number,
  paymentStatus: String // 'pending', 'paid', 'refunded'
}
```

## 🔧 API Testing

### Test with MongoDB Shell

```bash
# Enter MongoDB container
docker exec -it mongodb mongosh

# Switch to database
use mediconnect

# View all doctors
db.doctors.find().pretty()

# Count doctors by specialty
db.doctors.aggregate([
  { $group: { _id: "$specialty", count: { $sum: 1 } } }
])

# View all consultations
db.consultations.find().pretty()

# Find consultations by status
db.consultations.find({ status: "pending" }).pretty()
```

### Test with API

```bash
# Get all doctors
curl http://3.80.227.4:5000/api/doctors

# Get doctors by specialty
curl http://3.80.227.4:5000/api/doctors?specialty=Cardiologist

# Search doctors
curl http://3.80.227.4:5000/api/doctors?search=Sarah

# Get user consultations (replace USER_ID)
curl http://3.80.227.4:5000/api/consultations/user/USER_ID
```

## 🛠️ Adding More Doctors

### Option 1: Use API

```bash
curl -X POST http://3.80.227.4:5000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. John Doe",
    "specialty": "Cardiologist",
    "rating": 4.8,
    "experience": "10 years",
    "fee": 60,
    "languages": ["English"],
    "isAvailable": true
  }'
```

### Option 2: Modify seed.js

1. Edit `backend/seed.js`
2. Add more doctors to the `sampleDoctors` array
3. Rerun: `npm run seed`

## 📱 Frontend Routes

- `/` - Home Page
- `/signup` - Sign Up
- `/login` - Login
- `/doctors` - Browse Doctors & Book Consultations
- `/consultations` - View My Consultations
- `/prescriptions` - Prescriptions Page
- `/platform` - Platform Info

## 🔐 Environment Variables

Backend `.env`:
```
MONGO_URI=mongodb://mongodb:27017/mediconnect
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

Frontend (create `.env` in frontend folder):
```
REACT_APP_API_URL=http://3.80.227.4:5000
```

## 🐛 Troubleshooting

### Doctors not showing?
- Ensure you ran the seed script
- Check backend logs: `docker logs medi-backend`
- Verify MongoDB is running: `docker ps | grep mongodb`

### Can't book consultation?
- Ensure you're logged in
- Check browser console for errors
- Verify userId is in localStorage: `localStorage.getItem('userId')`

### Database connection issues?
```bash
# Check MongoDB status
docker logs mongodb

# Restart backend
docker restart medi-backend
```

## 📝 Future Enhancements

- [ ] Payment integration
- [ ] Email/SMS notifications
- [ ] Video call functionality
- [ ] Doctor availability calendar
- [ ] Review and rating system
- [ ] Prescription management after consultation
- [ ] Admin dashboard for managing doctors

## ✅ Verification Checklist

- [ ] Code deployed to EC2
- [ ] MongoDB running and accessible
- [ ] Database seeded with doctors
- [ ] Can view doctors on frontend
- [ ] Can sign up/login
- [ ] Can book consultation
- [ ] Can view booked consultations
- [ ] All data persisting in MongoDB

## 🎊 Success!

Your doctor consultation booking system is now fully functional! Users can:
✅ Browse doctors by specialty
✅ Search for doctors
✅ Book consultations with appointment details
✅ View their consultation history
✅ Filter consultations by status

All data is stored in MongoDB and persists across deployments.
