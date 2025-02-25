import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import AppointmentBooking from "./components/AppointmentBooking";
import AppointmentList from "./components/AppointmentList";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/appointments/:doctorId" element={<AppointmentBooking />} />
        <Route path="/appointments" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}

export default App;