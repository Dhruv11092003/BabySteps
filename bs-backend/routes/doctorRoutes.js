const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/doctor");
const router = express.Router();

// Function to generate availability for the next 7 days
const generateAvailability = () => {
  const availability = new Map();
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD

    const slots = {};
    timeSlots.forEach((time) => (slots[time] = true)); // Mark all slots as available

    availability.set(formattedDate, slots);
  }
  return availability;
};

// Function to update availability daily
const updateAvailability = async () => {
  try {
    const doctors = await Doctor.find();

    for (const doctor of doctors) {
      let availability = new Map(Object.entries(doctor.availability));

      // Get all dates and sort them
      let dates = Array.from(availability.keys()).sort();

      const today = new Date().toISOString().split("T")[0];

      // Remove past dates
      dates = dates.filter((date) => date >= today);
      
      // Add a new date at the end if needed
      if (dates.length < 7) {
        const lastDate = new Date(dates[dates.length - 1]);
        lastDate.setDate(lastDate.getDate() + 1);
        const newDate = lastDate.toISOString().split("T")[0];

        const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
        const newSlots = {};
        timeSlots.forEach((time) => (newSlots[time] = true));

        availability.set(newDate, newSlots);
      }

      // Save the updated availability
      doctor.availability = Object.fromEntries(availability);
      await doctor.save();
    }

    console.log("Doctor availability updated successfully.");
  } catch (err) {
    console.error("Error updating doctor availability:", err);
  }
};

// Run `updateAvailability` every day at midnight (server-side automation)
setInterval(updateAvailability, 24 * 60 * 60 * 1000);

// Route to create a new doctor with initial availability
router.post("/", async (req, res) => {
  try {
    const { name, workingHours } = req.body;

    // Generate default availability for the next 7 days
    const availability = generateAvailability();

    const doctor = new Doctor({
      name,
      workingHours,
      availability: Object.fromEntries(availability), // Convert Map to Object before saving
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get available slots for a doctor on a specific date
router.get("/:id/slots", async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const dateInString = `${date}`;
    const availableSlots = doctor.availability.get(dateInString) || {};
    // console.log(availableSlots)
    slots=[]
    for (const [time, available] of availableSlots) {
      if (available) {
        slots.push(time)
      }
    }
    
    res.json({ availableSlots: slots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
