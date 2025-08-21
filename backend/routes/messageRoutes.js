import express from 'express';
import {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getMessages);
router.get('/:id', getMessageById);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

export default router;
