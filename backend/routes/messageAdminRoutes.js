import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// Only admin can view all messages or delete
router.get('/', authMiddleware, getMessages);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
