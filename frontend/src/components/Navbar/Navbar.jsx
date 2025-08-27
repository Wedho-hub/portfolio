// Navbar.jsx
// Responsive navigation bar using react-bootstrap
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import logo from '../../assets/logo.svg';
import './Navbar.css';


import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
	const navigate = useNavigate();

	// Check if admin is logged in (token exists)
	const isAdmin = !!localStorage.getItem('token');

	// Logout handler
	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/admin/login');
	};

		return (
			<Navbar
				expand="lg"
				sticky="top"
				className="shadow-sm custom-navbar"
				style={{ background: 'linear-gradient(90deg, #434db8ff 0%, #7181efff 100%)', color: '#fff' }}
			>
				<Container>
					{/* Brand/Logo */}
					<Navbar.Brand as={Link} to="/" className="fw-bold logo d-flex align-items-center">
						<img src={logo} alt="My Logo" width="64" height="64" style={{ marginRight: 12 }} />
						<span className="d-none d-md-inline" style={{ color: '#fff', fontWeight: 700, fontSize: '1.7rem', letterSpacing: '2px' }}>MyPortfolio</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="main-navbar-nav" />
					<Navbar.Collapse id="main-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
							<Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
							<Nav.Link as={Link} to="/projects" className="nav-link-custom">Projects</Nav.Link>
							<Nav.Link as={Link} to="/blogs" className="nav-link-custom">Blogs</Nav.Link>
							<Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
							<NavDropdown title="Admin" id="admin-nav-dropdown" menuVariant="dark">
								<NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/admin/blogs">Manage Blogs</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/admin/projects">Manage Projects</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/admin/messages">Manage Messages</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} to="/">View Website</NavDropdown.Item>
								{isAdmin && <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
};

export default AppNavbar;
