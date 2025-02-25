const LandingPage = () => (
  <div className="landing-container">
    <div>
      <div>
        <h1 className="main-heading">
          Welcome to <br />
          PrenatalCare Hub
        </h1>
        <p className="main-para">Book & Manage Doctor Appointments Instantly</p>
      </div>
      <div className="landing-btn-container">
        <a href="#doctors">
          <button type="button" className="appointment-btn">
            Get Appointment
          </button>
        </a>
      </div>
    </div>
    <img src="doctor.png" alt="doctor" className="landing-img" />
  </div>
);
export default LandingPage;
