// Navbar.jsx
// Responsive navigation bar using react-bootstrap
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import logo from '../../assets/logo.svg';
import './Navbar.css';


import { useNavigate } from 'react-router-dom';


const AppNavbar = () => {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	// Check if admin is logged in (token exists)
	const isAdmin = !!localStorage.getItem('token');

	// Collapse menu on link click
	const handleNavClick = () => setExpanded(false);

	// Logout handler
	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/admin/login');
		setExpanded(false);
	};

	return (
		<Navbar
			expand="lg"
			sticky="top"
			className="shadow-sm custom-navbar"
			style={{ background: 'linear-gradient(90deg, #434db8ff 0%, #7181efff 100%)', color: '#fff' }}
			expanded={expanded}
		>
			<Container>
				{/* Brand/Logo */}
				<Navbar.Brand as={Link} to="/" className="fw-bold logo d-flex align-items-center" onClick={handleNavClick}>
					<img src={logo} alt="My Logo" width="64" height="64" style={{ marginRight: 12 }} />
					<span className="d-none d-md-inline" style={{ color: '#fff', fontWeight: 700, fontSize: '1.7rem', letterSpacing: '2px' }}>MyPortfolio</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar-nav" onClick={() => setExpanded(exp => !exp)} />
				<Navbar.Collapse id="main-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/" className="nav-link-custom" onClick={handleNavClick}>Home</Nav.Link>
						<Nav.Link as={Link} to="/about" className="nav-link-custom" onClick={handleNavClick}>About</Nav.Link>
						<Nav.Link as={Link} to="/projects" className="nav-link-custom" onClick={handleNavClick}>Projects</Nav.Link>
						<Nav.Link as={Link} to="/blogs" className="nav-link-custom" onClick={handleNavClick}>Blogs</Nav.Link>
						<Nav.Link as={Link} to="/contact" className="nav-link-custom" onClick={handleNavClick}>Contact</Nav.Link>
						<NavDropdown title="Admin" id="admin-nav-dropdown" menuVariant="dark">
							<NavDropdown.Item as={Link} to="/admin/dashboard" onClick={handleNavClick}>Dashboard</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/admin/blogs" onClick={handleNavClick}>Manage Blogs</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/admin/projects" onClick={handleNavClick}>Manage Projects</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/admin/messages" onClick={handleNavClick}>Manage Messages</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to="/" onClick={handleNavClick}>View Website</NavDropdown.Item>
							{isAdmin && <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
