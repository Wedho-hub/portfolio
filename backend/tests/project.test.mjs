import request from 'supertest';
import { 
  setupTestDB, 
  teardownTestDB, 
  clearTestDB 
} from './setup/testSetup.mjs';
import { 
  createTestProject, 
  expectSuccessResponse, 
  expectArrayResponse, 
  expectObjectResponse 
} from './utils/testHelpers.mjs';
import app from '../server.js';

describe('Project API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe('GET /api/projects', () => {
    it('should get all projects (empty array when no projects)', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 0);
    });

    it('should get all projects with data', async () => {
      await createTestProject();
      await createTestProject({ title: 'Second Project' });
      
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 2);
    });

    it('should filter projects by featured', async () => {
      await createTestProject({ featured: true });
      await createTestProject({ featured: false });
      
      const res = await request(app).get('/api/projects?featured=true');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 1);
      expect(res.body[0].featured).toBe(true);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should get a specific project by ID', async () => {
      const project = await createTestProject();
      
      const res = await request(app).get(`/api/projects/${project._id}`);
      expectSuccessResponse(res);
      expectObjectResponse(res, ['title', 'description', 'technologies', 'githubUrl', 'liveUrl']);
      expect(res.body.title).toBe(project.title);
    });

    it('should return 404 for non-existent project', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/projects/${nonExistentId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const projectData = {
        title: 'Test Project',
        description: 'Test project description',
        technologies: ['Node.js', 'React', 'MongoDB'],
        githubUrl: 'https://github.com/test/test-project',
        liveUrl: 'https://test-project.vercel.app',
        image: 'test-project.jpg',
        featured: true
      };

      const res = await request(app)
        .post('/api/projects')
        .send(projectData);

      expectSuccessResponse(res, 201);
      expect(res.body.title).toBe(projectData.title);
      expect(res.body.description).toBe(projectData.description);
      expect(res.body.technologies).toEqual(projectData.technologies);
    });

    it('should return 400 for invalid project data', async () => {
      const invalidData = {
        title: '', // Empty title
        description: 'Valid description'
      };

      const res = await request(app)
        .post('/api/projects')
        .send(invalidData);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update an existing project', async () => {
      const project = await createTestProject();
      const updateData = {
        title: 'Updated Project Title',
        description: 'Updated description',
        featured: false
      };

      const res = await request(app)
        .put(`/api/projects/${project._id}`)
        .send(updateData);

      expectSuccessResponse(res);
      expect(res.body.title).toBe(updateData.title);
      expect(res.body.description).toBe(updateData.description);
      expect(res.body.featured).toBe(updateData.featured);
    });

    it('should return 404 for non-existent project', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const updateData = { title: 'Updated Title' };

      const res = await request(app)
        .put(`/api/projects/${nonExistentId}`)
        .send(updateData);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project', async () => {
      const project = await createTestProject();

      const res = await request(app)
        .delete(`/api/projects/${project._id}`);

      expectSuccessResponse(res);
      
      const getRes = await request(app).get(`/api/projects/${project._id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent project', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/projects/${nonExistentId}`);

      expect(res.status).toBe(404);
    });
  });
});
