import express from 'express';
import { getFeedbacks, deleteFeedback } from '../controllers/feedbackAdminController.js';

const router = express.Router();

router.get('/', getFeedbacks);
router.delete('/:id', deleteFeedback);

export default router;
