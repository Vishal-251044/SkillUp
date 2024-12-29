import Course from '../models/Course.js';

export const checkPdfName = async (req, res) => {
    const { pdfName } = req.body;

    try {
        const existingCourse = await Course.findOne({ pdfName });
        if (existingCourse) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error checking PDF name' });
    }
};
