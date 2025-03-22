const Expert = require('../models/Expert');
const AvailabilitySlot = require('../models/AvailabilitySlot');

// Get all experts
exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expert by ID
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create expert
exports.createExpert = async (req, res) => {
  const expert = new Expert(req.body);
  try {
    const newExpert = await expert.save();
    res.status(201).json(newExpert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update expert
exports.updateExpert = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    Object.assign(expert, req.body);
    const updatedExpert = await expert.save();
    res.json(updatedExpert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete expert
exports.deleteExpert = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    await expert.deleteOne();
    res.json({ message: 'Expert deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expert availability
exports.getExpertAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // First, find the expert to get their working hours
    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    // Generate all possible 15-minute slots for the expert's working hours
    const availableSlots = AvailabilitySlot.generateTimeSlots(
      expert.workingHours.start,
      expert.workingHours.end
    );

    // Find existing booked or blocked slots for the date
    const existingSlots = await AvailabilitySlot.find({
      expertId: id,
      date: date,
      $or: [{ isBooked: true }, { isBlocked: true }]
    });

    // Filter out booked and blocked slots
    const availableTimeSlots = availableSlots.filter(slot => {
      return !existingSlots.some(existingSlot => {
        return (
          (slot.startTime >= existingSlot.startTime && slot.startTime < existingSlot.endTime) ||
          (slot.endTime > existingSlot.startTime && slot.endTime <= existingSlot.endTime)
        );
      });
    });

    res.json(availableTimeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add availability slots for expert
exports.addAvailabilitySlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, slots } = req.body;
    
    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    
    const availabilitySlots = slots.map(slot => ({
      expertId: id,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime
    }));
    
    const createdSlots = await AvailabilitySlot.insertMany(availabilitySlots);
    res.status(201).json(createdSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update expert availability based on working hours and days
exports.updateExpertAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    
    // Validate date range
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    // Find the expert
    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    
    // Validate working hours and days
    if (!expert.workingHours || !expert.workingDays || expert.workingDays.length === 0) {
      return res.status(400).json({ message: 'Expert working hours or days not configured' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate date range
    if (start > end) {
      return res.status(400).json({ message: 'Start date must be before end date' });
    }
    
    // Generate dates between start and end date
    const dates = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      // Check if the day of the week is in expert's working days
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      if (expert.workingDays.includes(dayOfWeek)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Generate time slots for each date based on expert's working hours
    const allSlots = [];
    for (const date of dates) {
      const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Generate 15-minute slots for the expert's working hours
      const timeSlots = AvailabilitySlot.generateTimeSlots(
        expert.workingHours.start,
        expert.workingHours.end
      );
      
      // Create availability slots for each time slot
      for (const slot of timeSlots) {
        allSlots.push({
          expertId: id,
          date: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false,
          isBlocked: false
        });
      }
    }
    
    // Remove any existing slots for these dates that aren't booked
    await AvailabilitySlot.deleteMany({
      expertId: id,
      date: { $gte: start, $lte: end },
      isBooked: false,
      isBlocked: false
    });
    
    // Insert the new slots
    const createdSlots = await AvailabilitySlot.insertMany(allSlots);
    
    res.status(201).json({
      message: `Successfully updated availability for ${dates.length} days`,
      totalSlots: createdSlots.length,
      dates: dates.map(date => date.toISOString().split('T')[0])
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};