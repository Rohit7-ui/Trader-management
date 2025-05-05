import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      onLogin({ name: user.memberName });
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = () => {
    if (!memberName || !contactNumber || !registerUsername || !registerPassword) {
      alert("All fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.username === registerUsername);
    
    if (existingUser) {
      alert("Username already exists!");
      return;
    }

    const newUser = { memberName, contactNumber, username: registerUsername, password: registerPassword };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    setShowRegister(false);
  };

  return (
    <div className="login-container">
      {showRegister ? (
        <div className="register-form">
          <h2>Register</h2>
          <input type="text" placeholder="Member Name" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <p>Already have an account? <span onClick={() => setShowRegister(false)}>Login</span></p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>New user? <span onClick={() => setShowRegister(true)}>Create an account</span></p>
        </div>
      )}
    </div>
  );
};

export default Login;
