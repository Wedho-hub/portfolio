// ManageProjects.jsx
// Admin page to manage projects with add/edit/delete using Bootstrap modals
import React, { useEffect, useState } from 'react';

const initialForm = { title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: '', featured: false };

const ManageProjects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [form, setForm] = useState(initialForm);
	const [selectedId, setSelectedId] = useState(null);
	const [error, setError] = useState('');

	// Fetch projects from backend
	const fetchProjects = () => {
		setLoading(true);
		fetch('/api/admin/projects', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) {
					setProjects(data);
					setError('');
				} else {
					setProjects([]);
					setError(data.error || 'Unauthorized. Please log in as admin.');
				}
				setLoading(false);
			})
			.catch(() => {
				setProjects([]);
				setError('Network error');
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	// Handle form input changes
	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
	};

	// Open modal for add/edit
	const openModal = (project = null) => {
		setError('');
		if (project) {
			setEditMode(true);
			setForm({
				title: project.title,
				description: project.description,
				techStack: (project.techStack || []).join(', '),
				githubUrl: project.githubUrl || '',
				liveUrl: project.liveUrl || '',
				image: project.image || '',
				featured: !!project.featured,
			});
			setSelectedId(project._id);
		} else {
			setEditMode(false);
			setForm(initialForm);
			setSelectedId(null);
		}
		setShowModal(true);
	};

	// Close modal
	const closeModal = () => {
		setShowModal(false);
		setForm(initialForm);
		setSelectedId(null);
		setError('');
	};

	// Add or update project
	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		const method = editMode ? 'PUT' : 'POST';
		const url = editMode ? `/api/admin/projects/${selectedId}` : '/api/admin/projects';
		// Convert techStack string to array
		const payload = { ...form, techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean) };
		try {
			const res = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const data = await res.json();
				setError(data.error || 'Failed to save project');
				return;
			}
			closeModal();
			fetchProjects();
		} catch {
			setError('Network error');
		}
	};

	// Delete project
	const handleDelete = async id => {
		if (!window.confirm('Are you sure you want to delete this project?')) return;
		try {
			const res = await fetch(`/api/admin/projects/${id}`, {
				method: 'DELETE',
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			});
			if (!res.ok) {
				setError('Failed to delete project');
				return;
			}
			fetchProjects();
		} catch {
			setError('Network error');
		}
	};

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Projects</h2>
			{error && <div className="alert alert-danger text-center">{error}</div>}
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
										<button className="btn btn-sm btn-warning me-2" onClick={() => openModal(project)}>Edit</button>
										<button className="btn btn-sm btn-danger" onClick={() => handleDelete(project._id)}>Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<button className="btn btn-primary mt-4" onClick={() => openModal()}>Add New Project</button>

			{/* Modal for Add/Edit Project */}
			{showModal && (
				<div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{editMode ? 'Edit Project' : 'Add New Project'}</h5>
								<button type="button" className="btn-close" onClick={closeModal}></button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="modal-body">
									{error && <div className="alert alert-danger">{error}</div>}
									<div className="mb-3">
										<label className="form-label">Title</label>
										<input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
									</div>
									<div className="mb-3">
										<label className="form-label">Description</label>
										<textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={4} required></textarea>
									</div>
									<div className="mb-3">
										<label className="form-label">Tech Stack (comma separated)</label>
										<input type="text" className="form-control" name="techStack" value={form.techStack} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
									</div>
									<div className="mb-3">
										<label className="form-label">GitHub URL</label>
										<input type="url" className="form-control" name="githubUrl" value={form.githubUrl} onChange={handleChange} />
									</div>
									<div className="mb-3">
										<label className="form-label">Live URL</label>
										<input type="url" className="form-control" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
									</div>
									<div className="mb-3">
										<label className="form-label">Image URL</label>
										<input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
									</div>
									<div className="form-check mb-3">
										<input className="form-check-input" type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} />
										<label className="form-check-label" htmlFor="featured">Featured</label>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
									<button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Add'} Project</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ManageProjects;
