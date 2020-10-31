import React from "react";

import "./styles.scss";

const Button = ({ children, disabled, loading, ...otherProps }) => {
  return (
    <button
      className={`btn-custom`}
      disabled={disabled || loading}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
