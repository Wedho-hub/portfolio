// Footer.jsx
// Simple, modern footer using Bootstrap
import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-dark text-light py-4 mt-auto shadow-sm">
			<div className="container text-center">
				<div className="mb-2">
					<a href="https://github.com/Wedho-hub" target="_blank" rel="noopener noreferrer" className="mx-2 text-light fs-4" title="GitHub">
						<i className="bi bi-github"></i>
					</a>
					<a href="https://www.linkedin.com/in/wellington-dhliwayo" target="_blank" rel="noopener noreferrer" className="mx-2 text-light fs-4" title="LinkedIn">
						<i className="bi bi-linkedin"></i>
					</a>
					<a href="mailto:wellingtond99@gmail.com" className="mx-2 text-light fs-4" title="Email">
						<i className="bi bi-envelope"></i>
					</a>
				</div>
				<div className="mb-2">
					<span className="fw-bold text-info">Let's build something amazing together.</span> <span className="text-secondary">Available for freelance, on-site & remote work.</span>
				</div>
				<small>&copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.</small>
			</div>
		</footer>
	);
};

export default Footer;
