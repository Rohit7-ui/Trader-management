import React, { useEffect, useState } from "react";
import axios from "../Services/api"; // API call handler
import "./../style/TransectionList.css";

const TransectionList = ({ type }) => {
  const [transections, setTransections] = useState([]);

  useEffect(() => {
    axios.get(`/transections?type=${type}`).then((res) => setTransections(res.data));
  }, [type]);

  return (
    <div className="transection-list">
      {transections.map((txn, index) => (
        <div key={index} className="transection-item">
          <div className="user-icon">{txn.name[0]}</div>
          <div className="txn-details">
            <h4>{txn.name}</h4>
            <p>{txn.dueDate}</p>
          </div>
          <h4 className={txn.amount < 0 ? "debit" : "credit"}>₹{Math.abs(txn.amount)}</h4>
          {txn.amount < 0 ? <button className="request-btn">Request</button> : <button className="pay-btn">Pay</button>}
        </div>
      ))}
    </div>
  );
};

export default TransectionList;
