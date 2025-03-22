const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true 
  },
  expertId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Expert',
    required: true 
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Format: "HH:mm"
  endTime: { type: String, required: true }, // Format: "HH:mm"
  duration: { type: Number, required: true }, // Duration in minutes
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  sessionFee: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  bookedSlots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AvailabilitySlot'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Middleware to handle slot blocking when a booking is confirmed
bookingSchema.pre('save', async function(next) {
  if (this.isModified('status') && this.status === 'confirmed') {
    try {
      // Update all booked slots to be unavailable
      await mongoose.model('AvailabilitySlot').updateMany(
        { _id: { $in: this.bookedSlots } },
        { $set: { isBooked: true } }
      );
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);