// BlogCard.jsx
// Displays a single blog post in a card format using Bootstrap
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
	// blog: { _id, title, summary, image, date }
	return (
		<div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
			<div className="card h-100 shadow-sm w-100">
				{blog.image && (
					<img src={blog.image} className="card-img-top" alt={blog.title} style={{ objectFit: 'cover', height: '220px' }} />
				)}
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">{blog.title}</h5>
					<p className="card-text flex-grow-1">{blog.summary || blog.content?.slice(0, 120) + '...'}</p>
					<div className="d-flex justify-content-between align-items-end mt-2">
						<small className="text-muted">{blog.date}</small>
						<Link to={`/blogs/${blog._id}`} className="btn btn-outline-primary btn-sm">Read More</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
