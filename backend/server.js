import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; 
import userRoutes from './routes/userRoutes.js'; 
import bodyParser from 'body-parser';
import feedbackRoutes from './routes/feedbackRoutes.js'; 
import adminUserRoutes from './routes/adminUserRoutes.js';
import feedbackAdminRoutes from './routes/feedbackAdminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import yourCoursesRoutes from './routes/yourcourseRoutes.js';
import buyRoutes from './routes/buyRoute.js';
import RemoveCourseRoutes from './routes/RemoveCourseRoutes.js';
import changePDFnameRoutes from './routes/changePDFnameRoutes.js';
import profileUpdateRoutes from "./routes/profileUpdateRoutes.js";
import { downloadPDF } from "./controllers/downloadPDFController.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes); 
app.use('/api/users', adminUserRoutes);
app.use('/api/feedbacks', feedbackAdminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/yourcourses', yourCoursesRoutes);
app.use('/api', buyRoutes);
app.use('/api', RemoveCourseRoutes);
app.use('/api/courses', changePDFnameRoutes);
app.use("/api/users", profileUpdateRoutes);
app.get("/api/courses/download/:pdfName", downloadPDF);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;  

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

