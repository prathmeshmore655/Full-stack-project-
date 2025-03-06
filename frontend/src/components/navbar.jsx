import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar_root">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" style={{  display: 'flex',gap: '80px' , alignItems : 'center'}}>
                    
                    {/* Logo and Brand */}
                    <div className="d-flex align-items-center">
                        <Link to="/home" className="navbar-brand d-flex align-items-center">
                            <img src="/assests/logo.webp" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                            EchoMarket
                        </Link>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="navbar-toggler order-lg-3"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Offcanvas Menu */}
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* Navigation Links */}
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/shop" className="nav-link">Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about-us" className="nav-link">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact-us" className="nav-link">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/account" className="nav-link">Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/wishlist" className="nav-link">Wishlist</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/help-support" className="nav-link">Help/Support</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/offers-deals" className="nav-link">Offers/Deals</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/auction-table" className="nav-link">Auction Table</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/seller-section" className="nav-link">Sell </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Search Bar - Responsive */}
                    <div className="mx-auto d-flex">
                        <form className="d-flex w-100" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
