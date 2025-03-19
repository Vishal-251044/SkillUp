import Feedback from '../models/Feedback.js';

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks." });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback." });
  }
};
