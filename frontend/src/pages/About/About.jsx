import reactLogo from '../../assets/react.svg';
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
						<div className="row justify-content-center">
							<div className="col-md-8">
								<h2 className="mb-4 fw-bold text-center">About Me</h2>
								<p className="lead text-center">
									Hi! I'm a passionate developer who loves building modern web applications. I specialize in React, Node.js, and creating beautiful, user-friendly experiences.
								</p>
								<div className="text-center mt-4">
									<a href="/projects" className="btn btn-primary me-2">See My Work</a>
									<a href="/contact" className="btn btn-outline-secondary">Contact Me</a>
								</div>
							</div>
						</div>
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
