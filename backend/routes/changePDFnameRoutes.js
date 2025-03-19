import express from 'express';
import { checkPdfName } from '../controllers/changePDFnameController.js';

const router = express.Router();

router.post('/check-pdf-name', checkPdfName);

export default router;
