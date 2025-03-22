const Booking = require('../models/Booking');
const Expert = require('../models/Expert');
const Customer = require('../models/Customer');
const AvailabilitySlot = require('../models/AvailabilitySlot');

// Check slot availability
exports.checkSlotAvailability = async (req, res) => {
  try {
    const { expertId, date, startTime, duration } = req.body;

    // Calculate end time based on duration
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + parseInt(duration));
    const endTime = endDate.toTimeString().slice(0, 5);

    // Find overlapping slots
    const overlappingSlots = await AvailabilitySlot.findOverlappingSlots(
      expertId,
      date,
      startTime,
      endTime
    );

    // Check if any overlapping slot is already booked or blocked
    const isAvailable = overlappingSlots.every(slot => !slot.isBooked && !slot.isBlocked);

    res.json({ available: isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, expertId, date, startTime, duration, sessionFee } = req.body;

    // Validate customer and expert
    const [customer, expert] = await Promise.all([
      Customer.findById(customerId),
      Expert.findById(expertId)
    ]);

    if (!customer || !expert) {
      return res.status(404).json({ 
        message: !customer ? 'Customer not found' : 'Expert not found' 
      });
    }

    // Calculate end time
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + parseInt(duration));
    const endTime = endDate.toTimeString().slice(0, 5);

    // Check slot availability
    const overlappingSlots = await AvailabilitySlot.findOverlappingSlots(
      expertId,
      date,
      startTime,
      endTime
    );

    // Verify all required slots are available
    const unavailableSlot = overlappingSlots.find(slot => slot.isBooked || slot.isBlocked);
    if (unavailableSlot) {
      return res.status(400).json({ 
        message: 'Selected time slot is no longer available' 
      });
    }

    // Create the booking
    const booking = new Booking({
      customerId,
      expertId,
      date: startDate,
      startTime,
      endTime,
      duration: parseInt(duration),
      sessionFee,
      bookedSlots: overlappingSlots.map(slot => slot._id)
    });

    // Save booking and block overlapping slots
    const savedBooking = await booking.save();
    await AvailabilitySlot.blockOverlappingSlots(
      expertId,
      date,
      startTime,
      endTime,
      savedBooking._id
    );

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get booking details
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email')
      .populate('expertId', 'name title avatarUrl');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Release blocked slots
    await AvailabilitySlot.updateMany(
      { _id: { $in: booking.bookedSlots } },
      { 
        $set: { 
          isBlocked: false,
          isBooked: false,
          bookingId: null 
        } 
      }
    );

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};