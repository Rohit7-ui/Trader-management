import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure styles are applied

const Navbar = ({ memberName, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>Maharashtra Agro</h1>
      <div className="nav-right">
        <span className="user-info">
          <span className="status-dot"></span> {memberName || "Guest"}
        </span>
        {memberName && (
          <button className="logout-btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
