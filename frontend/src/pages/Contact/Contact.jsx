// Contact.jsx
// Contact form page using Bootstrap and custom Form component
import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Notification from '../../components/Notification/Notification';

const Contact = () => {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(false);

	// Handle form input changes
	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		setNotification(null);
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) {
				setNotification({ message: data.message, type: 'success' });
				setForm({ name: '', email: '', message: '' });
			} else {
				setNotification({ message: data.error || 'Failed to send message', type: 'danger' });
			}
		} catch {
			setNotification({ message: 'Network error', type: 'danger' });
		}
		setLoading(false);
	};

	return (
		<section className="container py-5">
			<h2 className="mb-4 fw-bold text-center">Contact Me</h2>
			<div className="row justify-content-center">
				<div className="col-md-6">
					{notification && (
						<Notification {...notification} onClose={() => setNotification(null)} />
					)}
					<Form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Name</label>
							<input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="message" className="form-label">Message</label>
							<textarea className="form-control" id="message" name="message" rows="5" value={form.message} onChange={handleChange} required></textarea>
						</div>
						<Button type="submit" disabled={loading}>
							{loading ? 'Sending...' : 'Send Message'}
						</Button>
					</Form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
