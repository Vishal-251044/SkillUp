import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminCourse.css';

const AdminCourse = () => {
    const [instructorName, setInstructorName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [expectedPrice, setExpectedPrice] = useState('');
    const [pdf, setPdf] = useState(null);
    const [pdfName, setPdfName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 50 * 1024 * 1024) {
            Swal.fire('Error', 'PDF size must be less than 50 MB', 'error');
            setPdf(null);
        } else {
            setPdf(file);
            setPdfName(file.name);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (expectedPrice <= 0) {
            Swal.fire('Error', 'Price cannot be zero or negative', 'error');
            setLoading(false);
            return;
        }

        try {
            const checkResponse = await axios.post('http://localhost:5000/api/courses/check-pdf-name', { pdfName });
            if (checkResponse.data.exists) {
                Swal.fire('Error', 'PDF name already exists, please rename the file.', 'error');
                setLoading(false);
                return;
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to check PDF name', 'error');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('instructorName', instructorName);
        formData.append('courseName', courseName);
        formData.append('expectedPrice', expectedPrice);
        formData.append('pdf', pdf);
        formData.append('pdfName', pdfName);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/courses/add-course',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            Swal.fire('Success', response.data.message, 'success');
            setInstructorName('');
            setCourseName('');
            setExpectedPrice('');
            setPdf(null);
            setPdfName('');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || 'Failed to add course', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <form className="course-form" onSubmit={handleAddCourse}>
                <h2>Add Course</h2>
                <input
                    type="text"
                    name="instructorName"
                    placeholder="Instructor Name"
                    className="input-field"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    className="input-field"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    name="expectedPrice"
                    placeholder="Expected Price"
                    className="input-field"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    required
                />
                <h4>Upload Course PDF:</h4>
                <input
                    type="file"
                    name="pdf"
                    accept="application/pdf"
                    className="input-file"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Adding..." : "Add Course"}
                </button>
            </form>
        </div >
    );
};

export default AdminCourse;
