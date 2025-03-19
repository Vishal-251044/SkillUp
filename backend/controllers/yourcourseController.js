import Course from '../models/Course.js';

// Get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};

// Get Cloudinary PDF URL for download
export const downloadPDF = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ pdfUrl: course.pdfUrl }); 
    } catch (error) {
        console.error('Error fetching PDF URL:', error);
        res.status(500).json({ message: 'Error fetching PDF URL' });
    }
};
