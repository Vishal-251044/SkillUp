import React, { useState, useEffect } from 'react';
import '../screens_styles/Feedback.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';

const Feedback = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.user); 
        setName(response.data.user.name); 
        setSurname(response.data.user.surname); 

      } catch (err) {
        console.error("Error fetching profile:", err);
        setUser(null); 
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'You must be logged in to submit feedback.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        name,
        surname,
        email: user.email, 
        message,
      });

      Swal.fire({
        icon: 'success',
        title: 'Feedback sent successfully!',
        text: response.data.message,
      });

      setMessage('');
      setName(user.name);
      setSurname(user.surname);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="feedback-container">
        <h1>Feedback</h1>
        
        {!user ? (
          <div className="login-warning">
            <p className='feed-text'>Please log in first to submit feedback.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
