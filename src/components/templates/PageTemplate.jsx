import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { motion } from 'framer-motion';

const PageTemplate = ({ children, stats, loading, error, formatFileSize }) => {
  return (
    <div className="min-h-screen">
      <Header stats={stats} loading={loading} error={error} formatFileSize={formatFileSize} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageTemplate;