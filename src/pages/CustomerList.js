import React, { useState, useEffect } from "react";
import "./CustomerList";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", area: "", contact: "" });

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.area || !newCustomer.contact) {
      alert("Please fill all fields!");
      return;
    }
    if (newCustomer.contact.length !== 10 || isNaN(newCustomer.contact)) {
      alert("Please enter a valid 10-digit contact number!");
      return;
    }

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));

    setNewCustomer({ name: "", area: "", contact: "" });
  };

  const removeCustomer = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <div className="customer-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Area"
          value={newCustomer.area}
          onChange={(e) => setNewCustomer({ ...newCustomer, area: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={newCustomer.contact}
          onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
        />
        <button className="add-btn" onClick={addCustomer}>+ Add Customer</button>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Customer Name</th>
            <th>Area</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.area}</td>
                <td>{customer.contact}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeCustomer(index)}>🗑 Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No customers added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
