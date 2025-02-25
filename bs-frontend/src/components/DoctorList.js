import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URI}/doctors`)
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <LandingPage />
      <div className="doctor-section" id="doctors">
        <h2 className="main-heading">Select a Doctor</h2>

        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#007bff" size={50} />
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ul className="list-container">
            {doctors.map((doctor) => (
              <li key={doctor._id}>
                <p>{doctor.name} <br/> Working Hours: {doctor.workingHours.start} to {doctor.workingHours.end}</p>
                <button onClick={() => navigate(`/appointments/${doctor._id}`)}>Book Appointment</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
