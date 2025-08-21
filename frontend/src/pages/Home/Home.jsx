// Home.jsx
// Main landing page for the portfolio
import React from 'react';

const Home = () => {
	return (
		<section className="py-5 bg-light min-vh-100 d-flex align-items-center">
			<div className="container text-center">
				{/* Hero Section */}
				<h1 className="display-4 fw-bold mb-3">Welcome to My Portfolio</h1>
				<p className="lead mb-4">
					Explore my projects, read my blogs, and get in touch!
				</p>
				<a href="/projects" className="btn btn-primary btn-lg me-2">View Projects</a>
				<a href="/contact" className="btn btn-outline-secondary btn-lg">Contact Me</a>
			</div>
		</section>
	);
};

export default Home;
