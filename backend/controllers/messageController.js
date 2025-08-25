import Message from '../models/message.js';
import nodemailer from 'nodemailer';

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single message by ID
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new message
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reply to a message via email
export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, body } = req.body;
    if (!subject || !body) {
      return res.status(400).json({ error: 'Subject and body are required.' });
    }
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    // Set up nodemailer transporter (using Gmail or your configured provider)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send reply email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject,
      text: body,
    });

    res.json({ message: 'Reply sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
