// Button.jsx
// Reusable button component using Bootstrap
import React from 'react';

const Button = ({ children, type = 'button', className = '', ...props }) => {
	return (
		<button type={type} className={`btn btn-primary ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
