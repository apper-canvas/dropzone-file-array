import React from 'react';
import Icon from '../atoms/Icon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const Footer = () => {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <Icon name="Upload" className="w-4 h-4 text-white" />
            </div>
            <Heading level={1} className="text-xl">DropZone</Heading>
          </div>
          <Paragraph className="text-surface-600 dark:text-surface-400 text-sm text-center sm:text-right">
            © 2024 DropZone. Simplifying file management for everyone.
          </Paragraph>
        </div>
      </div>
    </footer>
  );
};

export default Footer;