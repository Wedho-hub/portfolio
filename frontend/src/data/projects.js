// src/data/projects.js
// Sample project data for portfolio

import portfolioPic from '../assets/portfolioPic.png';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio site built with React, Vite, and Bootstrap. Features admin dashboard, blog, and contact form.',
    tech: ['React', 'Vite', 'Bootstrap', 'Node.js', 'MongoDB'],
    image: portfolioPic,
    demo: 'https://wedhoportfolio.netlify.app',
    github: 'https://github.com/Wedho-hub/portfolio',
  },
  {
    title: 'E-Commerce Store',
    description: 'Full-stack e-commerce platform with product management, cart, and secure checkout.',
    tech: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://placehold.co/400x250?text=E-Commerce',
    demo: 'https://your-ecommerce-demo.com',
    github: 'https://github.com/yourusername/ecommerce',
  },
  {
    title: 'Blog Platform',
    description: 'A multi-user blog platform with markdown support, comments, and admin moderation.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://placehold.co/400x250?text=Blog',
    demo: 'https://your-blog-demo.com',
    github: 'https://github.com/yourusername/blog',
  },
  {
    title: 'Task Manager App',
    description: 'A productivity app for managing daily tasks, deadlines, and reminders. Mobile-friendly UI.',
    tech: ['React', 'Bootstrap', 'Node.js'],
    image: 'https://placehold.co/400x250?text=Task+Manager',
    demo: 'https://your-taskmanager-demo.com',
    github: 'https://github.com/yourusername/taskmanager',
  },
];

export default projects;
