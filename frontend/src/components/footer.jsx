import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4" id='foot'>
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">About EchoMarket</h5>
                        <p className="small">
                            EchoMarket brings you the best deals, top brands, and exclusive offers. Shop with confidence and discover the products you love.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home" className="text-light text-decoration-none">Home</Link></li>
                            <li><Link to="/shop" className="text-light text-decoration-none">Shop</Link></li>
                            <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-light text-decoration-none">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Follow Us</h5>
                        <div>
                            <Link href="#" className="text-light me-3"><i className="bi bi-facebook"></i></Link>
                            <Link href="#" className="text-light me-3"><i className="bi bi-twitter"></i></Link>
                            <Link href="#" className="text-light me-3"><i className="bi bi-instagram"></i></Link>
                            <Link href="#" className="text-light"><i className="bi bi-linkedin"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-3">
                    <p className="small mb-0">&copy; {new Date().getFullYear()} EchoMarket. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
