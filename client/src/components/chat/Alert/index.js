import React from "react";

import "./styles.scss";

const Alert = ({ message, error, danger, onClose }) => {
  return (
    <>
      {(message || error) && (
        <div className={`${danger || error ? "alert-error" : ""} alert-custom`}>
          <div />
          {error ? <p>{error.message}</p> : <p>{message}</p>}
          {onClose ? (
            <button className='close-custom' onClick={onClose}>
              <span>×</span>
            </button>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
