import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateRequest.js';
import { z } from 'zod';
import {
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

// Zod schema for blog validation
const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  author: z.string().optional(),
  image: z.string().optional()
});

const router = express.Router();

// All admin blog routes are protected and validated
router.post('/', authMiddleware, validateBody(blogSchema), createBlog);
router.put('/:id', authMiddleware, validateBody(blogSchema), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
