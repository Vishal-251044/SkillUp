import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    instructorName: { type: String, required: true },
    courseName: { type: String, required: true },
    expectedPrice: { type: Number, required: true },
    pdf: { type: Buffer, required: true }, 
    pdfName: { type: String, required: true }, 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
