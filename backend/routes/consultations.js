const express = require('express');
const Consultation = require('../models/Consultation');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const router = express.Router();

// Book a new consultation
router.post('/book', async (req, res) => {
  try {
    const {
      userId,
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      consultationType,
      symptoms
    } = req.body;

    // Validate required fields
    if (!userId || !doctorId || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be provided'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: 'Doctor not found'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Create consultation
    const consultation = await Consultation.create({
      userId,
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      consultationType: consultationType || 'Video Consultation',
      symptoms,
      fee: doctor.fee,
      status: 'pending'
    });

    // Update doctor's consultation count
    await Doctor.findByIdAndUpdate(doctorId, {
      $inc: { consultations: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to book consultation'
    });
  }
});

// Get all consultations for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.params.userId })
      .populate('doctorId', 'name specialty image rating')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    console.error('Error fetching user consultations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch consultations'
    });
  }
});

// Get all consultations for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctorId: req.params.doctorId })
      .populate('userId', 'fullName email phoneNumber')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    console.error('Error fetching doctor consultations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch consultations'
    });
  }
});

// Get single consultation by ID
router.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('doctorId', 'name specialty image rating fee')
      .populate('userId', 'fullName email phoneNumber');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch consultation'
    });
  }
});

// Update consultation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultation status updated',
      data: consultation
    });
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update consultation'
    });
  }
});

// Cancel consultation
router.delete('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }

    // Update status to cancelled instead of deleting
    consultation.status = 'cancelled';
    await consultation.save();

    res.status(200).json({
      success: true,
      message: 'Consultation cancelled successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error cancelling consultation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel consultation'
    });
  }
});

// Get all consultations (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate) query.appointmentDate.$gte = new Date(startDate);
      if (endDate) query.appointmentDate.$lte = new Date(endDate);
    }
    
    const consultations = await Consultation.find(query)
      .populate('doctorId', 'name specialty')
      .populate('userId', 'fullName email')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch consultations'
    });
  }
});

module.exports = router;
