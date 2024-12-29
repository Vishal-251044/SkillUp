import BuyPDF from '../models/BuyPDF.js';

export const handleBuyCourse = async (req, res) => {
  const { userEmail, instructorName, courseName, expectedPrice, pdfName } = req.body;

  try {
    const newPurchase = new BuyPDF({
      userEmail,
      instructorName,
      courseName,
      expectedPrice,
      pdfName,
    });

    await newPurchase.save();
    res.status(200).json({ message: "Purchase saved successfully." });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Failed to save the purchase." });
  }
};
