const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/doctor");
const router = express.Router();

//get all appointments
router.get("/", async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.send({ appointments: appointment });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//add an appointment
router.post("/", async (req, res) => {
  const {
    doctorId,
    date,
    time,
    duration,
    appointmentType,
    patientName,
    notes,
  } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Convert Map to an object if needed
    let availabilityMap = doctor.availability || new Map();

    // Convert the map to a standard object if it's not already
    if (!(availabilityMap instanceof Map)) {
      availabilityMap = new Map(Object.entries(availabilityMap));
    }

    let availableSlots = availabilityMap.get(date) || new Map();

    // Check if slot is already booked
    if (availableSlots.get(time) === false) {
      return res.status(400).json({ error: "Slot is already booked" });
    }

    // Mark the slot as unavailable
    availableSlots.set(time, false);
    availabilityMap.set(date, availableSlots);

    // Convert Map back to an object before saving
    doctor.availability = Object.fromEntries(availabilityMap);
    await doctor.save();

    // Create a new appointment
    const newAppointment = new Appointment({
      doctorId,
      date,
      time,
      duration,
      appointmentType,
      patientName,
      notes,
    });
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//update an appointment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      doctorId,
      date,
      time,
      duration,
      appointmentType,
      patientName,
      notes,
    } = req.body;

    // Find the existing appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Find the doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    let appointmentDate = appointment.date;
    let appointmentTime = appointment.time;

    // If date or time is changing, process the availability update
    if (appointment.date !== date || appointment.time !== time) {
      let availabilityMap = doctor.availability || {};

      // Convert availability to Map if needed
      if (!(availabilityMap instanceof Map)) {
        availabilityMap = new Map(
          Object.entries(availabilityMap).map(([key, value]) => [
            key,
            new Map(Object.entries(value)),
          ])
        );
      }

      let availableSlots = availabilityMap.get(date) || new Map();

      // Check if the new slot is already booked
      if (availableSlots.get(time) === false) {
        return res
          .status(400)
          .json({ error: "Selected time slot is already booked" });
      }

      // Mark new slot as booked
      availableSlots.set(time, false);
      availabilityMap.set(date, availableSlots);

      // Free the old slot if different from the new date/time
      let oldSlots = availabilityMap.get(appointment.date) || new Map();
      oldSlots.set(appointment.time, true);
      availabilityMap.set(appointment.date, oldSlots);

      // Convert Map back to object before saving
      doctor.availability = Object.fromEntries(
        Array.from(availabilityMap, ([date, times]) => [
          date,
          Object.fromEntries(times),
        ])
      );

      await doctor.save();

      // Update appointment details
      appointment.date = date;
      appointment.time = time;
      appointment.duration = duration;
      appointment.appointmentType = appointmentType;
      appointment.patientName = patientName;
      appointment.notes = notes;

      await appointment.save();
    }

    res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//Delete Appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (appointment) {
      res.status(200).json({ message: "Appointment Deleted" });
    }else{
      res.status(400).json({ message: "Appointment With this ID is not Found" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//get Specific Appointment

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if(appointment){
    res.send({ appointment: appointment });
    }else{
      res.status(400).json({ message: "Appointment With this ID is not Found" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
