// ManageProjects.jsx
// Admin page to manage projects
import React, { useEffect, useState } from 'react';

const ManageProjects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch projects from backend
		fetch('/api/admin/projects')
			.then(res => res.json())
			.then(data => {
				setProjects(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Projects</h2>
			<div className="table-responsive">
				<table className="table table-striped table-hover align-middle">
					<thead className="table-dark">
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan="3" className="text-center">Loading...</td></tr>
						) : projects.length === 0 ? (
							<tr><td colSpan="3" className="text-center">No projects found.</td></tr>
						) : (
							projects.map(project => (
								<tr key={project._id}>
									<td>{project.title}</td>
									<td>{project.description}</td>
									<td>
										<button className="btn btn-sm btn-warning me-2">Edit</button>
										<button className="btn btn-sm btn-danger">Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<button className="btn btn-primary mt-4">Add New Project</button>
		</section>
	);
};

export default ManageProjects;
