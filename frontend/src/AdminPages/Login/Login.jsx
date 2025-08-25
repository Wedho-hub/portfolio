// Login.jsx
// Admin login page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [form, setForm] = useState({ username: '', password: '' });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle admin login
	const handleSubmit = async e => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok && data.token) {
				localStorage.setItem('token', data.token);
				setError(null);
				navigate('/admin/dashboard');
			} else {
				setError(data.error || 'Login failed');
			}
		} catch {
			setError('Network error');
		}
		setLoading(false);
	};

	return (
		<section className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
			<div className="col-md-5 col-lg-4">
				<div className="card shadow-sm p-4">
					<h2 className="mb-4 text-center fw-bold">Admin Login</h2>
					{error && <div className="alert alert-danger">{error}</div>}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="username" className="form-label">Username</label>
							<input type="text" className="form-control" id="username" name="username" value={form.username} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label>
							<input type="password" className="form-control" id="password" name="password" value={form.password} onChange={handleChange} required />
						</div>
						<button type="submit" className="btn btn-primary w-100" disabled={loading}>
							{loading ? 'Logging in...' : 'Login'}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
