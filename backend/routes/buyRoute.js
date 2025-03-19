import express from 'express';
import { handleBuyCourse } from '../controllers/buyController.js';

const router = express.Router();

router.post('/buy', handleBuyCourse);

export default router;
