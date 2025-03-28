import { Link, useNavigate } from "react-router-dom";
import "./index.css"

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
    <div className="header">
      <Link to="/" style={{textDecoration:"none"}}>
      <div className="logo-container">
      <h4 className="company-heading">PCH</h4>
      </div>
      </Link>
      <div>
      <button className="appointment-btn" onClick={() => navigate("/addDoctor")}>
        Add Doctor
      </button>
      <button className="appointment-btn" onClick={() => navigate("/appointments")}>
        All Appointments
      </button>
      </div>
    </div>
    </div>
  );
};

export default Header;
