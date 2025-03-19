import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
};

export const removeUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User removed successfully.' });
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ message: 'Error removing user.' });
  }
};

export const updateUserAdminStatus = async (req, res) => {
  const { userId } = req.params;
  const { admin } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { admin });
    res.status(200).json({ message: 'User status updated successfully.' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status.' });
  }
};
