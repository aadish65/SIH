import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Features', path: '#features' },
    { name: 'How It Works', path: '#how-it-works' },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled glass-panel' : ''}`}>
      <div className="container navbar-container">
        
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">GramVenture<span className="text-gradient">AI</span></span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="navbar-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path.startsWith('#') ? link.path : undefined}
              onClick={link.path.startsWith('#') ? (e) => { e.preventDefault(); handleNavClick(link.path); } : undefined}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="analyze-badge">
            Analyze <ChevronDown size={14} />
          </Link>
          <div className="profile-avatar">
            <User size={16} className="text-emerald" />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
