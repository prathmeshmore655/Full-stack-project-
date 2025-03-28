import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Shop from './components/shop';
import About from './components/about';
import Contact from './components/contact';
import Cart from './components/cart';
import Account from './components/account';
import Wishlist from './components/wishlist';
import Help from './components/help';
import Offers from './components/offers';
import Home from './components/home';
import Footer from './components/footer';
import Auction from './components/auction';
import Sell from './components/sell';
import Login from './components/login';
import Signup from './components/Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />} {/* Show Navbar only when logged in */}

        <Routes>
          {/* Default route redirects to login if not authenticated */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path='/shop' element={isAuthenticated ? <Shop /> : <Navigate to="/" />} />
          <Route path='/about-us' element={isAuthenticated ? <About /> : <Navigate to="/" />} />
          <Route path='/contact-us' element={isAuthenticated ? <Contact /> : <Navigate to="/" />} />
          <Route path='/cart' element={isAuthenticated ? <Cart /> : <Navigate to="/" />} />
          {/* <Route path='/account' element={isAuthenticated ? <Account /> : <Navigate to="/" />} /> */}
          <Route path='/wishlist' element={isAuthenticated ? <Wishlist /> : <Navigate to="/" />} />
          <Route path='/help-support' element={isAuthenticated ? <Help /> : <Navigate to="/" />} />
          <Route path='/offers-deals' element={isAuthenticated ? <Offers /> : <Navigate to="/" />} />
          <Route path='/auction-table' element={isAuthenticated ? <Auction /> : <Navigate to="/" />} />
          <Route path='/seller-section' element={isAuthenticated ? <Sell /> : <Navigate to="/" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        </Routes>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
