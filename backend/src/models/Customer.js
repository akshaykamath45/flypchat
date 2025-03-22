const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Virtual bookings field will be populated from the Booking model
  // This helps us track all bookings associated with this customer
});

// Ensure email uniqueness
customerSchema.index({ email: 1 }, { unique: true });

// Update timestamp on save
customerSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual populate for bookings
customerSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'customerId'
});

// Include virtuals when converting document to JSON
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Customer', customerSchema);