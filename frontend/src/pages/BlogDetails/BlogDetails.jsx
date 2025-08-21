// BlogDetails.jsx
// Shows details for a single blog post
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`/api/blogs/${id}`)
			.then(res => res.json())
			.then(data => {
				setBlog(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	if (loading) return <div className="container py-5 text-center">Loading...</div>;
	if (!blog) return <div className="container py-5 text-center">Blog not found.</div>;

	return (
		<section className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					{blog.image && (
						<img src={blog.image} alt={blog.title} className="img-fluid rounded mb-4" />
					)}
					<h2 className="fw-bold mb-3">{blog.title}</h2>
					<p className="lead">{blog.content}</p>
					<small className="text-muted">{blog.date}</small>
				</div>
			</div>
		</section>
	);
};

export default BlogDetails;
