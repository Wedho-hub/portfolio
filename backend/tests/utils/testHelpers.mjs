import Blog from '../../models/blog.js';
import Project from '../../models/project.js';
import Message from '../../models/message.js';

// Response validation helpers
export const expectSuccessResponse = (res, statusCode = 200) => {
  expect(res.status).toBe(statusCode);
  expect(res.body).toBeDefined();
};

export const expectArrayResponse = (res, expectedLength) => {
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body).toHaveLength(expectedLength);
};

export const expectObjectResponse = (res, expectedKeys = []) => {
  expect(typeof res.body).toBe('object');
  expect(res.body).not.toBeNull();
  
  expectedKeys.forEach(key => {
    expect(res.body).toHaveProperty(key);
  });
};

// Test data creation helpers
export const createTestBlog = async (overrides = {}) => {
  const blogData = {
    title: 'Test Blog Post',
    content: 'This is a test blog post content that is long enough to be valid.',
    excerpt: 'Test blog excerpt',
    tags: ['test', 'blog', 'nodejs'],
    image: 'test-blog-image.jpg',
    published: true,
    ...overrides
  };

  return await Blog.create(blogData);
};

export const createTestProject = async (overrides = {}) => {
  const projectData = {
    title: 'Test Project',
    description: 'This is a test project description that provides enough detail.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/testuser/test-project',
    liveUrl: 'https://test-project.vercel.app',
    image: 'test-project-image.jpg',
    featured: false,
    ...overrides
  };

  return await Project.create(projectData);
};

export const createTestMessage = async (overrides = {}) => {
  const messageData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message Subject',
    message: 'This is a test message content that is detailed enough.',
    read: false,
    ...overrides
  };

  return await Message.create(messageData);
};

// Error response validation
export const expectErrorResponse = (res, statusCode, errorMessage) => {
  expect(res.status).toBe(statusCode);
  expect(res.body).toHaveProperty('error');
  if (errorMessage) {
    expect(res.body.error).toContain(errorMessage);
  }
};

// Database state helpers
export const expectDatabaseCount = async (model, expectedCount) => {
  const count = await model.countDocuments();
  expect(count).toBe(expectedCount);
};

export const expectDatabaseHas = async (model, query) => {
  const exists = await model.exists(query);
  expect(exists).toBeTruthy();
};

export const expectDatabaseNotHas = async (model, query) => {
  const exists = await model.exists(query);
  expect(exists).toBeFalsy();
};
