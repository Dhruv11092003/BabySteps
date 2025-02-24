const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctors", required: true },
  date: { type: String, required: true }, // Store only date in YYYY-MM-DD format
  time: { type: String, required: true }, // Store time separately
  duration: { type: Number, required: true },
  appointmentType: { type: String, required: true },
  patientName: { type: String, required: true },
  notes: { type: String },
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
