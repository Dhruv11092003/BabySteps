import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URI}/doctors`)
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <LandingPage/>
      <div className="doctor-section" id="doctors">
      <h2 className="main-heading">Select a Doctor</h2>
      <ul className="list-container">
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <p>{doctor.name} <br/> Working Hours: {doctor.workingHours.start} to {doctor.workingHours.end}</p>
            <button onClick={() => navigate(`/appointments/${doctor._id}`)}>Book Appointment</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default DoctorList;