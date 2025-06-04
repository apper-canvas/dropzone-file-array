import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { fileService, uploadSessionService } from '../../services';

import Card from '../atoms/Card';
import UploadZoneInput from '../molecules/UploadZoneInput';
import UploadZoneContent from '../molecules/UploadZoneContent';
import FileCard from '../molecules/FileCard';
import FileQueueHeader from '../molecules/FileQueueHeader';

function MainFeatureSection() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentSession, setCurrentSession] = useState(null);
  const fileInputRef = useRef(null);

  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['image/*', 'application/pdf', 'text/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const validateFile = (file) => {
    if (file.size > maxFileSize) {
      toast.error(`File "${file.name}" exceeds maximum size of 50MB`);
      return false;
    }
    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(validateFile);
    
    const fileObjects = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      thumbnailUrl: null
    }));

    setFiles(prev => [...prev, ...fileObjects]);

    // Generate thumbnails for images
    fileObjects.forEach(fileObj => {
      if (fileObj.type.startsWith('image/')) {
        generateThumbnail(fileObj);
      }
    });

    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) added to upload queue`);
    }
  };

  const generateThumbnail = (fileObj) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id 
          ? { ...f, thumbnailUrl: e.target.result }
          : f
      ));
    };
    reader.readAsDataURL(fileObj.file);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.warning('Please select files to upload');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create upload session
      const session = await uploadSessionService.create({
        files: files.map(f => f.id),
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
        startTime: new Date().toISOString(),
        status: 'active'
      });
      setCurrentSession(session);

      // Upload files one by one with progress simulation
      for (const fileObj of files) {
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, status: 'uploading' } : f
        ));

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => ({ ...prev, [fileObj.id]: progress }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Create file record
        const uploadedFile = await fileService.create({
          name: fileObj.name,
          size: fileObj.size,
          type: fileObj.type,
          uploadDate: new Date().toISOString(),
          status: 'completed',
          progress: 100,
          url: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop`,
          thumbnailUrl: fileObj.thumbnailUrl || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop`
        });

        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'completed', serverFile: uploadedFile }
            : f
        ));
      }

      // Complete session
      await uploadSessionService.update(session.id, {
        endTime: new Date().toISOString(),
        status: 'completed'
      });

      toast.success(`Successfully uploaded ${files.length} file(s)`);
      
      // Clear files after successful upload
      setTimeout(() => {
        setFiles([]);
        setUploadProgress({});
        setCurrentSession(null);
      }, 2000);

    } catch (error) {
      toast.error('Upload failed: ' + error.message);
      setFiles(prev => prev.map(f => ({ ...f, status: 'failed' })));
    } finally {
      setIsUploading(false);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setUploadProgress({});
    setCurrentSession(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalFilesCount = files.length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const overallProgress = totalFilesCount > 0 ? (completedFiles / totalFilesCount) * 100 : 0;
  const totalQueueSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <section className="pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              drag-zone relative border-2 border-dashed rounded-3xl p-8 sm:p-12 lg:p-16 text-center transition-all duration-300
              ${isDragging 
                ? 'border-primary bg-primary/5 scale-105 shadow-glass' 
                : 'border-surface-300 dark:border-surface-600 hover:border-primary/50 hover:bg-surface-50/50 dark:hover:bg-surface-800/50'
              }
              ${isUploading ? 'pointer-events-none opacity-75' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadZoneInput 
              ref={fileInputRef}
              handleFileInput={handleFileInput}
              allowedTypes={allowedTypes}
              isUploading={isUploading}
            />
            <UploadZoneContent isDragging={isDragging} />
          </motion.div>

          {/* File Queue */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 sm:mt-8 relative" // Added relative for absolute positioning of progress bar
              >
                <Card className="p-4 sm:p-6">
                  {/* Queue Header */}
                  <FileQueueHeader
                    filesLength={totalFilesCount}
                    totalSize={totalQueueSize}
                    formatFileSize={formatFileSize}
                    clearAll={clearAll}
                    uploadFiles={uploadFiles}
                    isUploading={isUploading}
                    overallProgress={overallProgress}
                    completedFiles={completedFiles}
                    totalFiles={totalFilesCount}
                  />

                  {/* File List */}
                  <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto file-list pt-4"> {/* Added padding top for overall progress bar */}
                    {files.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        formatFileSize={formatFileSize}
                        uploadProgress={uploadProgress}
                        onRemove={removeFile}
                        isUploading={isUploading}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default MainFeatureSection;