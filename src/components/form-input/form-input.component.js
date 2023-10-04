import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, fieldName, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" name={fieldName} {...otherProps} />
      {label && (
        <label
          htmlFor={fieldName}
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
