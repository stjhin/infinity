import React from 'react';

export const Button = ({ children, variant = 'primary', ...props }) => {
  const className = `btn btn--${variant}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
