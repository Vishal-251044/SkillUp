import Course from "../models/Course.js";
import cloudinary from "../config/cloudinary.js"; 

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Extract public_id from Cloudinary URL
    const pdfUrl = course.pdfUrl;
    const publicId = pdfUrl.split("/").pop().split(".")[0]; 
    // Remove file from Cloudinary
    await cloudinary.uploader.destroy(`course_pdfs/${publicId}`, { resource_type: "raw" });

    // Remove course from the database
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    console.error("Error removing course:", error);
    res.status(500).json({ message: "Error removing course" });
  }
};
