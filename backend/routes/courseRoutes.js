import express from 'express';
import multer from 'multer';
import { getCourses, addCourse } from '../controllers/courseController.js';

const router = express.Router();
const upload = multer();

router.get('/', getCourses);

router.post('/add-course', upload.single('pdf'), addCourse);

export default router;
