// server.js
// Main entry point for the backend API server

// ----------------------------
// 1. Import core dependencies
// ----------------------------
import express from 'express';           // Web framework for handling routes + middleware
import mongoose from 'mongoose';         // ODM for MongoDB (Object Data Modeling)
import cors from 'cors';                 // Allow cross-origin requests (frontend <-> backend)
import helmet from 'helmet';             // Security middleware (sets HTTP headers)
import morgan from 'morgan';             // Logs HTTP requests
import dotenv from 'dotenv';             // Loads .env variables into process.env
import rateLimit from 'express-rate-limit'; // Prevent brute force / DDoS attacks

// ----------------------------
// 2. Import routers (feature-based routing)
// ----------------------------
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Admin routes (all require authentication, handled later with JWT middleware)
import adminRoutes from './routes/adminRoutes.js';
import blogAdminRoutes from './routes/blogAdminRoutes.js';
import projectAdminRoutes from './routes/projectAdminRoutes.js';
import messageAdminRoutes from './routes/messageAdminRoutes.js';

// ----------------------------
// 3. Import utilities
// ----------------------------
import { z } from 'zod';                 // Schema validation library
import nodemailer from 'nodemailer';     // Email sending

// Load environment variables
dotenv.config();

// Database connection utility
import connectDB from './db/connectDB.js';
connectDB(); // Call the function to connect to MongoDB

// ----------------------------
// 4. Initialize Express app
// ----------------------------
const app = express();

// ----------------------------
// 5. Global middlewares
// ----------------------------
app.use(helmet()); // Protects against well-known HTTP header vulnerabilities

app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Frontend origin
  credentials: true,                     // Allow cookies/credentials
}));

app.use(morgan('dev')); // Log each request (method, status, response time)
app.use(express.json()); // Parse incoming JSON requests

// Rate limiting (avoid abuse: max 100 requests per 15min per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// ----------------------------
// 6. API Routes
// ----------------------------
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messageRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/admin/blogs', blogAdminRoutes);
app.use('/api/admin/projects', projectAdminRoutes);
app.use('/api/admin/messages', messageAdminRoutes);

// ----------------------------
// 7. Example Zod + Nodemailer (contact form endpoint)
// ----------------------------
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

app.post('/api/contact', async (req, res) => {
  // Validate request using Zod (safeParse avoids throwing errors)
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ 
      error: 'Invalid input', 
      details: result.error.errors 
    });
  }

  try {
    // Configure transporter (using Gmail - but for dev, Ethereal is safer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${result.data.name}`,
      text: `Email: ${result.data.email}\nMessage: ${result.data.message}`
    });

    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: err.message 
    });
  }
});

// ----------------------------
// 8. Error Handling Middleware
// ----------------------------
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

app.use(notFound);      // Handles unknown routes (404)
app.use(errorHandler);  // Handles all other errors

// ----------------------------
// 9. Start the server
// ----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
