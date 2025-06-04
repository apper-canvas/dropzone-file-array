import React from 'react';
import { motion } from 'framer-motion';
import HeaderLogo from '../molecules/HeaderLogo';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Paragraph from '../atoms/Paragraph';

const Header = ({ stats, loading, error, formatFileSize }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-white/20 dark:border-surface-700/30 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <HeaderLogo />
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            {!loading && !error && (
              <div className="hidden sm:flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-300">
                <div className="flex items-center space-x-1">
                  <Icon name="Files" className="w-4 h-4" />
                  <Paragraph>{stats.totalFiles} files</Paragraph>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="HardDrive" className="w-4 h-4" />
                  <Paragraph>{formatFileSize(stats.totalSize)}</Paragraph>
                </div>
              </div>
            )}
            
            <Button variant="icon" className="p-2">
              <Icon name="Settings" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;