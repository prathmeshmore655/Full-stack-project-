import React, { useState, useEffect } from 'react';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const csrfToken = document.cookie.split("=")[1];


  useEffect(() => {


    
    fetch('http://localhost:8000/API/offers-deals' , {

      method : 'GET',

      headers: {

        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,

      },

      credentials: "include",
      
    })
      .then((response) => response.json())
      .then((data) => {
          setOffers(data);
          setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching offers:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Exclusive Offers and Deals</h2>
      {loading ? (
        <p className="text-center">Loading offers...</p>
      ) : (
        <div className="row gy-4">
          {offers.map((offer) => (
            <div className="col-md-4" key={offer.id}>
              <div className="card h-100">
                <img 
                  src={`http://localhost:8000${offer.image}`} 
                  className="card-img-top" 
                  alt={offer.title} 
                  style={{  objectFit: 'contain' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{offer.title}</h5>
                  <p className="card-text">{offer.description}</p>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-primary">View Offer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
