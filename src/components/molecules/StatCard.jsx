import React from 'react';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const StatCard = ({ icon, iconColor, value, label, loading, delay }) => {
  return (
    <Card 
      className="p-4 sm:p-6 text-center" 
      animate={true} 
      delay={delay}
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
        <Icon name={icon} className="w-6 h-6 text-white" />
      </div>
      <Heading level={4} className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
        {loading ? '...' : value}
      </Heading>
      <Paragraph className="text-sm text-surface-600 dark:text-surface-400">
        {label}
      </Paragraph>
    </Card>
  );
};

export default StatCard;