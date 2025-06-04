import React from 'react';

const ProgressBar = ({ progress, className = '', barClassName = '' }) => {
  return (
    <div className={`w-full bg-surface-200 dark:bg-surface-700 rounded-full h-1.5 ${className}`}>
      <div 
        className={`progress-bar h-1.5 rounded-full transition-all duration-300 ${barClassName}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;