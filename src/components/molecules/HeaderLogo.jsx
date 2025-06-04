import React from 'react';
import Icon from '../atoms/Icon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const HeaderLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
        <Icon name="Upload" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div>
        <Heading level={1} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DropZone
        </Heading>
        <Paragraph className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 hidden sm:block">
          Effortless file management
        </Paragraph>
      </div>
    </div>
  );
};

export default HeaderLogo;