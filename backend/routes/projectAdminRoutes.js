import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateRequest.js';
import { z } from 'zod';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

// Zod schema for project validation
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()).optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional()
});

const router = express.Router();


// All admin project routes are protected
router.get('/', authMiddleware, getProjects); // Fetch all projects (admin)
router.post('/', authMiddleware, validateBody(projectSchema), createProject);
router.put('/:id', authMiddleware, validateBody(projectSchema), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
