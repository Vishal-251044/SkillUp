import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import Swal from "sweetalert2";
import "../screens_styles/Home.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setUserEmail] = useState(null); 
  const [, setToken] = useState(null); 

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");
    setUserEmail(email); 
    setToken(storedToken); 
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = async (course) => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (!storedToken || !storedEmail) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login before purchasing a course.",
        confirmButtonText: "Login",
      });
      return;
    }

    const options = {
      key: "rzp_test_oB6Z965by3wM4n", 
      amount: course.expectedPrice * 100, 
      currency: "INR",
      name: course.courseName,
      description: "Purchase course PDF",
      handler: async (response) => {
        try {
          const result = await axios.post(
            "http://localhost:5000/api/buy",
            {
              userEmail: storedEmail, 
              instructorName: course.instructorName,
              courseName: course.courseName,
              expectedPrice: course.expectedPrice,
              pdfName: course.pdfName,
            },
            {
              headers: { Authorization: `Bearer ${storedToken}` }, 
            }
          );

          if (result.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
              text: "You have successfully purchased the course!",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong. Please try again.",
            });
          }
        } catch (error) {
          console.error("Error saving purchase:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Payment successful, but failed to save the purchase.",
          });
        }
      },
      prefill: {
        email: storedEmail, 
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navbar />
      <div className="home-content">
        <h1 className="welcome-heading">Welcome to SkillUp Academy</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Course Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">
            <BiSearch size={24} />
          </button>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="courses-container">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course._id} className="course-card">
                  <h3>{course.courseName}</h3>
                  <p>
                    <b>Instructor: </b> {course.instructorName}
                  </p>
                  <p>
                    <b>Price: </b>
                    {course.expectedPrice
                      .toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      })
                      .replace("INR", "")}
                  </p>
                  <button
                    className="buy-btn"
                    onClick={() => handleBuyNow(course)}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            ) : (
              <p className="no_course">No courses found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
