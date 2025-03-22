const mongoose = require('mongoose');

const availabilitySlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  duration: { type: Number, required: true } // Duration in minutes
});

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  specialization: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  price: { type: Number, required: true }, // Price per hour
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  expertise: [{ type: String }],
  availability: [availabilitySlotSchema],
  workingHours: {
    start: { type: String, required: true }, // Format: "HH:mm"
    end: { type: String, required: true } // Format: "HH:mm"
  },
  workingDays: [{ type: Number }], // 0-6 representing Sunday to Saturday
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
expertSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Expert', expertSchema);