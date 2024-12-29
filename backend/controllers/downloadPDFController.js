import Course from "../models/Course.js";

export const downloadPDF = async (req, res) => {
  try {
    const { pdfName } = req.params;

    const course = await Course.findOne({ pdfName });
    if (!course) {
      return res.status(404).json({ message: "PDF not found." });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${pdfName}`,
    });

    res.send(course.pdf); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
