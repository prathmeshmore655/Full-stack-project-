import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { Link } from 'react-router-dom';


export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("Books");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartDetails, setCartDetails] = useState({}); // Store product details in the form
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [address, setAddress] = useState(""); // Default address field
  const [cart_count , setCount ] = useState(0);

  const categories = ["Books", "Home & Kitchen", "Fashion", "Electronics"];

  // Fetch all products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const csrfToken = document.cookie.split("=")[1];
      const response = await fetch("http://localhost:8000/API/get_products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setAllProducts(data.data); // Store all products
      setCount(data.count);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products whenever the category or product list changes
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) => product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, allProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCartDetails(product); // Set product details for the modal
    setShowModal(true); // Show the modal
  };

  const handleModalSubmit = async () => {
    const csrfToken = document.cookie.split("=")[1];

    try {
      const response = await fetch("http://localhost:8000/API/add_to_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          product: cartDetails.id,
          quantity,
          address,
        }),
      });

      const data = await response.json();
      alert(data.message); // Notify the user of the response
      setShowModal(false); // Close the modal
      setCount(data.count);
      console.log("api count : " , data.count);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row">
        {/* Sidebar Filter */}
        <div className="col-md-3 mb-4">
          <div className="bg-light rounded-3 shadow-sm p-4">
            <h4 className="text-center mb-4">Select Category</h4>
            <div className="list-group">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-primary">
              Shop {selectedCategory && ` - ${selectedCategory}`}
            </h3>


            <Link to={'/cart'} className="nav-link">

            <button className="btn btn-outline-primary">
              <i className="bi bi-cart"></i> Cart ({cart_count})
            </button>

            </Link>


          </div>

          {/* Show Loading and Error */}
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="row">
            {/* Render product cards */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4" style={{display:"flex" , justifyContent : "center" }}>
                  <div className="card shadow-sm h-100">
                    <img
                      src={`http://localhost:8000${product.product_image}`}
                      className="card-img-top"
                      alt={product.product_name}
                      style={{ height: "200px", objectFit: "contain" , marginTop : "30px" }}
                    />



                    <br />

                    
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title text-truncate">
                        {product.product_name}
                      </h6>
                      <p className="card-text text-muted small mb-1">
                        {product.description}
                      </p>
                      <p className="card-text fw-bold text-success mb-2">
                        ₹{product.price}
                      </p>
                      <button
                        className="btn btn-primary w-100 btn-sm mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add to Cart */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleModalSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
