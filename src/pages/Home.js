const Home = () => {
    const memberName = localStorage.getItem("memberName"); 
  
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.welcomeText}>Welcome, {memberName || "Guest"}! 👋</h2>
          <p style={styles.infoText}>Select an option from the sidebar to continue.</p>
        </div>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f4f8ff",
    },
    card: {
      background: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "400px",
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: "10px",
    },
    infoText: {
      fontSize: "16px",
      color: "#555",
    },
  };
  
  export default Home;
  
    