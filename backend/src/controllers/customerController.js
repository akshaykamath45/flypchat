const Customer = require('../models/Customer');
const Booking = require('../models/Booking');
const Expert = require('../models/Expert');
const AvailabilitySlot = require('../models/AvailabilitySlot');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('bookings');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { expertId, date, startTime, endTime, duration, sessionFee } = req.body;
    const customerId = req.params.customerId;
    
    // Validate customer and expert exist
    const [customer, expert] = await Promise.all([
      Customer.findById(customerId),
      Expert.findById(expertId)
    ]);
    
    if (!customer || !expert) {
      return res.status(404).json({ 
        message: !customer ? 'Customer not found' : 'Expert not found'
      });
    }
    
    // Check if the slot is available
    const overlappingSlots = await AvailabilitySlot.findOverlappingSlots(
      expertId,
      date,
      startTime,
      endTime
    );
    
    if (overlappingSlots.some(slot => slot.isBooked || slot.isBlocked)) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }
    
    // Create the booking
    const booking = new Booking({
      customerId,
      expertId,
      date,
      startTime,
      endTime,
      duration,
      sessionFee,
      status: 'pending',
      bookedSlots: overlappingSlots.map(slot => slot._id)
    });
    
    const newBooking = await booking.save();
    
    // Block the overlapping slots
    await AvailabilitySlot.blockOverlappingSlots(
      expertId,
      date,
      startTime,
      endTime,
      newBooking._id
    );
    
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

// Get customer bookings
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId })
      .populate('expertId')
      .sort('-createdAt');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};