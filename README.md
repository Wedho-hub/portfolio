# Portfolio Project

A modern, full-stack portfolio web application built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- Responsive, mobile-friendly design using Bootstrap
- Project and blog showcase
- Contact form with email integration
- Admin dashboard for managing content
- Authentication for admin routes
- RESTful API with MongoDB
- SEO-friendly meta tags

## Technologies Used
- Frontend: React, Vite, Bootstrap, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Email: Nodemailer
- Validation: Zod
- Testing: Jest, Supertest

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the `backend` folder and fill in your MongoDB URI, email credentials, etc.

5. **Run the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

6. **Run the frontend dev server:**
   ```bash
   cd ../frontend
   npm run dev
   ```

7. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## Folder Structure
```
portfolio/
  backend/      # Express API, MongoDB models, routes, controllers
  frontend/     # React app, components, pages, assets
```

## Deployment
- For production, build the frontend with `npm run build` and serve with a static server or integrate with the backend.
- Configure environment variables for production.

## License
MIT

---
*Feel free to customize this README for your own branding and project details!*
