import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const csrfToken = document.cookie.split('=')[1];

  // Fetch Wishlist Items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:8000/API/wishlist-items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWishlist(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [csrfToken]);

  // Show Modal and Set Selected Product
  const handleOpenModal = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
    setAddress('');
  };

  // Submit Add to Cart
  const handleSubmitAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/API/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          product: selectedProduct,
          quantity: quantity,
          address: address,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart.');
      }
  
      const data = await response.json();
      
      
      handleCloseModal(); // Close modal only on success
      alert(data.message); // Show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message); // Show error message
    }
  };
  
  // Remove from Wishlist Function
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/API/remove-from-wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove from wishlist. Status: ${response.status}`);
      }

      // Update the UI after deletion
      setWishlist(wishlist.filter((item) => item.id !== productId));
      alert('Item removed from wishlist!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty!</p>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div className="col-md-4 col-sm-6" key={item.id}>
              <div className="card shadow-sm h-100" style={{ padding : '30px' }}
              >
                <img
                  src={`http://localhost:8000${item.product.product_image}`}
                  className="card-img-top"
                  alt={item.product.product_name}
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.product.product_name}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {item.product.description}
                  </p>

                  <br />

                  <hr />

                  <br />
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleOpenModal(item.product.id)}
                      style={{ width : '130px' , padding : '15px' }}

                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      style={{ width : '130px' , padding : '15px' }}

                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add to Cart</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitAddToCart}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
