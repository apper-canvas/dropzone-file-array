import React from 'react';
import Icon from '../atoms/Icon';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Card from '../atoms/Card';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <Card 
      className="p-6 sm:p-8 h-full transition-all duration-300 group-hover:scale-105" 
      whileInView={true} 
      delay={delay}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon name={icon} className="w-6 h-6 text-white" />
      </div>
      <Heading level={5} className="mb-3">{title}</Heading>
      <Paragraph className="text-surface-600 dark:text-surface-300 leading-relaxed">
        {description}
      </Paragraph>
    </Card>
  );
};

export default FeatureCard;