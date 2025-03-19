import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../screens_styles/Login.css";
import Swal from "sweetalert2";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSwitchForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Passwords do not match',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          timer: 2000,
          timerProgressBar: true,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Account created successfully',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.error("Registration error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || 'Error creating account. Please try again.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", response.data.admin);
        localStorage.setItem("email", formData.email);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Login successful',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.href = "/profile";
        }, 1800);
      } catch (err) {
        console.error("Login error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || 'Invalid credentials. Please try again.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="login-content">
        {isRegistering ? (
          <div className="form-container">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : isRegistering ? "Create Account" : "Login"}
              </button>            </form>
            <p>
              Already have an account?{" "}
              <span
                onClick={handleSwitchForm}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </span>
            </p>
          </div>
        ) : (
          <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : isRegistering ? "Create Account" : "Login"}
              </button>            </form>
            <p>
              Don't have an account?{" "}
              <span
                onClick={handleSwitchForm}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Create Account
              </span>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
