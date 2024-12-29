import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { instructorName, courseName, expectedPrice } = req.body;
    const pdf = req.file.buffer;
    const pdfName = req.file.originalname;

    const newCourse = new Course({
      instructorName,
      courseName,
      expectedPrice,
      pdf,
      pdfName,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course' });
  }
};
