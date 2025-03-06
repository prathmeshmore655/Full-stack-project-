import React from "react";

export default function HelpAndSupport() {
  return (
    <div className="help-support">
      {/* Hero Section */}
      <div
        className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/assests/help-support.jpg')",
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
          }}
        ></div>
        
      </div>

      {/* FAQ Section */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {[
            {
              question: "How do I track my order?",
              answer:
                "You can track your order by logging into your account and navigating to the 'Order History' section.",
            },
            {
              question: "What payment methods are accepted?",
              answer:
                "We accept all major credit cards, debit cards, UPI, and PayPal.",
            },
            {
              question: "Can I return a product?",
              answer:
                "Yes, you can return a product within 30 days of purchase. Visit the 'Returns & Refunds' section for details.",
            },
          ].map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <br />


      <hr />

      <br />
      

      {/* Contact Us Section */}
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4">Contact Us</h2>
        <div className="row gy-4">
          <div className="col-md-4 text-center">
            <i className="bi bi-telephone-fill text-primary display-4 mb-3"></i>
            <h5 className="fw-bold">Phone Support</h5>
            <p>Call us at +1 234 567 890</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-envelope-fill text-success display-4 mb-3"></i>
            <h5 className="fw-bold">Email Support</h5>
            <p>Email us at support@example.com</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-chat-dots-fill text-warning display-4 mb-3"></i>
            <h5 className="fw-bold">Live Chat</h5>
            <p>Chat with us 24/7 via our live chat feature.</p>
          </div>
        </div>
      </div>
</div>
  
)}
