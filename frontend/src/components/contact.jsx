import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const csrfToken = document.cookie.split("=")[1];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/API/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to send message");
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="contact-us">
      {/* Hero Section */}
      <div
        className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/assests/contact-us.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1,
          }}
        ></div>
        <h1 className="z-index-2 fw-bold">Contact Us</h1>
      </div>

      {/* Contact Form */}
      <div className="container my-5">
        <div className="row gy-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="col-lg-6" style={{display : "flex" , flexDirection : 'column' , alignItems : "center" , gap : '40px'}}>
            <h2 className="fw-bold mb-4">Contact Information</h2>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-telephone-fill text-primary me-3"></i>
                <span className="fw-medium">Phone:</span> +1 234 567 890
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-envelope-fill text-success me-3"></i>
                <span className="fw-medium">Email:</span> support@example.com
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-geo-alt-fill text-danger me-3"></i>
                <span className="fw-medium">Address:</span> 123 E-Commerce St.,
                City, Country
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="map-section my-5">
        <h2 className="text-center fw-bold mb-4">Find Us</h2>
        <div className="container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83957661753!2d77.06889935415437!3d28.52728034332912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d78e13c1db1%3A0x7e41ff0a6e62e741!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1701010101010!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            style={{ border: 0 }}
            title="Google Maps Location - Delhi, India"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
