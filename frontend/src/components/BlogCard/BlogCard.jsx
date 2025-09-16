// BlogCard.jsx
// Displays a single blog post in a card format using Bootstrap

import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
	// blog: { _id, title, summary, image, author, createdAt }
	return (
		<div className="blog-masonry-item">
			<div className="blog-card h-100 shadow-sm">
				{blog.image && (
					<img src={blog.image} className="blog-card-img" alt={blog.title} />
				)}
				<div className="blog-card-body d-flex flex-column">
					<h5 className="blog-card-title">{blog.title}</h5>
					<div className="blog-card-meta mb-2">
						<span className="blog-card-author">{blog.author || 'Admin'}</span>
						<span className="blog-card-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
					</div>
					<p className="blog-card-summary flex-grow-1">{blog.summary || (blog.content?.slice(0, 120) + '...')}</p>
					<div className="d-flex justify-content-end align-items-end mt-2">
						<Link to={`/blogs/${blog._id}`} className="btn btn-gradient btn-sm">Read More</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
