// Home.jsx
// Main landing page for the portfolio
import React, { useEffect, useRef } from 'react';
import profilePic from '../../assets/profilePic.jpg';

const statsData = [
	{ label: 'Months of Experience', value: 18 },
	{ label: 'Projects', value: 10 },
	{ label: 'Clients', value: 3 },
	{ label: 'Certifications', value: 2 },
];

// No custom hook needed; animate all stats in a single useEffect

const Home = () => {
	// Animated stats refs
	const statRefs = [useRef(), useRef(), useRef(), useRef()];
		useEffect(() => {
			statRefs.forEach((ref, i) => {
				if (!ref.current) return;
				let start = 0;
				const end = statsData[i].value;
				const duration = 1200;
				const increment = end / (duration / 16);
				let current = start;
				const step = () => {
					current += increment;
					if (current >= end) {
						ref.current.textContent = end;
					} else {
						ref.current.textContent = Math.floor(current);
						requestAnimationFrame(step);
					}
				};
				step();
			});
			// eslint-disable-next-line
		}, []);

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

							{/* Animated Stats */}
							<div className="row mt-5 g-3 justify-content-center">
								{statsData.map((stat, i) => (
									<div key={stat.label} className="col-6 col-md-3">
										<div className="bg-white shadow rounded-4 py-4 px-2 text-center h-100 stat-animate">
											<span ref={statRefs[i]} className="display-5 fw-bold text-primary d-block mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>0</span>
											<span className="small text-muted fw-semibold text-uppercase letter-spacing-1">{stat.label}</span>
										</div>
									</div>
								))}
							</div>
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
				<style>{`
					.stat-animate { transition: box-shadow 0.3s, transform 0.3s; }
					.stat-animate:hover { box-shadow: 0 8px 32px rgba(57,73,171,0.18); transform: translateY(-4px) scale(1.04); }
					.letter-spacing-1 { letter-spacing: 1px; }
				`}</style>
			</section>
		</>
	);
};

export default Home;
