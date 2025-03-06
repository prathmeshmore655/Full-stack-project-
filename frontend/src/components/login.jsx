import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa"; // Icons for better UI

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages
  const navigate = useNavigate();

  // Retrieve CSRF token correctly
  const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find(row => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };

  const csrfToken = getCSRFToken();
  console.log("CSRF Token:", csrfToken);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    console.log("Form submitted");

    try {
      console.log("Sending request...", email, password);

      const response = await fetch("http://127.0.0.1:8080/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response received:", data);

      if (data.status === 200) {
        setIsAuthenticated(true);
        navigate("/home"); // Redirect to Home page
      } else {
        setErrorMessage(data.message || "Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Server error! Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center p-2">{errorMessage}</div>
        )}

        <form>
          <div className="mb-3">
            <label className="form-label">Username :</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
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

          <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>

          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary w-100" onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </div>

          <div className="text-center mt-3">
            <div className="text-decoration-none">Forgot password?</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
