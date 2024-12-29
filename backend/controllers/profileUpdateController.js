import BuyPDF from "../models/BuyPDF.js";
import Course from "../models/Course.js";

export const fetchUserCourses = async (req, res) => {
  try {
    const { email } = req.params;

    const purchasedCourses = await BuyPDF.find({ userEmail: email });
    if (purchasedCourses.length === 0) {
      return res.status(404).json({ message: "No purchased course found." });
    }

    const matchedCourses = await Promise.all(
      purchasedCourses.map(async (purchase) => {
        return await Course.findOne({ pdfName: purchase.pdfName });
      })
    );

    const validCourses = matchedCourses.filter((course) => course !== null);

    res.status(200).json({ matchedCourses: validCourses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
