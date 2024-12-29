export const getProfile = (req, res) => {
  try {
    const { user } = req; 
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching profile. Please try again.' });
  }
};
