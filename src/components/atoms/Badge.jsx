import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Badge = ({ icon, text, type = 'info', className = '' }) => {
  const baseClasses = "flex items-center space-x-1 text-xs sm:text-sm";
  let typeClasses = "";
  let iconColorClass = "text-secondary"; // Default

  switch (type) {
    case 'success':
      typeClasses = "text-green-600 dark:text-green-400";
      iconColorClass = "text-green-500";
      break;
    case 'warning':
      typeClasses = "text-yellow-600 dark:text-yellow-400";
      iconColorClass = "text-yellow-500";
      break;
    case 'error':
      typeClasses = "text-red-600 dark:text-red-400";
      iconColorClass = "text-red-500";
      break;
    case 'info':
    default:
      typeClasses = "text-surface-500 dark:text-surface-400";
      iconColorClass = "text-secondary";
      break;
  }

  return (
    <motion.span 
      className={`${baseClasses} ${typeClasses} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {icon && <Icon name={icon} className={`w-4 h-4 ${iconColorClass}`} />}
      <span>{text}</span>
    </motion.span>
  );
};

export default Badge;