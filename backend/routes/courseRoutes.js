import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { addCourse, getCourses } from '../controllers/courseController.js'; 

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course_pdfs', 
    format: async () => 'pdf', 
    resource_type: 'raw', 
  },
});

const upload = multer({ storage });

router.get('/', getCourses); 
router.post('/add-course', upload.single('pdf'), addCourse);

export default router;
