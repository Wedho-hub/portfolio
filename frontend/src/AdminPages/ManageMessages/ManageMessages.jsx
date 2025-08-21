// ManageMessages.jsx
// Admin page to manage contact messages
import React, { useEffect, useState } from 'react';

const ManageMessages = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch messages from backend
		fetch('/api/admin/messages')
			.then(res => res.json())
			.then(data => {
				setMessages(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Messages</h2>
			<div className="table-responsive">
				<table className="table table-striped table-hover align-middle">
					<thead className="table-dark">
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Message</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr><td colSpan="4" className="text-center">Loading...</td></tr>
						) : messages.length === 0 ? (
							<tr><td colSpan="4" className="text-center">No messages found.</td></tr>
						) : (
							messages.map(msg => (
								<tr key={msg._id}>
									<td>{msg.name}</td>
									<td>{msg.email}</td>
									<td>{msg.message}</td>
									<td>
										<button className="btn btn-sm btn-danger">Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default ManageMessages;
