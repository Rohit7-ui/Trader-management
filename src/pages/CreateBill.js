import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import "./CreateBill.css";

const CreateBill = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [nos, setNos] = useState(1);
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState("");
  const [total, setTotal] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    setDateTime(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const calculatedTotal = weight * rate;
    setTotal(calculatedTotal);
    setFinalAmount(calculatedTotal + Number(previousBalance) - receivedAmount);
  }, [weight, rate, previousBalance, receivedAmount]);

  const validateAndSubmit = () => {
    if (contactNumber.length !== 10) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }
    if (total < 0 || previousBalance < 0 || receivedAmount < 0) {
      alert("Amounts cannot be negative.");
      return;
    }
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Maharashtra Agro Heading
    doc.setFontSize(18);
    doc.text("Maharashtra Agro - Bill", 20, 10);
  
    // Contact Information & Address
    doc.setFontSize(12);
    doc.text("Contact: +91 9876543210", 20, 20);
    doc.text("Email: info@maharashtraagro.com", 20, 26);
    doc.text("Address: 123, Agro Street, Pune, Maharashtra, India", 20, 32);
    doc.text(`Logged-in Member: ${customerName}`, 20, 38); // Display Logged-in Member
  
    // Add table after the header details
    autoTable(doc, {
      startY: 45, // Move table below header
      head: [["Field", "Value"]],
      body: [
        ["Customer Name", customerName],
        ["Contact Number", contactNumber],
        ["Date & Time", dateTime],
        ["NOS", nos],
        ["Weight", weight],
        ["Rate", rate],
        ["Total", `₹${total}`],
        ["Previous Balance", `₹${previousBalance}`],
        ["Received Amount", `₹${receivedAmount}`],
        ["Payment Method", paymentMethod],
        ["Final Amount", `₹${finalAmount}`],
      ],
    });
  
    // Save PDF
    doc.save("bill.pdf");
  };
  
  

  return (
    <div className="create-bill-container">
      <h2>Create Bill</h2>
      <div className="form-group">
        <label>Customer Name</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Contact Number</label>
        <input type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Date & Time</label>
        <input type="text" value={dateTime} readOnly />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>NOS</label>
          <input type="number" value={nos} onChange={(e) => setNos(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Rate</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
      </div>

      <div className="form-group total-box">
        <label>Total</label>
        <input type="text" value={`₹ ${total}`} readOnly />
      </div>

      <div className="form-group">
        <label>Previous Balance</label>
        <input type="number" value={previousBalance} onChange={(e) => setPreviousBalance(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Received Amount</label>
        <input type="number" value={receivedAmount} onChange={(e) => setReceivedAmount(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Payment Method</label>
        <div className="payment-options">
          <label>
            <input type="radio" value="Cash" checked={paymentMethod === "Cash"} onChange={() => setPaymentMethod("Cash")} /> Cash
          </label>
          <label>
            <input type="radio" value="Online" checked={paymentMethod === "Online"} onChange={() => setPaymentMethod("Online")} /> Online
          </label>
        </div>
      </div>

      <div className="form-group total-box">
        <label>Final Amount</label>
        <input type="text" value={`₹ ${finalAmount}`} readOnly />
      </div>

      <button className="submit-btn" onClick={validateAndSubmit}>Submit & Generate PDF</button>
    </div>
  );
};

export default CreateBill;
