import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import FeatureCard from '../molecules/FeatureCard';

const featuresData = [
  {
    icon: 'Zap',
    title: 'Lightning Fast',
    description: 'Upload multiple files simultaneously with optimized performance and real-time progress tracking.'
  },
  {
    icon: 'Shield',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with automatic file validation and error handling for peace of mind.'
  },
  {
    icon: 'Smartphone',
    title: 'Cross-Platform',
    description: 'Works seamlessly across all devices and browsers with responsive design and touch support.'
  },
  {
    icon: 'Eye',
    title: 'Smart Preview',
    description: 'Instant file previews with thumbnail generation and metadata extraction for better organization.'
  },
  {
    icon: 'BarChart3',
    title: 'Analytics',
    description: 'Track upload history, monitor storage usage, and analyze file management patterns.'
  },
  {
    icon: 'Palette',
    title: 'Beautiful UI',
    description: 'Carefully crafted interface with glassmorphism effects and smooth animations for delightful experience.'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-surface-50 via-white to-surface-50 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Heading level={3} className="mb-4">
            Why Choose DropZone?
          </Heading>
          <Paragraph className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Built for speed, designed for simplicity, and optimized for your workflow.
          </Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;