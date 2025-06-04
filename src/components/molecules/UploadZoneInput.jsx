import React, { forwardRef } from 'react';
import Input from '../atoms/Input';

const UploadZoneInput = forwardRef(({ handleFileInput, allowedTypes, isUploading }, ref) => {
  return (
    <Input
      ref={ref}
      type="file"
      multiple
      onChange={handleFileInput}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      accept={allowedTypes.join(',')}
      disabled={isUploading}
    />
  );
});

export default UploadZoneInput;