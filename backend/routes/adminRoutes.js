import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllUsers, deleteUser, getStats, adminLogin } from '../controllers/adminController.js';

const router = express.Router();


// Admin login route (unprotected)
router.post('/login', adminLogin);

// Protect all admin routes with authMiddleware
router.use(authMiddleware);

// Example admin routes
router.get('/users', getAllUsers); // List all users (if you have a user system)
router.delete('/users/:id', deleteUser); // Delete a user
router.get('/stats', getStats); // Get portfolio stats (projects, blogs, messages count)

export default router;
