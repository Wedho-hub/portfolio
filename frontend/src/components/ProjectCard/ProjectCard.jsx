// ProjectCard.jsx
// Displays a single project in a card format using Bootstrap
import React from 'react';

const ProjectCard = ({ project }) => {
	// project: { title, description, image, githubUrl, liveUrl, techStack, featured }
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
			<div className="card h-100 shadow-sm w-100">
				{project.image && (
					<img src={project.image} className="card-img-top" alt={project.title} style={{ objectFit: 'cover', height: '180px' }} />
				)}
				<div className="card-body d-flex flex-column">
					<div className="d-flex align-items-center mb-2">
						<h5 className="card-title mb-0 flex-grow-1">{project.title}</h5>
						{project.featured && <span className="badge bg-success ms-2">Featured</span>}
					</div>
					<p className="card-text flex-grow-1">{project.description}</p>
					{project.techStack && project.techStack.length > 0 && (
						<div className="mb-2">
							<small className="text-muted">{Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}</small>
						</div>
					)}
					<div className="mt-auto d-flex gap-2">
						{project.githubUrl && (
							<a href={project.githubUrl} className="btn btn-outline-dark btn-sm" target="_blank" rel="noopener noreferrer">
								<i className="bi bi-github"></i> GitHub
							</a>
						)}
						{project.liveUrl && (
							<a href={project.liveUrl} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
								<i className="bi bi-box-arrow-up-right"></i> Live
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
