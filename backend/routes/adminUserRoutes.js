import express from 'express';
import { getAllUsers, removeUser, updateUserAdminStatus } from '../controllers/adminUserController.js';

const router = express.Router();

router.get('/', getAllUsers);

router.delete('/:userId', removeUser);

router.patch('/:userId', updateUserAdminStatus);

export default router;
