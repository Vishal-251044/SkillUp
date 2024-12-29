import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
      <Link to="/">
      <span className="logo-part skill">Skill</span>
      <span className="logo-part up">Up</span>
      </Link>
      </div>
      <div className="footer-text">
        <p>Skillup is an innovative online platform designed for course creation and learning. It allows instructors to upload and sell courses, while users can browse, enroll, and learn from a diverse range of subjects. With features like user profiles, course search, and a mobile-friendly interface, Skillup enhances the educational experience for both educators and learners.</p>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 Skillup. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
