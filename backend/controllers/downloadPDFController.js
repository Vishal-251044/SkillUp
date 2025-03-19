import Course from "../models/Course.js";

export const downloadPDF = async (req, res) => {
  try {
    const { pdfName } = req.params;

    const course = await Course.findOne({ pdfName });
    if (!course) {
      return res.status(404).json({ message: "PDF not found." });
    }

    // Send the Cloudinary URL instead of the file
    res.json({ pdfUrl: course.pdfUrl });
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ error: "Error downloading PDF" });
  }
};
