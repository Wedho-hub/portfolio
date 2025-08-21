// About.jsx
// About me page using Bootstrap
import React from 'react';

const About = () => {
	return (
		<section className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="mb-4 fw-bold text-center">About Me</h2>
					<p className="lead text-center">
						{/* Replace with your own bio */}
						Hi! I'm a passionate developer who loves building modern web applications. I specialize in React, Node.js, and creating beautiful, user-friendly experiences.
					</p>
					<div className="text-center mt-4">
						<a href="/projects" className="btn btn-primary me-2">See My Work</a>
						<a href="/contact" className="btn btn-outline-secondary">Contact Me</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
