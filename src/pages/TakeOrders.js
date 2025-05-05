
// import React, { useState, useEffect } from "react";
// import "./TakeOrders.css"; // Import CSS file

// const TakeOrder = () => {
//   const [showTable, setShowTable] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [dateTime, setDateTime] = useState("");

//   useEffect(() => {
//     setDateTime(new Date().toLocaleString());
//   }, []);

//   const addNewOrder = () => {
//     setOrders([...orders, { shopName: "", area: "", nos: 1, rate: 0 }]);
//   };

//   const updateOrder = (index, field, value) => {
//     const updatedOrders = [...orders];
//     updatedOrders[index][field] = value;
//     setOrders(updatedOrders);
//   };

//   const calculateTotal = (nos, rate) => nos * rate;

//   return (
//     <div className="take-order-container">
//       <h2>Take Order</h2>
//       <button className="create-order-btn" onClick={() => setShowTable(true)}>
//         Create Order
//       </button>

//       {showTable && (
//         <div className="order-table">
//           <p className="datetime">Order Date & Time: {dateTime}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Shop Name</th>
//                 <th>Area</th>
//                 <th>NOS</th>
//                 <th>Rate (₹)</th>
              
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Shop Name"
//                       value={order.shopName}
//                       onChange={(e) => updateOrder(index, "shopName", e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Area"
//                       value={order.area}
//                       onChange={(e) => updateOrder(index, "area", e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={order.nos}
//                       onChange={(e) => updateOrder(index, "nos", e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       min="0"
//                       value={order.rate}
//                       onChange={(e) => updateOrder(index, "rate", e.target.value)}
//                     />
//                   </td>
                  
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="add-row-btn" onClick={addNewOrder}>
//             + Add Row
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TakeOrder;


import React, { useState, useEffect } from "react";
import "./TakeOrders.css";

const TakeOrder = () => {
  const [showTable, setShowTable] = useState(false);
  const [orders, setOrders] = useState([]);
  const [savedOrders, setSavedOrders] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [viewingIndex, setViewingIndex] = useState(null);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    setDateTime(new Date().toLocaleString());

    // Load saved orders & remove expired ones
    const storedOrders = JSON.parse(localStorage.getItem("savedOrders")) || [];
    const filteredOrders = storedOrders.filter(order => {
      const orderDate = new Date(order.date);
      const twoDaysLater = new Date(orderDate);
      twoDaysLater.setDate(orderDate.getDate() + 2);
      return new Date() < twoDaysLater;
    });
    setSavedOrders(filteredOrders);
  }, []);

  const addNewOrder = () => {
    setOrders([...orders, { shopName: "", area: "", nos: 1, rate: 0 }]);
  };

  const updateOrder = (index, field, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][field] = value;
    setOrders(updatedOrders);
  };

  const saveOrder = () => {
    if (orders.length === 0) {
      alert("Please add at least one order before saving.");
      return;
    }

    const orderData = { date: dateTime, orders };
    const updatedSavedOrders = [...savedOrders, orderData];

    setSavedOrders(updatedSavedOrders);
    localStorage.setItem("savedOrders", JSON.stringify(updatedSavedOrders));

    alert("Order saved successfully!");
    setOrders([]);
    setShowTable(false);
  };

  const removeOrder = (index) => {
    const updatedSavedOrders = savedOrders.filter((_, i) => i !== index);
    setSavedOrders(updatedSavedOrders);
    localStorage.setItem("savedOrders", JSON.stringify(updatedSavedOrders));
  };

  const editOrder = (index) => {
    setOrders(savedOrders[index].orders);
    setEditingIndex(index);
    setShowTable(true);
  };

  const saveEditedOrder = () => {
    if (editingIndex !== null) {
      const updatedSavedOrders = [...savedOrders];
      updatedSavedOrders[editingIndex].orders = orders;
      setSavedOrders(updatedSavedOrders);
      localStorage.setItem("savedOrders", JSON.stringify(updatedSavedOrders));
      setEditingIndex(null);
      alert("Order updated successfully!");
      setShowTable(false);
    }
  };

  const toggleViewOrder = (index) => {
    setViewingIndex(viewingIndex === index ? null : index);
  };

  return (
    <div className="take-order-container">
      <h2>Take Order</h2>
      <button className="small-btn create-btn" onClick={() => setShowTable(true)}>
        Create Order
      </button>

      {showTable && (
        <div className="order-table">
          <p className="datetime">Order Date & Time: {dateTime}</p>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Shop Name</th>
                <th>Area</th>
                <th>NOS</th>
                <th>Rate (₹)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={order.shopName}
                      onChange={(e) => updateOrder(index, "shopName", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={order.area}
                      onChange={(e) => updateOrder(index, "area", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={order.nos}
                      onChange={(e) => updateOrder(index, "nos", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={order.rate}
                      onChange={(e) => updateOrder(index, "rate", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="small-btn add-row-btn" onClick={addNewOrder}>+ Add Row</button>
          {editingIndex !== null ? (
            <button className="small-btn save-btn" onClick={saveEditedOrder}>Save Changes</button>
          ) : (
            <button className="small-btn save-btn" onClick={saveOrder}>Save Order</button>
          )}
        </div>
      )}

      <h3>Saved Orders</h3>
      {savedOrders.length === 0 ? (
        <p>No saved orders available.</p>
      ) : (
        savedOrders.map((orderData, index) => (
          <div key={index} className="saved-order">
            <p><strong>Order Date:</strong> {orderData.date}</p>
            <button className="small-btn open-btn" onClick={() => toggleViewOrder(index)}>
              {viewingIndex === index ? "Close" : "Open"}
            </button>
            <button className="small-btn edit-btn" onClick={() => editOrder(index)}>✏ Edit</button>
            <button className="small-btn remove-btn" onClick={() => removeOrder(index)}>🗑 Remove</button>

            {viewingIndex === index && (
              <div className="order-list">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Shop Name</th>
                      <th>Area</th>
                      <th>NOS</th>
                      <th>Rate (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.orders.map((order, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{order.shopName}</td>
                        <td>{order.area}</td>
                        <td>{order.nos}</td>
                        <td>{order.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TakeOrder;
