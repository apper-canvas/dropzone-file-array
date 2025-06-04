import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Badge from '../atoms/Badge';

const UploadZoneContent = ({ isDragging }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        animate={{ 
          scale: isDragging ? 1.1 : 1,
          rotate: isDragging ? 5 : 0 
        }}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg"
      >
        <Icon 
          name={isDragging ? "Download" : "Upload"} 
          className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
        />
      </motion.div>

      <div>
        <Heading level={3} className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3">
          {isDragging ? 'Drop files here!' : 'Drag & drop your files'}
        </Heading>
        <Paragraph className="text-surface-600 dark:text-surface-400 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
          or click to browse your device
        </Paragraph>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Badge icon="CheckCircle" text="Max 50MB per file" />
          <Badge icon="Shield" text="Secure upload" />
          <Badge icon="Zap" text="Lightning fast" />
        </div>
      </div>
    </div>
  );
};

export default UploadZoneContent;