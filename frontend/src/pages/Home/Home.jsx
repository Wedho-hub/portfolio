
	import React, { useEffect } from 'react';
	import { Link } from 'react-router-dom';
	import profilePic from '../../assets/profilePic.jpg';
	import './Home.css';

	const statsData = [
		{ label: 'Years of Experience', value: 2 },
		{ label: 'Projects', value: 10 },
		{ label: 'Clients', value: 3 },
		{ label: 'Certifications', value: 2 },
	];

	const Home = () => {
		// Use a single ref to hold the stat DOM nodes and assign via callback refs
		const statRefs = React.useRef([]);
		const statsWrapperRef = React.useRef(null);
		const rafIdsRef = React.useRef([]);

		// Animation runner for stats — returns array of raf ids so we can cancel if needed
		const runStatsAnimation = () => {
			// clear any previous rAFs
			rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
			rafIdsRef.current = [];

			statRefs.current.forEach((el, i) => {
				if (!el) return;
				const end = Number(statsData[i]?.value || 0);
				const duration = 1200;
				const frames = Math.max(1, Math.round(duration / 16));
				const increment = end / frames;
				let current = 0;
				const step = () => {
					current += increment;
					if (current >= end) {
						el.textContent = String(end);
					} else {
						el.textContent = String(Math.floor(current));
						rafIdsRef.current.push(requestAnimationFrame(step));
					}
				};
				step();
			});
		};

		const resetStats = () => {
			// cancel running frames and reset numbers to 0
			rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
			rafIdsRef.current = [];
			statRefs.current.forEach(el => {
				if (el) el.textContent = '0';
			});
		};

	useEffect(() => {
		if (!statsWrapperRef.current) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// defer animation to ensure refs are populated
					requestAnimationFrame(() => runStatsAnimation());
				} else {
					// reset so re-entering replays the animation
					resetStats();
				}
			});
		}, { threshold: 0.3 });

		observer.observe(statsWrapperRef.current);
		return () => {
			observer.disconnect();
			rafIdsRef.current.forEach(id => cancelAnimationFrame(id));
		};
	}, []);		return (
			<>
				<section className="py-5 min-vh-100 d-flex align-items-center home-hero-section bg-hero-pattern">
					<div className="container">
						<div className="row align-items-center justify-content-center justify-content-lg-between g-5">
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
								{/* Animated Stats (compact) */}
								<div ref={statsWrapperRef} className="mt-4 stats-wrapper">
									<div className="row g-3 justify-content-center">
										{statsData.map((stat, i) => (
											<div key={stat.label} className="col-6 col-sm-4 col-md-3">
												<div className="bg-surface-light shadow rounded-4 py-3 px-2 text-center h-100 stat-animate">
													<span ref={el => statRefs.current[i] = el} className="display-6 fw-bold d-block mb-1 stat-number">0</span>
													<span className="small stat-label fw-semibold text-uppercase letter-spacing-1">{stat.label}</span>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							{/* Profile Picture */}
							<div className="col-10 col-sm-7 col-md-5 col-lg-4 text-center text-lg-end mt-5 mt-lg-0 px-4 px-lg-5">
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
