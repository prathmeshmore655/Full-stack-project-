import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaEnvelope, FaIdCard } from "react-icons/fa";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find(row => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };

  const csrfToken = getCSRFToken();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8080/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      if (data.status === 201) {
        navigate("/login"); 
      } else {
        setErrorMessage(data.message || "Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Server error! Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center p-2">{errorMessage}</div>
        )}

        <form>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <div className="input-group">
              <span className="input-group-text"><FaIdCard /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <div className="input-group">
              <span className="input-group-text"><FaIdCard /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Username:</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100" onClick={handleSignup}>
            Sign Up
          </button>

          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary w-100" onClick={() => navigate("/login")}>
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
