import React, { useState } from "react";
import "./../style/PaymentHistory.css"; // Custom CSS
import TransectionList from "../pages/TransectionList";

const PaymentHistory = () => {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="payment-history-container">
      {/* Tabs for Customers & Suppliers */}
      <div className="tabs">
        <button className={activeTab === "customers" ? "active" : ""} onClick={() => setActiveTab("customers")}>
          Customers
        </button>
        <button className={activeTab === "suppliers" ? "active" : ""} onClick={() => setActiveTab("suppliers")}>
          Suppliers
        </button>
      </div>

      {/* Search & Filters */}
      <div className="search-filter-container">
        <input type="text" placeholder="Search Customers" />
        <button>Filter</button>
        <button>Sort</button>
      </div>

      {/* Summary Section */}
      <div className="summary-box">
        <div>
          <p>You will give</p>
          <h3 style={{ color: "green" }}>₹4,567</h3>
        </div>
        <div>
          <p>You will get</p>
          <h3 style={{ color: "red" }}>₹4,567</h3>
        </div>
        <button>View Report</button>
      </div>

      {/* Transection List */}
      <TransectionList type={activeTab} />
      
      {/* Floating Add Button */}
      <button className="add-customer-btn">+ Add Customer</button>
    </div>
  );
};

export default PaymentHistory;
