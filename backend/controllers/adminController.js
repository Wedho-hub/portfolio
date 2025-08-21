// Example admin controller for portfolio website
// You can expand this as you add user management, analytics, etc.
import Project from '../models/project.js';
import Blog from '../models/blog.js';
import Message from '../models/message.js';

// Example: Get all users (stub, for future user system)
export const getAllUsers = async (req, res) => {
  // If you add a User model, implement this
  res.json([]); // Placeholder
};

// Example: Delete a user (stub)
export const deleteUser = async (req, res) => {
  // If you add a User model, implement this
  res.json({ message: 'User deleted (stub)' });
};

// Example: Get portfolio stats
export const getStats = async (req, res) => {
  try {
    const [projectCount, blogCount, messageCount] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Message.countDocuments()
    ]);
    res.json({ projectCount, blogCount, messageCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
