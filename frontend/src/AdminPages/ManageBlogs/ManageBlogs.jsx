// ManageBlogs.jsx
// Admin page to manage blogs with add/edit/delete using Bootstrap modals
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialForm = { title: '', summary: '', content: '', author: '', image: '' };

const ManageBlogs = () => {
	const navigate = useNavigate();
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [form, setForm] = useState(initialForm);
	const [selectedId, setSelectedId] = useState(null);
	const [error, setError] = useState('');
	// Removed unused tokenExpired state

	// Fetch blogs from backend
		const fetchBlogs = () => {
			setLoading(true);
			fetch('/api/admin/blogs', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
				.then(res => res.json())
				.then(data => {
					if (Array.isArray(data)) {
						setBlogs(data);
						setError('');
					} else {
						setBlogs([]);
						setError(data.error || 'Unauthorized. Please log in as admin.');
					}
					setLoading(false);
				})
				.catch(() => {
					setBlogs([]);
					setError('Network error');
					setLoading(false);
				});
		};

	useEffect(() => {
		fetchBlogs();
	}, []);

	// Handle form input changes
	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Open modal for add/edit
	const openModal = (blog = null) => {
		setError('');
		if (blog) {
			setEditMode(true);
			setForm({
				title: blog.title,
				summary: blog.summary || '',
				content: blog.content,
				author: blog.author || '',
				image: blog.image || '',
			});
			setSelectedId(blog._id);
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

	// Add or update blog

		// Delete blog
		const handleDelete = async id => {
			if (!window.confirm('Are you sure you want to delete this blog?')) return;
			try {
				const res = await fetch(`/api/admin/blogs/${id}`, {
					method: 'DELETE',
					headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
				});
				if (!res.ok) {
					setError('Failed to delete blog');
					return;
				}
				fetchBlogs();
			} catch {
				setError('Network error');
			}
		};
	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		// Client-side validation
		if (!form.title.trim()) {
			setError('Title is required.');
			return;
		}
		if (!form.content.trim()) {
			setError('Content is required.');
			return;
		}
		let method, url;
		if (editMode) {
			method = 'PUT';
			url = `/api/admin/blogs/${selectedId}`;
		} else {
			method = 'POST';
			url = '/api/admin/blogs';
		}
		try {
			const res = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(form),
			});
			if (!res.ok) {
				const data = await res.json();
				// Detect token expiration (401 with token error)
				if (res.status === 401 && data.error && data.error.toLowerCase().includes('token')) {
					setError('Session expired. Please log in again.');
					setTimeout(() => {
						localStorage.removeItem('token');
						navigate('/login');
					}, 2000);
					return;
				}
				// Show detailed validation error if available (including Mongoose field errors)
				if (data.error) {
					// If error is an object with 'errors' (Mongoose validation)
					if (typeof data.error === 'object' && data.error.errors) {
						const details = Object.values(data.error.errors).map(e => e.message).join(' ');
						setError(`Validation error: ${details}`);
					} else {
						setError(`Validation error: ${data.error}`);
					}
				} else {
					setError('Failed to save blog. Please check all required fields.');
				}
				return;
			}
			closeModal();
			fetchBlogs();
		} catch {
			setError('Network error');
		}
	};

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Blogs</h2>
			{error && <div className="alert alert-danger text-center">{error}</div>}
			<div className="table-responsive">
				<table className="table table-striped table-hover align-middle">
					<thead className="table-dark">
						<tr>
							<th>Title</th>
							<th>Summary</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan="3" className="text-center">Loading...</td></tr>
						) : blogs.length === 0 ? (
							<tr><td colSpan="3" className="text-center">No blogs found.</td></tr>
						) : (
							blogs.map(blog => (
								<tr key={blog._id}>
									<td>{blog.title}</td>
									<td>{blog.summary}</td>
									<td>
										<button className="btn btn-sm btn-warning me-2" onClick={() => openModal(blog)}>Edit</button>
										<button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog._id)}>Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<button className="btn btn-primary mt-4" onClick={() => openModal()}>Add New Blog</button>

			{/* Modal for Add/Edit Blog */}
			{showModal && (
				<div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							{/* Move alert above modal-header for visibility */}
							{error && (
								<div className="alert alert-danger m-3 d-flex justify-content-between align-items-center" role="alert">
									<span>{error}</span>
									<button type="button" className="btn-close ms-2" aria-label="Close" onClick={() => setError('')}></button>
								</div>
							)}
							<div className="modal-header">
								<h5 className="modal-title">{editMode ? 'Edit Blog' : 'Add New Blog'}</h5>
								<button type="button" className="btn-close" onClick={closeModal}></button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="modal-body">
									<div className="mb-3">
										<label className="form-label">Title</label>
										<input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
									</div>
									<div className="mb-3">
										<label className="form-label">Summary</label>
										<input type="text" className="form-control" name="summary" value={form.summary} onChange={handleChange} />
									</div>
									<div className="mb-3">
										<label className="form-label">Content</label>
										<textarea className="form-control" name="content" value={form.content} onChange={handleChange} rows={6} required></textarea>
									</div>
									<div className="mb-3">
										<label className="form-label">Author</label>
										<input type="text" className="form-control" name="author" value={form.author} onChange={handleChange} />
									</div>
									<div className="mb-3">
										<label className="form-label">Image URL</label>
										<input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
									<button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Add'} Blog</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ManageBlogs;
