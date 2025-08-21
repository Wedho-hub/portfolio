// Blogs.jsx
// Lists all blogs using BlogCard
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);

	// Fetch blogs from backend API
	useEffect(() => {
		fetch('/api/blogs')
			.then(res => res.json())
			.then(data => setBlogs(data))
			.catch(() => setBlogs([]));
	}, []);

	return (
		<section className="container py-5">
			<h2 className="mb-4 fw-bold text-center">Blogs</h2>
			<div className="row">
				{blogs.length === 0 ? (
					<p className="text-center">No blogs found.</p>
				) : (
					blogs.map(blog => (
						<BlogCard key={blog._id} blog={blog} />
					))
				)}
			</div>
		</section>
	);
};

export default Blogs;
