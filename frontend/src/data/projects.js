// src/data/projects.js
// Sample project data for portfolio

import portfolioPic from '../assets/portfolioPic.png';
import churchWebPic from '../assets/churchWebPic.png';
import toolTrackPic from '../assets/toolTrackPic.png';
import fogPic from '../assets/fogPic.png';

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
    title: 'Church Website',
    description: 'MERN-powered church platform with admin tools, blogs, and media sharing.',
    tech: ['React', 'Bootstrap', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    image: churchWebPic,
    demo: 'https://inkosiyezasdachurch.netlify.app',
    github: 'https://github.com/Wedho-hub/churchSite',
  },
  {
    title: 'Tool Tracker',
    description: 'A multi-user application to track and manage tools and equipment for teams. Features user roles, tool check-in/check-out, and reporting.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: toolTrackPic, 
    demo: 'https://tooltracking.netlify.app/',
    github: 'https://github.com/Wedho-hub/ToolTrack',
  },
  {
    title: 'FOG educare',
    description: 'A marketing and online presence website for FOG educare, built with modern web technologies to showcase services and facilitate contact.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: fogPic,
    demo: 'https://fogeducare.netlify.app',
    github: 'https://github.com/Wedho-hub/fogeducare',
  },
];

export default projects;
