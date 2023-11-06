import express from 'express'; // Import express
import mongoose from 'mongoose';
import Subscriber from '../models/Subscriber'; // Import Subscriber model using ES6 syntax

const router = express.Router();

// Subscribe to the mailing list
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; // Export the router using ES6 syntax
