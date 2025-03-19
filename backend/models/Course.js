import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  instructorName: { type: String, required: true },
  courseName: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  pdfName: { type: String, required: true }, 
  pdfUrl: { type: String, required: true }, 
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
