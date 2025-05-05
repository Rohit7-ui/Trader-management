import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !contact || !username || !password) {
      alert("Please fill all fields!");
      return;
    }

    const newUser = { name, contact, username, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Registration Successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input type="text" placeholder="Maharashtra Agro Member Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
      <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} style={styles.input} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      <button onClick={handleRegister} style={styles.button}>Register</button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    height: "80vh"
  },
  input: {
    width: "300px", padding: "10px", margin: "10px 0", fontSize: "16px",
    border: "1px solid #ccc", borderRadius: "5px"
  },
  button: {
    background: "#007bff", color: "white", padding: "10px", width: "320px",
    border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer"
  }
};

export default Register;
