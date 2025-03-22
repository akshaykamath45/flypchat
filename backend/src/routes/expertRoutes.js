const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// Expert routes
router.get('/', expertController.getAllExperts);
router.get('/:id', expertController.getExpertById);
router.post('/', expertController.createExpert);
router.put('/:id', expertController.updateExpert);
router.delete('/:id', expertController.deleteExpert);

// Expert availability routes
router.get('/:id/availability', expertController.getExpertAvailability);
router.post('/:id/availability', expertController.addAvailabilitySlots);
router.put('/:id/availability', expertController.updateExpertAvailability);

module.exports = router;