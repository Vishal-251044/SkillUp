import Course from '../models/Course.js';

// ✅ Ensure getCourses is correctly exported
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// ✅ Ensure addCourse is correctly exported
export const addCourse = async (req, res) => {
  try {
    const { instructorName, courseName, expectedPrice, pdfName } = req.body;
    const pdfUrl = req.file.path; // Cloudinary URL

    const newCourse = new Course({
      instructorName,
      courseName,
      expectedPrice,
      pdfName,
      pdfUrl,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully!', pdfUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course' });
  }
};
