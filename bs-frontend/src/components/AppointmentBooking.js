import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./index.css"

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  useEffect(() => {
    if (date) {
      axios
        .get(`http://localhost:5000/api/doctors/${doctorId}/slots?date=${date}`)
        .then((res) => setSlots(res.data.availableSlots))
        .catch((err) => console.error(err));
    }
  }, [date]);

  const bookAppointment = () => {
    axios
      .post("http://localhost:5000/api/appointments", {
        doctorId,
        date: `${date}`,
        time:`${selectedSlot}`,
        duration: 30,
        appointmentType,
        patientName,
      })
      .then(() => alert("Appointment booked!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="home-container">
      <h2>Book an Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select onChange={(e) => setSelectedSlot(e.target.value)}>
        <option>Select a slot</option>
        {slots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <select
        type="text"
        placeholder="Appointment Type"
        value={appointmentType}
        onChange={(e) => setAppointmentType(e.target.value)}
      >
        <option >Appointment Type</option>
        <option value="Routine Check Up">Routine Check Up</option>
      </select>
      <button onClick={bookAppointment}>Confirm</button>
    </div>
  );
};

export default AppointmentBooking;
