import { useEffect, useState } from "react";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import { ClipLoader } from "react-spinners";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all appointments
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URI}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.appointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URI}/appointments/${id}`, { method: "DELETE" });
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert("Appointment Deleted");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Appointment Deletion Failed");
    }
  };

  // Open modal for updating
  const openUpdateModal = (id) => {
    setSelectedAppointmentId(id);
  };

  // Close modal
  const closeUpdateModal = () => {
    setSelectedAppointmentId(null);
  };

  // Update state after appointment update
  const handleUpdate = (id, updatedData) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment._id === id ? { ...appointment, ...updatedData } : appointment
      )
    );
  };

  return (
    <div className="Appointment-container">
      <h2 className="appointments-title">Appointments List</h2>

      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <h3>{appointment.patientName}</h3>
              <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Duration:</strong> {appointment.duration} mins</p>
              <p><strong>Type:</strong> {appointment.appointmentType}</p>
              <p><strong>Status:</strong> {appointment.status || "Pending"}</p>
              <div className="appointment-actions">
                <button onClick={() => openUpdateModal(appointment._id)} className="update-btn">
                  Update
                </button>
                <button onClick={() => deleteAppointment(appointment._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointmentId && (
        <UpdateAppointmentModal
          appointmentId={selectedAppointmentId}
          onClose={closeUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
