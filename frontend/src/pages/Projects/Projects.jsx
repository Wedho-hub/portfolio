// Projects.jsx
// Lists all projects using ProjectCard
import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const Projects = () => {
	const [projects, setProjects] = useState([]);

	// Fetch projects from backend API
	useEffect(() => {
		fetch('/api/projects')
			.then(res => res.json())
			.then(data => setProjects(data))
			.catch(() => setProjects([]));
	}, []);

	return (
		<section className="container py-5">
			<h2 className="mb-4 fw-bold text-center">Projects</h2>
			<div className="row">
				{projects.length === 0 ? (
					<p className="text-center">No projects found.</p>
				) : (
					projects.map(project => (
						<ProjectCard key={project._id} project={project} />
					))
				)}
			</div>
		</section>
	);
};

export default Projects;
