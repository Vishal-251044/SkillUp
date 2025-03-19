import express from 'express';
import { getCourses, downloadPDF } from '../controllers/yourcourseController.js';

const router = express.Router();

router.get('/', getCourses); 
router.get('/download/:id', downloadPDF); 

export default router;
