import React from 'react';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import ProgressBar from '../atoms/ProgressBar';

const FileQueueHeader = ({
  filesLength,
  totalSize,
  formatFileSize,
  clearAll,
  uploadFiles,
  isUploading,
  overallProgress,
  completedFiles,
  totalFiles,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
      <div>
        <Heading level={4} className="mb-1">
          Upload Queue ({filesLength} files)
        </Heading>
        <Paragraph className="text-sm text-surface-600 dark:text-surface-400">
          Total size: {formatFileSize(totalSize)}
        </Paragraph>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={clearAll}
          disabled={isUploading}
          variant="text"
          className="disabled:opacity-50"
        >
          Clear All
        </Button>
        <Button
          onClick={uploadFiles}
          disabled={isUploading || filesLength === 0}
          variant="primary"
          icon={isUploading ? "Loader2" : "Upload"}
          className="disabled:opacity-50 disabled:transform-none"
        >
          {isUploading ? (
            <>
              <Icon name="Loader2" className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Icon name="Upload" className="w-4 h-4" />
              <span>Upload All</span>
            </>
          )}
        </Button>
      </div>

      {/* Overall Progress */}
      {isUploading && (
        <div className="absolute top-full left-0 right-0 mt-4 sm:mt-6 px-4 sm:px-6">
          <div className="flex items-center justify-between mb-2">
            <Paragraph className="text-sm font-medium text-surface-900 dark:text-white">
              Overall Progress
            </Paragraph>
            <Paragraph className="text-sm text-surface-600 dark:text-surface-400">
              {completedFiles}/{totalFiles} files
            </Paragraph>
          </div>
          <ProgressBar progress={overallProgress} />
        </div>
      )}
    </div>
  );
};

export default FileQueueHeader;