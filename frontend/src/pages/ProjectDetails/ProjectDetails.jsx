// ProjectDetails.jsx
// Shows details for a single project
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`/api/projects/${id}`)
			.then(res => res.json())
			.then(data => {
				setProject(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	if (loading) return <div className="container py-5 text-center">Loading...</div>;
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
					{project.link && (
						<a href={project.link} className="btn btn-primary mt-3" target="_blank" rel="noopener noreferrer">
							View Live
						</a>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProjectDetails;
