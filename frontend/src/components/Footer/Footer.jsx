// Footer.jsx
// Simple, modern footer using Bootstrap
import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-dark text-light py-4 mt-auto shadow-sm">
			<div className="container text-center">
				<small>&copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.</small>
			</div>
		</footer>
	);
};

export default Footer;
