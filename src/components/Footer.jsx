import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer border-t border-subtle pt-16 pb-8">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon-small"></div>
            <span className="logo-text">GramVenture<span className="text-gradient">AI</span></span>
          </div>
          <p className="footer-tagline">Know Your Business Before You Borrow.</p>
        </div>
        
        <div className="footer-links-wrapper">
          <div className="footer-links-col">
            <h4>Navigation</h4>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h4>Action</h4>
            <div className="footer-links">
              <Link to="/input" className="footer-cta-link text-gradient">Start Analysis →</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GramVenture AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
