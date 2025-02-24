import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.patientName} - {appt.appointmentType} on {new Date(appt.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
