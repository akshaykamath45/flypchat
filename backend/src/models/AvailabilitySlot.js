const mongoose = require('mongoose');

const availabilitySlotSchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',
    required: true
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Format: "HH:mm"
  endTime: { type: String, required: true }, // Format: "HH:mm"
  isBooked: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false }, // For slots that overlap with booked slots
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for efficient slot lookup
availabilitySlotSchema.index({ expertId: 1, date: 1, startTime: 1 });

// Update timestamp on save
availabilitySlotSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to generate 15-minute interval slots for a given time range
availabilitySlotSchema.statics.generateTimeSlots = function(startTime, endTime) {
  const slots = [];
  let currentTime = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  while (currentTime < end) {
    const slotStartTime = currentTime.toTimeString().slice(0, 5);
    currentTime.setMinutes(currentTime.getMinutes() + 15);
    const slotEndTime = currentTime.toTimeString().slice(0, 5);
    
    slots.push({
      startTime: slotStartTime,
      endTime: slotEndTime
    });
  }

  return slots;
};

// Static method to find overlapping slots
availabilitySlotSchema.statics.findOverlappingSlots = async function(expertId, date, startTime, endTime) {
  return this.find({
    expertId,
    date,
    $or: [
      { startTime: { $gte: startTime, $lt: endTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  });
};

// Method to block overlapping slots
availabilitySlotSchema.statics.blockOverlappingSlots = async function(expertId, date, startTime, endTime, bookingId) {
  const overlappingSlots = await this.findOverlappingSlots(expertId, date, startTime, endTime);
  
  // Update all overlapping slots
  await this.updateMany(
    { _id: { $in: overlappingSlots.map(slot => slot._id) } },
    { 
      $set: { 
        isBlocked: true,
        bookingId: bookingId
      } 
    }
  );

  return overlappingSlots;
};

module.exports = mongoose.model('AvailabilitySlot', availabilitySlotSchema);