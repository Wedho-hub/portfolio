// Projects.jsx
// Lists all projects using ProjectCard
import React from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import projects from '../../data/projects';

const Projects = () => {
	return (
		<section className="container py-5">
			<h2 className="mb-4 fw-bold text-center">Projects</h2>
			<div className="row g-4 justify-content-center">
				{projects.map((project, idx) => (
					<ProjectCard
						key={project.title + idx}
						project={{
							title: project.title,
							description: project.description,
							image: project.image,
							githubUrl: project.github,
							liveUrl: project.demo,
							techStack: project.tech,
						}}
					/>
				))}
			</div>
		</section>
	);
};

export default Projects;
