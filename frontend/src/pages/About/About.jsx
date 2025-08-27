import reactLogo from '../../assets/react.svg';
import profilePic from '../../assets/profilePic.jpg';
import nodeLogo from '../../assets/nodedotjs.svg';
import expressLogo from '../../assets/express.svg';
import mongoLogo from '../../assets/mongodb.svg';
import jsLogo from '../../assets/javascript.svg';
import htmlLogo from '../../assets/html5.svg';
import cssLogo from '../../assets/css.svg';
import bootstrapLogo from '../../assets/bootstrap.svg';
import gitLogo from '../../assets/git.svg';
import viteLogo from '../../assets/vite.svg';
// About.jsx
// About me page using Bootstrap
import React from 'react';

const About = () => {
	return (
		<>
			<section className="container py-5">
				<div className="row justify-content-center align-items-center">
					<div className="col-12 col-md-4 text-center mb-4 mb-md-0">
						<img
							src={profilePic}
							alt="Profile"
							className="img-fluid rounded-circle shadow-lg"
							style={{ maxWidth: '180px', border: '5px solid #3949ab', objectFit: 'cover' }}
						/>
					</div>
					<div className="col-12 col-md-8">
						<h2 className="mb-4 fw-bold text-center text-md-start">About Me</h2>
						<p className="lead text-center text-md-start">
							I'm Wellington Dhliwayo, a full-stack web developer (MERN) who transitioned from engineering and construction into tech. My background as a fitter, boilermaker, and supervisor taught me precision, problem-solving, and teamwork — skills I now apply to building scalable, user-friendly web applications. Trained through the HyperionDev Full-Stack Bootcamp, I combine development expertise with digital marketing insight to create websites that perform and grow. I'm currently open to freelance, remote, and on-site opportunities.
						</p>
						<div className="text-center text-md-start mt-4">
							<a href="/projects" className="btn btn-primary me-2">See My Work</a>
							<a href="/contact" className="btn btn-outline-secondary">Contact Me</a>
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="container py-5">
				<h4 className="fw-bold text-center mb-5">My Journey</h4>
				<div className="timeline-horizontal d-flex flex-nowrap overflow-auto pb-4">
					{/* Timeline Items */}
					<div className="timeline-item text-center mx-3 flex-shrink-0" style={{ minWidth: 180 }}>
						<div className="timeline-dot bg-primary mb-2"></div>
						<div className="fw-bold">Engineering & Construction</div>
						<div className="small text-muted">Fitter, Boilermaker, Supervisor</div>
						<div className="timeline-bar bg-primary mt-2"></div>
					</div>
					<div className="timeline-item text-center mx-3 flex-shrink-0" style={{ minWidth: 180 }}>
						<div className="timeline-dot bg-success mb-2"></div>
						<div className="fw-bold">Bootcamp</div>
						<div className="small text-muted">HyperionDev Full-Stack</div>
						<div className="timeline-bar bg-success mt-2"></div>
					</div>
					<div className="timeline-item text-center mx-3 flex-shrink-0" style={{ minWidth: 180 }}>
						<div className="timeline-dot bg-warning mb-2"></div>
						<div className="fw-bold">Web Developer</div>
						<div className="small text-muted">Freelance & Projects</div>
						<div className="timeline-bar bg-warning mt-2"></div>
					</div>
					<div className="timeline-item text-center mx-3 flex-shrink-0" style={{ minWidth: 180 }}>
						<div className="timeline-dot bg-info mb-2"></div>
						<div className="fw-bold">Digital Marketing</div>
						<div className="small text-muted">SEO, Growth</div>
						<div className="timeline-bar bg-info mt-2"></div>
					</div>
					<div className="timeline-item text-center mx-3 flex-shrink-0" style={{ minWidth: 180 }}>
						<div className="timeline-dot bg-danger mb-2"></div>
						<div className="fw-bold">Open to Work</div>
						<div className="small text-muted">Remote, On-site, Freelance</div>
					</div>
				</div>
				{/* Timeline Styles */}
				<style>{`
					.timeline-horizontal { position: relative; }
					.timeline-dot { width: 24px; height: 24px; border-radius: 50%; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
					.timeline-bar { height: 6px; width: 100%; border-radius: 3px; margin: 0 auto; }
					.timeline-item { position: relative; }
					.timeline-item:not(:last-child) .timeline-bar { background: linear-gradient(90deg, #3949ab, #00bfae, #ffb300, #29b6f6, #e53935); }
				`}</style>
			</section>

					{/* Tech Stack Section */}
					<section className="py-4 bg-white border-top border-bottom">
						<div className="container text-center">
							<h5 className="mb-4 fw-bold text-secondary">Technologies I Use</h5>
							<div className="row justify-content-center g-3">
								{[
									{ src: reactLogo, label: 'React' },
									{ src: nodeLogo, label: 'Node.js' },
									{ src: expressLogo, label: 'Express.js' },
									{ src: mongoLogo, label: 'MongoDB' },
									{ src: jsLogo, label: 'JavaScript' },
									{ src: htmlLogo, label: 'HTML5' },
									{ src: cssLogo, label: 'CSS3' },
									{ src: bootstrapLogo, label: 'Bootstrap' },
									{ src: gitLogo, label: 'Git' },
									{ src: viteLogo, label: 'Vite' },
								].map((tech) => (
									<div key={tech.label} className="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center">
										<img src={tech.src} alt={tech.label} title={tech.label} style={{ height: 48, marginBottom: 8, filter: 'drop-shadow(0 2px 8px rgba(26,35,126,0.10))' }} />
										<span className="small text-muted fw-semibold">{tech.label}</span>
									</div>
								))}
							</div>
						</div>
					</section>
				   </>
			   );
	}

	export default About;
