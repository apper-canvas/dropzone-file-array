import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../molecules/StatCard';

const StatsOverview = ({ stats, loading, formatFileSize }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
    >
      <StatCard 
        icon="Files" 
        iconColor="from-primary to-primary-dark" 
        value={stats.totalFiles} 
        label="Total Files" 
        loading={loading}
        delay={0.2}
      />
      <StatCard 
        icon="HardDrive" 
        iconColor="from-secondary to-secondary-dark" 
        value={formatFileSize(stats.totalSize)} 
        label="Storage Used" 
        loading={loading}
        delay={0.3}
      />
      <StatCard 
        icon="Clock" 
        iconColor="from-accent to-yellow-600" 
        value={stats.recentUploads} 
        label="Recent Uploads" 
        loading={loading}
        delay={0.4}
      />
    </motion.div>
  );
};

export default StatsOverview;