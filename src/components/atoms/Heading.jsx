import React from 'react';

const Heading = ({ level, children, className = '' }) => {
  const baseClasses = "font-bold text-surface-900 dark:text-white";
  let Tag;
  let sizeClasses;

  switch (level) {
    case 1:
      Tag = 'h1';
      sizeClasses = "text-xl sm:text-2xl"; // Used for DropZone title
      break;
    case 2:
      Tag = 'h2';
      sizeClasses = "text-3xl sm:text-4xl lg:text-5xl"; // Used for Hero main title
      break;
    case 3:
      Tag = 'h3';
      sizeClasses = "text-2xl sm:text-3xl lg:text-4xl"; // Used for Why Choose section title
      break;
    case 4:
      Tag = 'h4';
      sizeClasses = "text-lg sm:text-xl"; // Used for StatCard value, Upload Queue title
      break;
    case 5:
        Tag = 'h5';
        sizeClasses = "text-xl"; // Used for FeatureCard title
        break;
    case 6:
        Tag = 'h6';
        sizeClasses = "text-sm"; // Used for file name in FileCard
        break;
    default:
      Tag = 'h2';
      sizeClasses = "text-3xl";
  }

  return <Tag className={`${baseClasses} ${sizeClasses} ${className}`}>{children}</Tag>;
};

export default Heading;