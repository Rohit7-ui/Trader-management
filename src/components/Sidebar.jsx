import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/CreateBill">📝 Inventory</Link></li>
        <li><Link to="/take-orders">📦 Take Orders</Link></li>
        <li><Link to="/send-reminder">🔔 Send Reminder</Link></li>
        <li><Link to="/payment-history">💰 Payment History</Link></li>
        <li><Link to="/customer-List">📋 Customer List</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
