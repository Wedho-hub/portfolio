// ManageBlogs.jsx
// Admin page to manage blogs
import React, { useEffect, useState } from 'react';

const ManageBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch blogs from backend
		fetch('/api/admin/blogs')
			.then(res => res.json())
			.then(data => {
				setBlogs(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Blogs</h2>
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
										<button className="btn btn-sm btn-warning me-2">Edit</button>
										<button className="btn btn-sm btn-danger">Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<button className="btn btn-primary mt-4">Add New Blog</button>
		</section>
	);
};

export default ManageBlogs;
