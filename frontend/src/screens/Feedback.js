import React, { useState } from 'react';
import '../screens_styles/Feedback.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';

const Feedback = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        name: userData.name,
        email: userData.email,
        message,
      });

      Swal.fire({
        icon: 'success',
        title: 'Feedback sent successfully!',
        text: response.data.message,
      });

      setMessage('');
      setUserData({ name: '', email: '' });

    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Account not found',
          text: 'Please create an account first to send feedback.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="feedback-container">
        <h1>Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
