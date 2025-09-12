
	import React, { useEffect, useRef } from 'react';
	import { Link } from 'react-router-dom';
	import profilePic from '../../assets/profilePic.jpg';
	import './Home.css';

	const statsData = [
		{ label: 'Months of Experience', value: 18 },
		{ label: 'Projects', value: 10 },
		{ label: 'Clients', value: 3 },
		{ label: 'Certifications', value: 2 },
	];

	const Home = () => {
		const statRefs = [useRef(), useRef(), useRef(), useRef()];
		useEffect(() => {
			statRefs.forEach((ref, i) => {
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
				<section className="py-5 bg-light min-vh-100 d-flex align-items-center home-hero-section">
					<div className="container">
						<div className="row align-items-center justify-content-center g-5">
							{/* Hero Content */}
							<div className="col-12 col-lg-7 text-center text-lg-start mb-5 mb-lg-0 px-4 px-lg-5">
								<p className='lead mb-4 mt-2'>Hi, I am Wellington Dhliwayo</p>
								<h2 className="display-3 fw-bold mb-4">Full-Stack Web Developer | JavaScript Enthusiast</h2>
								<p className="lead mb-5">
									I build modern, user-friendly websites and applications that help brands grow online.
								</p>
								<div className="mb-5">
									<Link to="/projects" className="btn btn-primary btn-lg me-3">View Projects</Link>
									<Link to="/contact" className="btn btn-outline-secondary btn-lg">Contact Me</Link>
								</div>
								{/* Animated Stats */}
								<div className="row mt-5 g-4 justify-content-center">
									{statsData.map((stat, i) => (
										<div key={stat.label} className="col-6 col-md-3">
											<div className="bg-white shadow rounded-4 py-4 px-2 text-center h-100 stat-animate">
												<span ref={statRefs[i]} className="display-5 fw-bold text-primary d-block mb-1 stat-number">0</span>
												<span className="small text-muted fw-semibold text-uppercase letter-spacing-1">{stat.label}</span>
											</div>
										</div>
									))}
								</div>
							</div>
							{/* Profile Picture */}
							<div className="col-10 col-sm-7 col-md-5 col-lg-4 text-center mx-auto mt-5 mt-lg-0 px-4 px-lg-5">
								<img
									src={profilePic}
									alt="Profile"
									className="img-fluid rounded-circle shadow-lg hero-profile-pic"
								/>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	};

	export default Home;
