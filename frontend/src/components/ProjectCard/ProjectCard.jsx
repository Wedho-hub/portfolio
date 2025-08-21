// ProjectCard.jsx
// Displays a single project in a card format using Bootstrap
import React from 'react';

const ProjectCard = ({ project }) => {
	// project: { title, description, image, link }
	return (
		<div className="col-md-4 mb-4">
			<div className="card h-100 shadow-sm">
				{project.image && (
					<img src={project.image} className="card-img-top" alt={project.title} />
				)}
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">{project.title}</h5>
					<p className="card-text flex-grow-1">{project.description}</p>
					{project.link && (
						<a href={project.link} className="btn btn-primary mt-2" target="_blank" rel="noopener noreferrer">
							View Project
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
