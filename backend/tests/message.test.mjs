import request from 'supertest';
import { 
  setupTestDB, 
  teardownTestDB, 
  clearTestDB 
} from './setup/testSetup.mjs';
import { 
  createTestMessage, 
  expectSuccessResponse, 
  expectArrayResponse, 
  expectObjectResponse 
} from './utils/testHelpers.mjs';
import app from '../server.js';

describe('Message API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe('POST /api/messages', () => {
    it('should create a new message', async () => {
      const messageData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Message',
        message: 'This is a test message'
      };

      const res = await request(app)
        .post('/api/messages')
        .send(messageData);

      expectSuccessResponse(res, 201);
      expect(res.body.name).toBe(messageData.name);
      expect(res.body.email).toBe(messageData.email);
      expect(res.body.subject).toBe(messageData.subject);
      expect(res.body.message).toBe(messageData.message);
    });

    it('should return 400 for invalid message data', async () => {
      const invalidData = {
        name: '', // Empty name
        email: 'invalid-email',
        message: '' // Empty message
      };

      const res = await request(app)
        .post('/api/messages')
        .send(invalidData);

      expect(res.status).toBe(400);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteData = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing subject and message
      };

      const res = await request(app)
        .post('/api/messages')
        .send(incompleteData);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/messages', () => {
    it('should get all messages (empty array when no messages)', async () => {
      const res = await request(app).get('/api/messages');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 0);
    });

    it('should get all messages with data', async () => {
      await createTestMessage();
      await createTestMessage({ name: 'Jane Doe', email: 'jane@example.com' });
      
      const res = await request(app).get('/api/messages');
      expect(res.status).toBe(200);
      expectArrayResponse(res, 2);
    });
  });

  describe('GET /api/messages/:id', () => {
    it('should get a specific message by ID', async () => {
      const message = await createTestMessage();
      
      const res = await request(app).get(`/api/messages/${message._id}`);
      expectSuccessResponse(res);
      expectObjectResponse(res, ['name', 'email', 'subject', 'message']);
      expect(res.body.name).toBe(message.name);
    });

    it('should return 404 for non-existent message', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/messages/${nonExistentId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/messages/:id', () => {
    it('should update an existing message', async () => {
      const message = await createTestMessage();
      const updateData = {
        name: 'Updated Name',
        subject: 'Updated Subject',
        read: true
      };

      const res = await request(app)
        .put(`/api/messages/${message._id}`)
        .send(updateData);

      expectSuccessResponse(res);
      expect(res.body.name).toBe(updateData.name);
      expect(res.body.subject).toBe(updateData.subject);
      expect(res.body.read).toBe(true);
    });

    it('should return 404 for non-existent message', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const updateData = { name: 'Updated Name' };

      const res = await request(app)
        .put(`/api/messages/${nonExistentId}`)
        .send(updateData);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/messages/:id', () => {
    it('should delete a message', async () => {
      const message = await createTestMessage();

      const res = await request(app)
        .delete(`/api/messages/${message._id}`);

      expectSuccessResponse(res);
      
      const getRes = await request(app).get(`/api/messages/${message._id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent message', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/messages/${nonExistentId}`);

      expect(res.status).toBe(404);
    });
  });
});
