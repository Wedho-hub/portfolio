// ProjectDetails.jsx
// Shows details for a single project
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../../data/projects';

const ProjectDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	// Find project by index (assuming /projects/:id is the array index)
	const project = projects[parseInt(id, 10)];

	if (!project) return <div className="container py-5 text-center">Project not found.</div>;

	return (
		<section className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					{project.image && (
						<img src={project.image} alt={project.title} className="img-fluid rounded mb-4" />
					)}
					<h2 className="fw-bold mb-3">{project.title}</h2>
					<p className="lead">{project.description}</p>
					{project.tech && (
						<div className="mb-3">
							<strong>Tech Stack:</strong> <span className="text-muted">{project.tech.join(', ')}</span>
						</div>
					)}
					<div className="d-flex gap-3 mt-4">
						{project.github && (
							<a href={project.github} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">
								<i className="bi bi-github"></i> GitHub
							</a>
						)}
						{project.demo && (
							<a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
								<i className="bi bi-box-arrow-up-right"></i> Live Demo
							</a>
						)}
						<button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectDetails;
