const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workingHours: { type: Object, required: true },
  availability: { type: Map, of: Map, default: {} }, // Store available slots per date {date: {time: true/false}}
});
module.exports = mongoose.model("doctors", DoctorSchema);