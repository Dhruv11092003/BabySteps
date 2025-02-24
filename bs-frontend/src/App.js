import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import AppointmentBooking from "./components/AppointmentBooking";
import AppointmentList from "./components/AppointmentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/appointments/:doctorId" element={<AppointmentBooking />} />
        <Route path="/my-appointments" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}

export default App;