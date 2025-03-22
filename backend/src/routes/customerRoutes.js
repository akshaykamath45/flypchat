const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer routes
router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);

// Booking routes
router.post('/:customerId/bookings', customerController.createBooking);
router.get('/:customerId/bookings', customerController.getCustomerBookings);
router.put('/bookings/:id/status', customerController.updateBookingStatus);

module.exports = router;