// Dashboard.jsx
// Admin dashboard overview page
import React from 'react';

const Dashboard = () => {
	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>
			<div className="row g-4 justify-content-center">
				{/* Example dashboard cards - replace with real stats */}
				<div className="col-md-4">
					<div className="card text-bg-primary shadow-sm h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Projects</h5>
							<p className="card-text display-6">12</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-bg-success shadow-sm h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Blogs</h5>
							<p className="card-text display-6">8</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-bg-warning shadow-sm h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Messages</h5>
							<p className="card-text display-6">5</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5 justify-content-center">
				<div className="col-md-8 text-center">
					<a href="/admin/projects" className="btn btn-outline-primary m-2">Manage Projects</a>
					<a href="/admin/blogs" className="btn btn-outline-success m-2">Manage Blogs</a>
					<a href="/admin/messages" className="btn btn-outline-warning m-2">Manage Messages</a>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
