import Course from '../models/Course.js';
import path from 'path';
import fs from 'fs';

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

// Download PDF
export const downloadPDF = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        const tempPdfPath = path.join(uploadsDir, course.pdfName);

        fs.writeFile(tempPdfPath, course.pdf, (err) => {
            if (err) {
                console.error('Error writing PDF file:', err);
                return res.status(500).json({ message: 'Error writing PDF file' });
            }

            res.download(tempPdfPath, course.pdfName, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    return res.status(500).json({ message: 'Error sending PDF file' });
                }

                fs.unlink(tempPdfPath, (err) => {
                    if (err) {
                        console.error('Error deleting temporary PDF file:', err);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ message: 'Error downloading PDF' });
    }
};
