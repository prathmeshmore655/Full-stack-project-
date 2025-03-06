import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const csrfToken = document.cookie.split("=")[1];

  // Function to fetch cart details
  const fetchCartDetails = () => {
    fetch("http://localhost:8000/API/cart-details", {
      method: "GET",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Fetch cart details on component mount
  useEffect(() => {
    fetchCartDetails();
  }, []);

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (productId) => {
    fetch(`http://localhost:8000/API/remove-from-cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove item from cart");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        // Refetch cart details after successful removal
        fetchCartDetails();
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleAddToWishlist = (productId) => {
    fetch("http://localhost:8000/API/add-to-wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ id: productId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to wishlist");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8 mb-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h4 className="text-muted">Your cart is empty.</h4>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                className="card mb-3 shadow-sm border-1"
                key={item.id}
                style={{ borderRadius: "15px", padding: "30px" }}
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={`http://localhost:8000${item.product.product_image}`}
                      alt={item.product.product_name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{item.product.product_name}</h5>
                      <p className="card-text text-success fw-bold">
                        ₹{item.product.price || "N/A"}
                      </p>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Quantity:</span>
                        <input
                          type="number"
                          className="form-control w-25"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-end p-3">
                    <button
                      className="btn btn-danger btn-sm mb-2"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleAddToWishlist(item.product.id)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="col-md-4">
          <div className="bg-light p-4 rounded-3 shadow">
            <h5 className="text-center mb-3">Order Summary</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <p>Subtotal:</p>
              <p className="fw-bold">₹{calculateTotal()}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Shipping:</p>
              <p className="fw-bold">₹100</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Tax:</p>
              <p className="fw-bold">₹50</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="fw-bold">Total:</p>
              <p className="fw-bold text-primary">₹{calculateTotal() + 150}</p>
            </div>
            <button className="btn btn-primary w-100 mt-3">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
