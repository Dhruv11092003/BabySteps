import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const UpdateAppointmentModal = ({ appointmentId, onClose, onUpdate }) => {
  const [Loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch appointment details when modal opens
  useEffect(() => {
    if (appointmentId) {
      fetch(`${process.env.REACT_APP_BASE_URI}/appointments/${appointmentId}`)
        .then((res) => res.json())
        .then((data) => {
          setAppointmentData(data.appointment);
        })
        .catch((err) =>
          console.error("Error fetching appointment details:", err)
        );
    }
  }, [appointmentId]);

  // Fetch available time slots when date or doctorId changes
  useEffect(() => {
    if (appointmentData?.date && appointmentData?.doctorId) {
      setLoadingSlots(true);
      fetch(
        `${process.env.REACT_APP_BASE_URI}/doctors/${appointmentData.doctorId}/slots?date=${appointmentData.date}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAvailableSlots(data.availableSlots || []);
          setLoadingSlots(false);
        })
        .catch((err) => {
          console.error("Error fetching time slots:", err);
          setLoadingSlots(false);
        });
    }
  }, [appointmentData?.date, appointmentData?.doctorId]);

  // Handle form input changes
  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update appointment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.ok) {
        onUpdate(appointmentId, appointmentData);
       
        alert("Update Successful");
        // setInterval(() => {
        //   onClose();
        // }, 2000);
        window.location.reload();

      } else {
        alert("Update Failed");
        console.error("Failed to update appointment");
      }
    } catch (error) {
      alert("Update Failed");
      console.error("Error updating appointment:", error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Appointment</h2>
        {appointmentData ? (
          <form onSubmit={handleSubmit}>
            <label>Patient Name:</label>
            <input
              type="text"
              name="patientName"
              value={appointmentData.patientName}
              onChange={handleChange}
              required
            />

            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={appointmentData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Today's date
              max={
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              } // 7 days from today
              required
            />

            <label>Available Time Slots:</label>
            {loadingSlots ? (
              <p>Loading slots...</p>
            ) : (
              <select
                name="time"
                value={appointmentData.time}
                onChange={handleChange}
                required
              >
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))
                ) : (
                  <option value="">No slots available</option>
                )}
              </select>
            )}

            <label>Duration (mins):</label>
            <input
              type="number"
              name="duration"
              value={appointmentData.duration}
              onChange={handleChange}
              required
            />

            <label>Type:</label>
            <select
              name="appointmentType"
              value={appointmentData.appointmentType}
              onChange={handleChange}
              required
            >
              <option value="Routine Check Up">Routine Check Up</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
            </select>


            <label>Notes:</label>
            <textarea
              name="notes"
              value={appointmentData.notes || ""}
              onChange={handleChange}
            ></textarea>

            <div className="modal-actions">
              {Loading ? (
                <button type="submit" className="update-btn">
                  <ClipLoader color="#5050d6fb" size={30} />
                </button>
              ) : (
                <button type="submit" className="update-btn">
                  Update
                </button>
              )}
              <button type="button" className="close-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p>Loading appointment details...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateAppointmentModal;
