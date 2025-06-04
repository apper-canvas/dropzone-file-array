import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, multiple, onChange, accept, disabled, className = '' }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      multiple={multiple}
      onChange={onChange}
      className={className}
      accept={accept}
      disabled={disabled}
    />
  );
});

export default Input;