import Course from "../models/Course.js";

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;  
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId);  
    res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    console.error("Error removing course:", error);
    res.status(500).json({ message: "Error removing course" });
  }
};
