// App.jsx
// Main app layout with routing, Navbar, and Footer
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Blogs from './pages/Blogs/Blogs';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
// Admin pages
import Dashboard from './AdminPages/Dashboard/Dashboard';
import ManageBlogs from './AdminPages/ManageBlogs/ManageBlogs';
import ManageProjects from './AdminPages/ManageProjects/ManageProjects';
import ManageMessages from './AdminPages/ManageMessages/ManageMessages';
import Login from './AdminPages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  // Dynamically set basename for BrowserRouter (for subdirectory deploys)
  const getBaseName = () => {
    // Use VITE_PUBLIC_URL or fallback to "/"
    return import.meta.env.BASE_URL || '/';
  };

  return (
    <Router basename={getBaseName()}>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/admin/blogs" element={
              <ProtectedRoute><ManageBlogs /></ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute><ManageProjects /></ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute><ManageMessages /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
