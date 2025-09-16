
import Blog from '../models/blog.js';
// Utility to generate slug from title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric except -
    .replace(/-+/g, '-')             // Replace multiple - with single -
    .replace(/^-+|-+$/g, '');        // Trim - from start/end
}

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    let { title, slug, ...rest } = req.body;
    if (!slug || !slug.trim()) {
      slug = slugify(title || '');
    }
    // Ensure slug is not empty after slugify
    if (!slug) {
      return res.status(400).json({ error: 'Slug could not be generated from title.' });
    }
    const newBlog = new Blog({ title, slug, ...rest });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    let { title, slug, ...rest } = req.body;
    if (!slug || !slug.trim()) {
      slug = slugify(title || '');
    }
    if (!slug) {
      return res.status(400).json({ error: 'Slug could not be generated from title.' });
    }
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, slug, ...rest },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
