// Notification.jsx
// Shows feedback messages using Bootstrap alerts
import React from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
	if (!message) return null;
	return (
		<div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
			{message}
			{onClose && (
				<button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
			)}
		</div>
	);
};

export default Notification;
