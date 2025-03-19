import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../screens_styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);

        const courseResponse = await axios.get(
          `http://localhost:5000/api/users/purchased-courses/${response.data.user.email}`
        );

        setCourseData(courseResponse.data.matchedCourses || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-content">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <h1>
              Welcome, {user?.name} {user?.surname}
            </h1>
            <p>
              <b>Email: </b> {user?.email}
            </p>

            {user?.admin === 1 && (
              <p className="admin_Para">
                As an admin, all course PDFs are freely available on the admin
                page. If you want to buy, please proceed to purchase.
              </p>
            )}

            {/* Your Course Section */}
            <div className="course-section">
              <h2>Your Courses</h2>
              {error ? (
                <div className="course-box_err">
                  <p>{error}</p>
                </div>
              ) : courseData.length > 0 ? (
                courseData.map((course, index) => (
                  <div className="course-box" key={index}>
                    <div className="course-info">
                      <p>
                        <b>Course Name:</b> {course.courseName}
                      </p>
                      <p>
                        <b>Teacher:</b> {course.instructorName}
                      </p>
                      <p>
                        <b>Price:</b> ₹{course.expectedPrice}
                      </p>
                      <a
                        href={course.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="watch-button">Download PDF</button>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="course-box_err">
                  <p>No purchased courses found.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
