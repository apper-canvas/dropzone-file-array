import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', animate = false, delay = 0, whileInView = false, viewportOnce = true }) => {
  const baseClasses = "glass-card rounded-2xl";
  
  const animationProps = animate 
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: delay, type: "spring", stiffness: 100, damping: 20 }
      }
    : {};

  const inViewProps = whileInView
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: viewportOnce },
        transition: { delay: delay, type: "spring", stiffness: 100, damping: 20 }
      }
    : {};

  return (
    <motion.div 
      className={`${baseClasses} ${className}`} 
      {...animationProps}
      {...inViewProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;