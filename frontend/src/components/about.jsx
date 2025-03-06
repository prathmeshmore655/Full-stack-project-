import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div
        className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: 'url("/assests/e-commerce.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dull overlay
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-semibold">About Us</h1>
          <p className="fs-4 mt-3 fw-medium">
            Discover our passion for quality and innovation
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-6">
            <img
              src="/assests/team.avif"
              alt="Our Story"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="col-md-6 ps-md-5 mt-4 mt-md-0">
            <h2 className="fw-bold mb-3 text-gradient" style={{color : '#00a6ff'}}>Our Journey</h2>
            <p className="text-muted fs-5">
              We started with a mission to revolutionize the e-commerce
              experience by delivering innovative, high-quality products to our
              customers. Over the years, we've grown into a brand that values
              excellence, sustainability, and community engagement.
            </p>
            <p className="text-muted fs-5">
              Our story is about people — our customers, our team, and the
              world we aim to impact positively.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-gradient mb-5">What We Stand For</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm rounded-4">
                <i className="bi bi-lightbulb display-3 text-primary mb-3"></i>
                <h5 className="fw-bold">Innovation</h5>
                <p className="text-muted">
                  Constantly exploring new ideas to enhance your shopping
                  experience.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm rounded-4">
                <i className="bi bi-globe display-3 text-success mb-3"></i>
                <h5 className="fw-bold">Sustainability</h5>
                <p className="text-muted">
                  Committed to eco-friendly practices for a better future.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 shadow-sm rounded-4">
                <i className="bi bi-people display-3 text-info mb-3"></i>
                <h5 className="fw-bold">Community</h5>
                <p className="text-muted">
                  Bringing people together and fostering meaningful connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div
        className="cta-section text-center text-white py-5"
        style={{
          backgroundColor: "#00a6ff",
        }}
      >
        <h2 className="fw-bold mb-3">Join Us on This Journey</h2>
        <p className="fs-5 mb-4">
          Become part of a community that values quality, innovation, and
          sustainability.
        </p>
        <a href="/shop" className="btn btn-light btn-lg">
          Explore Products
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
