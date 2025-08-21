// Form.jsx
// Reusable form wrapper using Bootstrap
import React from 'react';

const Form = ({ children, onSubmit, className = '', ...props }) => {
	return (
		<form onSubmit={onSubmit} className={`needs-validation ${className}`} noValidate {...props}>
			{children}
		</form>
	);
};

export default Form;
