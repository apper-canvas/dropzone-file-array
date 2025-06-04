import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { fileService, uploadSessionService } from '../services'

function MainFeature() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [currentSession, setCurrentSession] = useState(null)
  const fileInputRef = useRef(null)

  const maxFileSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = ['image/*', 'application/pdf', 'text/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

  const validateFile = (file) => {
    if (file.size > maxFileSize) {
      toast.error(`File "${file.name}" exceeds maximum size of 50MB`)
      return false
    }
    return true
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(validateFile)
    
    const fileObjects = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      thumbnailUrl: null
    }))

    setFiles(prev => [...prev, ...fileObjects])

    // Generate thumbnails for images
    fileObjects.forEach(fileObj => {
      if (fileObj.type.startsWith('image/')) {
        generateThumbnail(fileObj)
      }
    })

    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) added to upload queue`)
    }
  }

  const generateThumbnail = (fileObj) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id 
          ? { ...f, thumbnailUrl: e.target.result }
          : f
      ))
    }
    reader.readAsDataURL(fileObj.file)
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[fileId]
      return newProgress
    })
  }

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.warning('Please select files to upload')
      return
    }

    setIsUploading(true)
    
    try {
      // Create upload session
      const session = await uploadSessionService.create({
        files: files.map(f => f.id),
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
        startTime: new Date().toISOString(),
        status: 'active'
      })
      setCurrentSession(session)

      // Upload files one by one with progress simulation
      for (const fileObj of files) {
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, status: 'uploading' } : f
        ))

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => ({ ...prev, [fileObj.id]: progress }))
          await new Promise(resolve => setTimeout(resolve, 100))
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
        })

        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'completed', serverFile: uploadedFile }
            : f
        ))
      }

      // Complete session
      await uploadSessionService.update(session.id, {
        endTime: new Date().toISOString(),
        status: 'completed'
      })

      toast.success(`Successfully uploaded ${files.length} file(s)`)
      
      // Clear files after successful upload
      setTimeout(() => {
        setFiles([])
        setUploadProgress({})
        setCurrentSession(null)
      }, 2000)

    } catch (error) {
      toast.error('Upload failed: ' + error.message)
      setFiles(prev => prev.map(f => ({ ...f, status: 'failed' })))
    } finally {
      setIsUploading(false)
    }
  }

  const clearAll = () => {
    setFiles([])
    setUploadProgress({})
    setCurrentSession(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image'
    if (type.includes('pdf')) return 'FileText'
    if (type.includes('word') || type.includes('document')) return 'FileType'
    if (type.startsWith('text/')) return 'File'
    return 'File'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const totalFiles = files.length
  const completedFiles = files.filter(f => f.status === 'completed').length
  const overallProgress = totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0

  return (
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
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={allowedTypes.join(',')}
          disabled={isUploading}
        />

        <div className="space-y-4 sm:space-y-6">
          <motion.div
            animate={{ 
              scale: isDragging ? 1.1 : 1,
              rotate: isDragging ? 5 : 0 
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg"
          >
            <ApperIcon 
              name={isDragging ? "Download" : "Upload"} 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
            />
          </motion.div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-2 sm:mb-3">
              {isDragging ? 'Drop files here!' : 'Drag & drop your files'}
            </h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              or click to browse your device
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-surface-500 dark:text-surface-400">
              <span className="flex items-center space-x-1">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-secondary" />
                <span>Max 50MB per file</span>
              </span>
              <span className="flex items-center space-x-1">
                <ApperIcon name="Shield" className="w-4 h-4 text-secondary" />
                <span>Secure upload</span>
              </span>
              <span className="flex items-center space-x-1">
                <ApperIcon name="Zap" className="w-4 h-4 text-secondary" />
                <span>Lightning fast</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* File Queue */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 sm:mt-8"
          >
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              {/* Queue Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white">
                    Upload Queue ({files.length} files)
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Total size: {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearAll}
                    disabled={isUploading}
                    className="px-4 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors disabled:opacity-50"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={uploadFiles}
                    disabled={isUploading || files.length === 0}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                  >
                    {isUploading ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Upload" className="w-4 h-4" />
                        <span>Upload All</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Overall Progress */}
              {isUploading && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-surface-900 dark:text-white">
                      Overall Progress
                    </span>
                    <span className="text-sm text-surface-600 dark:text-surface-400">
                      {completedFiles}/{totalFiles} files
                    </span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full transition-all duration-300"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* File List */}
              <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto file-list">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="file-card flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700"
                  >
                    {/* File Icon/Thumbnail */}
                    <div className="flex-shrink-0">
                      {file.thumbnailUrl ? (
                        <img
                          src={file.thumbnailUrl}
                          alt={file.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-600 dark:to-surface-700 rounded-lg flex items-center justify-center">
                          <ApperIcon name={getFileIcon(file.type)} className="w-5 h-5 sm:w-6 sm:h-6 text-surface-600 dark:text-surface-300" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        {file.status === 'completed' && (
                          <ApperIcon name="CheckCircle" className="w-4 h-4 text-secondary flex-shrink-0" />
                        )}
                        {file.status === 'failed' && (
                          <ApperIcon name="XCircle" className="w-4 h-4 text-red-500 flex-shrink-0" />
                        )}
                        {file.status === 'uploading' && (
                          <ApperIcon name="Loader2" className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-surface-600 dark:text-surface-400 mb-2">
                        {formatFileSize(file.size)}
                      </p>
                      
                      {/* Progress Bar */}
                      {(file.status === 'uploading' || file.status === 'completed') && (
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-1.5">
                          <div 
                            className="progress-bar h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.id] || 0}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0">
                      {file.status === 'pending' && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 sm:p-2 text-surface-400 hover:text-red-500 transition-colors"
                        >
                          <ApperIcon name="X" className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature