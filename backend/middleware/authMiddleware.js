import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const decoded = jwt.verify(token, secretKey); 
    const user = await User.findById(decoded.userId).select('-password'); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user; 
    next(); 
  } catch (error) {
    console.error('JWT error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
