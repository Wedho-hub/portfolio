import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteMessage, getMessages, replyToMessage } from '../controllers/messageController.js';

const router = express.Router();

// Only admin can view all messages, delete, or reply
router.get('/', authMiddleware, getMessages);
router.delete('/:id', authMiddleware, deleteMessage);
router.post('/:id/reply', authMiddleware, replyToMessage);

export default router;
