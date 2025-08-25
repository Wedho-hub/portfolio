// Home.jsx
// Main landing page for the portfolio
import React from 'react';
import profilePic from '../../assets/profilePic.jpg';

const Home = () => {
		return (
			<>
				<section className="py-5 bg-light min-vh-100 d-flex align-items-center">
					<div className="container">
						<div className="row align-items-center justify-content-center">
							{/* Hero Content */}
							<div className="col-12 col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
								<p className='lead mb-4'>Hi, I am Wellington Dhliwayo</p>
								<h1 className="display-4 fw-bold mb-3">Full-Stack Web Developer | JavaScript Enthusiast</h1>
								<p className="lead mb-4">
									I build modern, user-friendly websites and applications that help brands grow online.
								</p>
								<a href="/projects" className="btn btn-primary btn-lg me-2">View Projects</a>
								<a href="/contact" className="btn btn-outline-secondary btn-lg">Contact Me</a>
							</div>
							{/* Profile Picture */}
							<div className="col-10 col-sm-7 col-md-5 col-lg-4 text-center mx-auto">
								<img
									src={profilePic}
									alt="Profile"
									className="img-fluid rounded-circle shadow-lg hero-profile-pic"
									style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', marginBottom: '1rem', objectFit: 'cover', border: '5px solid #3949ab' }}
								/>
							</div>
						</div>
					</div>
				</section>

			</>
		);
};

export default Home;
