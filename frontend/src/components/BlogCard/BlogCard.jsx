// BlogCard.jsx
// Displays a single blog post in a card format using Bootstrap
import React from 'react';

const BlogCard = ({ blog }) => {
	// blog: { title, summary, image, link, date }
	return (
		<div className="col-md-4 mb-4">
			<div className="card h-100 shadow-sm">
				{blog.image && (
					<img src={blog.image} className="card-img-top" alt={blog.title} />
				)}
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">{blog.title}</h5>
					<p className="card-text flex-grow-1">{blog.summary}</p>
					<small className="text-muted mb-2">{blog.date}</small>
					{blog.link && (
						<a href={blog.link} className="btn btn-outline-primary mt-2" target="_blank" rel="noopener noreferrer">
							Read More
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
