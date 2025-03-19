import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('admin'); 
    setIsLoggedIn(!!token); 
    setIsAdmin(adminStatus === '1'); 
  }, []);

  // Toggle the mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout function: clear token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('admin'); 
    setIsLoggedIn(false); 
    setIsAdmin(false); 
    navigate('/login'); 
  };

  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? "#000000" : "#ffffff",
  });

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-part skill">Skill</span>
          <span className="logo-part up">Up</span>
        </Link>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink style={navLinkStyles} to="/" onClick={toggleMobileMenu}>Home</NavLink>
        <NavLink style={navLinkStyles} to="/feedback" onClick={toggleMobileMenu}>Feedback</NavLink>
        {isLoggedIn ? (
          <div className="logged-in-links">
            {isAdmin && (
              <NavLink style={navLinkStyles} to="/admin" onClick={toggleMobileMenu}>Admin</NavLink>
            )}
            <NavLink style={navLinkStyles} to="/profile" onClick={toggleMobileMenu}>Profile</NavLink>
            <span onClick={handleLogout} className="logout-link">Logout</span>
          </div>
        ) : (
          <NavLink style={navLinkStyles} to="/login" onClick={toggleMobileMenu}>Login</NavLink>
        )}
      </div>

      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <span className="hamburger-icon">&#9776;</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
