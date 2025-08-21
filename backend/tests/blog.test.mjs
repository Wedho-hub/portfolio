import request from 'supertest';
import { 
  setupTestDB, 
  teardownTestDB, 
  clearTestDB 
} from './setup/testSetup.mjs';
import { 
  createTestBlog, 
  expectSuccessResponse, 
  expectArrayResponse, 
  expectObjectResponse 
} from './utils/testHelpers.mjs';
import app from '../server.js';

describe('Blog API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe('GET /api/blogs', () => {
    it('should get all blogs (empty array when no blogs)', async () => {
      const res = await request(app).get('/api/blogs');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 0);
    });

    it('should get all blogs with data', async () => {
      await createTestBlog();
      await createTestBlog({ title: 'Second Blog' });
      
      const res = await request(app).get('/api/blogs');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 2);
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should get a specific blog by ID', async () => {
      const blog = await createTestBlog();
      
      const res = await request(app).get(`/api/blogs/${blog._id}`);
      expectSuccessResponse(res);
      expectObjectResponse(res, ['title', 'content', 'excerpt']);
      expect(res.body.title).toBe(blog.title);
    });

    it('should return 404 for non-existent blog', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/blogs/${nonExistentId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog post', async () => {
      const blogData = {
        title: 'Test Blog Post',
        content: 'This is test content for the blog post',
        excerpt: 'Test excerpt',
        tags: ['test', 'blog'],
        image: 'test-image.jpg',
        published: true
      };

      const res = await request(app)
        .post('/api/blogs')
        .send(blogData);

      expectSuccessResponse(res, 201);
      expect(res.body.title).toBe(blogData.title);
      expect(res.body.content).toBe(blogData.content);
      expect(res.body.tags).toEqual(blogData.tags);
    });

    it('should return 400 for invalid blog data', async () => {
      const invalidData = {
        title: '', // Empty title
        content: 'Valid content'
      };

      const res = await request(app)
        .post('/api/blogs')
        .send(invalidData);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update an existing blog', async () => {
      const blog = await createTestBlog();
      const updateData = {
        title: 'Updated Blog Title',
        content: 'Updated content'
      };

      const res = await request(app)
        .put(`/api/blogs/${blog._id}`)
        .send(updateData);

      expectSuccessResponse(res);
      expect(res.body.title).toBe(updateData.title);
      expect(res.body.content).toBe(updateData.content);
    });

    it('should return 404 for non-existent blog', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const updateData = { title: 'Updated Title' };

      const res = await request(app)
        .put(`/api/blogs/${nonExistentId}`)
        .send(updateData);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete a blog post', async () => {
      const blog = await createTestBlog();

      const res = await request(app)
        .delete(`/api/blogs/${blog._id}`);

      expectSuccessResponse(res);
      
      const getRes = await request(app).get(`/api/blogs/${blog._id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent blog', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/blogs/${nonExistentId}`);

      expect(res.status).toBe(404);
    });
  });
});
