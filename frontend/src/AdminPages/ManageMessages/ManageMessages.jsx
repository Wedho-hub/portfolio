// ManageMessages.jsx
// Admin page to manage contact messages
import React, { useEffect, useState } from 'react';

const ManageMessages = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [showReply, setShowReply] = useState(false);
	const [replyTo, setReplyTo] = useState(null);
	const [replySubject, setReplySubject] = useState('');
	const [replyBody, setReplyBody] = useState('');
	const [replyLoading, setReplyLoading] = useState(false);
	const [replyError, setReplyError] = useState('');
	const [replySuccess, setReplySuccess] = useState('');

	// Fetch messages
	const fetchMessages = () => {
		setLoading(true);
		fetch('/api/admin/messages', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) {
					setMessages(data);
					setError('');
				} else {
					setMessages([]);
					setError(data.error || 'Unauthorized. Please log in as admin.');
				}
				setLoading(false);
			})
			.catch(() => {
				setMessages([]);
				setError('Network error');
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchMessages();
	}, []);

	// Open reply modal
	const handleReply = (msg) => {
		setReplyTo(msg);
		setReplySubject('Re: ' + (msg.subject || 'Your message to MyPortfolio'));
		setReplyBody('');
		setReplyError('');
		setReplySuccess('');
		setShowReply(true);
	};

	// Send reply
	const sendReply = async (e) => {
		e.preventDefault();
		setReplyLoading(true);
		setReplyError('');
		setReplySuccess('');
		try {
			const res = await fetch(`/api/admin/messages/${replyTo._id}/reply`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify({ subject: replySubject, body: replyBody }),
			});
			const data = await res.json();
			if (!res.ok) {
				setReplyError(data.error || 'Failed to send reply');
			} else {
				setReplySuccess('Reply sent successfully!');
				setShowReply(false);
			}
		} catch {
			setReplyError('Network error');
		}
		setReplyLoading(false);
	};

	// Delete message
	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this message?')) return;
		try {
			const res = await fetch(`/api/admin/messages/${id}`, {
				method: 'DELETE',
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			});
			if (!res.ok) {
				setError('Failed to delete message');
				return;
			}
			fetchMessages();
		} catch {
			setError('Network error');
		}
	};

	return (
		<section className="container py-5">
			<h2 className="fw-bold mb-4 text-center">Manage Messages</h2>
			{error && <div className="alert alert-danger text-center">{error}</div>}
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
										<button className="btn btn-sm btn-primary me-2" onClick={() => handleReply(msg)}>Reply</button>
										<button className="btn btn-sm btn-danger" onClick={() => handleDelete(msg._id)}>Delete</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Reply Modal */}
			{showReply && (
				<div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Reply to {replyTo.name}</h5>
								<button type="button" className="btn-close" onClick={() => setShowReply(false)}></button>
							</div>
							<form onSubmit={sendReply}>
								<div className="modal-body">
									{replyError && <div className="alert alert-danger">{replyError}</div>}
									{replySuccess && <div className="alert alert-success">{replySuccess}</div>}
									<div className="mb-3">
										<label className="form-label">To</label>
										<input type="email" className="form-control" value={replyTo.email} disabled />
									</div>
									<div className="mb-3">
										<label className="form-label">Subject</label>
										<input type="text" className="form-control" value={replySubject} onChange={e => setReplySubject(e.target.value)} required />
									</div>
									<div className="mb-3">
										<label className="form-label">Message</label>
										<textarea className="form-control" rows={5} value={replyBody} onChange={e => setReplyBody(e.target.value)} required />
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" onClick={() => setShowReply(false)}>Cancel</button>
									<button type="submit" className="btn btn-primary" disabled={replyLoading}>{replyLoading ? 'Sending...' : 'Send Reply'}</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ManageMessages;
