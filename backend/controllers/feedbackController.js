import User from '../models/User.js';
import Feedback from '../models/Feedback.js'; 

export const sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please create an account first.' });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
    });

    await feedback.save(); 

    return res.status(200).json({ message: 'Feedback received successfully!' });
    
  } catch (error) {
    console.error('Error processing feedback:', error);
    return res.status(500).json({ message: 'Error sending feedback. Please try again.' });
  }
};
