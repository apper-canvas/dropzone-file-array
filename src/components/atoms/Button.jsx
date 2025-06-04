import React from 'react';
import Icon from './Icon';

const Button = ({ children, onClick, disabled = false, className = '', variant = 'primary', icon = null }) => {
  const baseClasses = "flex items-center justify-center space-x-2 rounded-xl font-medium transition-all duration-300";
  let variantClasses = "";
  let paddingClasses = "px-4 py-2 text-sm";

  switch (variant) {
    case 'primary':
      variantClasses = "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105";
      break;
    case 'secondary':
      variantClasses = "bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600";
      break;
    case 'text':
      variantClasses = "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white";
      paddingClasses = "p-0"; // Text buttons often have no padding
      break;
    case 'icon':
        variantClasses = "p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800";
        paddingClasses = "p-2";
        break;
    default:
      variantClasses = "bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${paddingClasses} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;