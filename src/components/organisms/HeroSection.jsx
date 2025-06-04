import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const HeroSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Heading level={2} className="mb-4 sm:mb-6">
            Upload Files with{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Lightning Speed
            </span>
          </Heading>
          <Paragraph className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed">
            Drag, drop, and manage your files effortlessly. Experience the fastest and most intuitive 
            file upload platform designed for modern workflows.
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;