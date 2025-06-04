import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Image from '../atoms/Image';
import ProgressBar from '../atoms/ProgressBar';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Button from '../atoms/Button';

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type.includes('pdf')) return 'FileText';
  if (type.includes('word') || type.includes('document')) return 'FileType';
  if (type.startsWith('text/')) return 'File';
  return 'File';
};

const FileCard = ({ file, formatFileSize, uploadProgress, onRemove, isUploading }) => {
  const statusIcon = {
    completed: { name: "CheckCircle", className: "text-secondary" },
    failed: { name: "XCircle", className: "text-red-500" },
    uploading: { name: "Loader2", className: "text-primary animate-spin" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="file-card flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700"
    >
      {/* File Icon/Thumbnail */}
      <div className="flex-shrink-0">
        {file.thumbnailUrl ? (
          <Image
            src={file.thumbnailUrl}
            alt={file.name}
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-600 dark:to-surface-700 rounded-lg flex items-center justify-center">
            <Icon name={getFileIcon(file.type)} className="w-5 h-5 sm:w-6 sm:h-6 text-surface-600 dark:text-surface-300" />
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <Heading level={6} className="truncate">
            {file.name}
          </Heading>
          {file.status !== 'pending' && statusIcon[file.status] && (
            <Icon name={statusIcon[file.status].name} className={`w-4 h-4 flex-shrink-0 ${statusIcon[file.status].className}`} />
          )}
        </div>
        <Paragraph className="text-xs text-surface-600 dark:text-surface-400 mb-2">
          {formatFileSize(file.size)}
        </Paragraph>
        
        {/* Progress Bar */}
        {(file.status === 'uploading' || file.status === 'completed') && (
          <ProgressBar progress={uploadProgress[file.id] || 0} />
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        {file.status === 'pending' && (
          <Button onClick={() => onRemove(file.id)} className="p-1 sm:p-2 text-surface-400 hover:text-red-500 transition-colors" variant="text">
            <Icon name="X" className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default FileCard;