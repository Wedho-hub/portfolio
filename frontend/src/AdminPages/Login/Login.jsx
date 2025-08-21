// Login.jsx
// Admin login page
import React, { useState } from 'react';

const Login = () => {
	const [form, setForm] = useState({ username: '', password: '' });
	const [error, setError] = useState(null);

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		// TODO: Implement real authentication logic
		if (form.username === 'admin' && form.password === 'password') {
			setError(null);
			// Redirect to dashboard or set auth state
		} else {
			setError('Invalid credentials');
		}
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
						<button type="submit" className="btn btn-primary w-100">Login</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
