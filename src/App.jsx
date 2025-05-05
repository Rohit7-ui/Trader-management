// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar"; // Import Sidebar
// import Home from "./pages/Home";
// import CreateBill from "./pages/CreateBill";
// import TakeOrders from "./pages/TakeOrders";
// import SendReminder from "./pages/SendReminder";
// import PaymentHistory from "./pages/PaymentHistory";
// import Login from "./pages/Login";
// import "./App.css"; // Import App.css for layout fixes

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar memberName={user?.name || "Guest"} onLogout={() => setUser(null)} />
//         <div className="content-container">
//           {user && <Sidebar />} Sidebar appears only after login
//           <div className="main-content">
//             <Routes>
//               <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//               <Route path="/create-bill" element={user ? <CreateBill /> : <Navigate to="/login" />} />
//               <Route path="/take-orders" element={user ? <TakeOrders /> : <Navigate to="/login" />} />
//               <Route path="/send-reminder" element={user ? <SendReminder /> : <Navigate to="/login" />} />
//               <Route path="/payment-history" element={user ? <PaymentHistory /> : <Navigate to="/login" />} />
//               <Route path="/login" element={<Login onLogin={setUser} />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import Home from "./pages/Home";
import CreateBill from "./pages/CreateBill";
import TakeOrders from "./pages/TakeOrders";
import SendReminder from "./pages/SendReminder";
import PaymentHistory from "./pages/PaymentHistory";
import CustomerList from "./pages/CustomerList";
import Login from "./pages/Login";
import "./App.css"; // Import App.css for layout fixes

function App() {
  const [user, setUser] = useState(null); // Manages login state

  return (
    <Router>
      <div className="app-container">
        {/* Navbar - Always visible */}
        <Navbar memberName={user?.name || "Guest"} onLogout={() => setUser(null)} />

        <div className="content-container">
          {/* Sidebar - Only visible after login */}
          {user && <Sidebar />}

          <div className={`main-content ${user ? "logged-in" : ""}`}>
            <Routes>
              {/* Protected Routes - Redirects to login if user is not authenticated */}
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/CreateBill" element={user ? <CreateBill /> : <Navigate to="/login" />} />
              <Route path="/take-orders" element={user ? <TakeOrders /> : <Navigate to="/login" />} />
              <Route path="/send-reminder" element={user ? <SendReminder /> : <Navigate to="/login" />} />
              <Route path="/payment-history" element={user ? <PaymentHistory /> : <Navigate to="/login" />} />
              <Route path="/Customer-List" element={user ? <CustomerList /> : <Navigate to="/login" />} />

              {/* Login Route - Accessible to all */}
              <Route path="/login" element={<Login onLogin={setUser} />} />

              {/* Catch-all route for unknown URLs */}
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
