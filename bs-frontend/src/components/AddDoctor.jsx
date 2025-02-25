import React, { useState } from "react";

const DoctorForm = ({ onDoctorAdded }) => {
  const [name, setName] = useState("");
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, workingHours }),
      });

      if (!response.ok) {
        throw new Error("Failed to add doctor.");
      }

      const newDoctor = await response.json();

      setName(""); // Reset form
      setWorkingHours({ start: "09:00", end: "17:00" });
      alert("Doctor Added Successfully")
    } catch (err) {
      setError(err.message);
      alert("Adding Doctor Failed")
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      <h2 className="appointments-title">PrenatalCare Hub</h2>
    <div className="doctor-form-container">
      <h2>Add New Doctor</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="doctor-form">
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        <div className="time-inputs">
          <label>Start Time:</label>
          <input
            type="time"
            value={workingHours.start}
            onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
            required
            className="form-input"
            disabled
          />
          <label>End Time:</label>
          <input
            type="time"
            value={workingHours.end}
            onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
            required
            className="form-input"
            disabled
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default DoctorForm;
