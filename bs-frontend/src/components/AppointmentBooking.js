import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./index.css";

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
        .get(
          `${process.env.REACT_APP_BASE_URI}/doctors/${doctorId}/slots?date=${date}`
        )
        .then((res) => setSlots(res.data.availableSlots))
        .catch((err) => console.error(err));
    }
  }, [date]);

  const bookAppointment = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URI}/appointments`, {
        doctorId,
        date: `${date}`,
        time: `${selectedSlot}`,
        duration: 30,
        appointmentType,
        patientName,
      })
      .then(() => alert("Appointment booked!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="home-container">
      <h1 className="main-heading">PrenatalCare Hub</h1>
      <div className="appointment-form">
        <h2 className="form-title">Book an Appointment</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Today's date
          max={
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          } // 7 days from today
          className="form-input"
        />

        <select
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="form-select"
        >
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
          className="form-input"
        />

        <select
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          className="form-select"
        >
          <option>Appointment Type</option>
          <option value="Routine Check Up">Routine Check Up</option>
          <option value="Consultation">Consultation</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        <button onClick={bookAppointment} className="form-button">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
