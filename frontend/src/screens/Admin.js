import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Course from "../components/AdminCourse";
import Swal from "sweetalert2";
import axios from "axios";
import "../screens_styles/Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const currentUserEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [removingCourse, setRemovingCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/yourcourses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDownload = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/yourcourses/download/${courseId}`
      );

      if (response.data.pdfUrl) {
        window.open(response.data.pdfUrl, "_blank"); // Open PDF in a new tab
      } else {
        Swal.fire("Error", "Failed to get PDF link", "error");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Swal.fire("Error", "Failed to download PDF", "error");
    }
  };

  const handleRemoveCourse = async (courseId) => {
    setRemovingCourse(courseId);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
        Swal.fire("Removed!", "The course has been removed.", "success");
      } catch (error) {
        console.error("Error removing course:", error);
        Swal.fire("Error!", "There was a problem removing the course.", "error");
      }
    }

    setRemovingCourse(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const allUsers = response.data;
        setUsers(allUsers.filter((user) => user.admin === 0));
        setAdmins(allUsers.filter((user) => user.admin === 1));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedbacks");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchUsers();
    fetchFeedbacks();
  }, []);

  const handleRemoveUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
        Swal.fire("Removed!", "The user has been removed.", "success");
      } catch (error) {
        console.error("Error removing user:", error);
        Swal.fire("Error!", "There was a problem removing the user.", "error");
      }
    }
  };

  const handleToggleAdmin = async (userId, isAdmin, userEmail) => {
    if (userEmail === currentUserEmail) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to change your status to User.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change my status!",
        cancelButtonText: "No, keep my status",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    const newAdminStatus = isAdmin ? 0 : 1;
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}`, {
        admin: newAdminStatus,
      });
      const response = await axios.get("http://localhost:5000/api/users");
      const allUsers = response.data;
      setUsers(allUsers.filter((user) => user.admin === 0));
      setAdmins(allUsers.filter((user) => user.admin === 1));
      Swal.fire(
        "Success!",
        `User status updated to ${newAdminStatus ? "Admin" : "User"}.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
      Swal.fire(
        "Error!",
        "There was a problem updating the user status.",
        "error"
      );
    }
  };

  const handleRemoveFeedback = async (feedbackId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/feedbacks/${feedbackId}`);
        setFeedbacks(
          feedbacks.filter((feedback) => feedback._id !== feedbackId)
        );
        Swal.fire("Removed!", "The feedback has been removed.", "success");
      } catch (error) {
        console.error("Error removing feedback:", error);
        Swal.fire(
          "Error!",
          "There was a problem removing the feedback.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <Course />

        <div className="yourcourse-section">
          <h2>All Courses</h2>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              {courses.length === 0 ? (
                <p className="no_data">No courses available</p>
              ) : (
                <div className="courses-list">
                  {courses.map((course) => (
                    <div key={course._id} className="course-item">
                      <h3>{course.courseName}</h3>
                      <p>
                        <b>Instructor: </b> {course.instructorName}
                      </p>
                      <p>
                        <b>Price: </b> ₹{course.expectedPrice}
                      </p>
                      <div className="yourcourse_buttons">
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveCourse(course._id)}
                          disabled={removingCourse === course._id}
                        >
                          {removingCourse === course._id ? "Removing..." : "Remove"}
                        </button>
                        <button className="download-btn" onClick={() => handleDownload(course._id)}>
                          Get PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Users Section */}
        <div className="users-section">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p className="no_data">No data available</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-item">
                <div className="info">
                  <span className="user-name">
                    <b>Name: </b> {user.name} {user.surname}
                  </span>
                  <span className="user-email">
                    <b>Email: </b> {user.email}
                  </span>
                </div>
                <div className="button-group">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="admin-btn"
                    onClick={() =>
                      handleToggleAdmin(user._id, user.admin, user.email)
                    }
                  >
                    Admin
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Admin Section */}
        <div className="admin-section">
          <h2>Admin</h2>
          {admins.length === 0 ? (
            <p className="no_data">No data available</p>
          ) : (
            admins.map((admin) => (
              <div key={admin._id} className="admin-item">
                <div className="info">
                  <span className="admin-name">
                    <b>Name: </b> {admin.name} {admin.surname}
                  </span>
                  <span className="admin-email">
                    <b>Email: </b> {admin.email}
                  </span>
                </div>
                <div className="button-group">
                  <button
                    className="user-btn"
                    onClick={() =>
                      handleToggleAdmin(admin._id, admin.admin, admin.email)
                    }
                  >
                    User
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <h2>Feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="no_data">No feedback available</p>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-item">
                <div className="feedback-content">
                  <span>
                    <b>Name: </b>
                    {feedback.name}
                  </span>
                  <span>
                    <b>Email: </b> {feedback.email}
                  </span>
                  <span>
                    <b>Message: </b> {feedback.message}
                  </span>
                </div>
                <button
                  className="feedback-remove-btn"
                  onClick={() => handleRemoveFeedback(feedback._id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
