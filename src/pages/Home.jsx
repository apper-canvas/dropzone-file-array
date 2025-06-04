import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { fileService } from '../services'

function Home() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    recentUploads: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        const files = await fileService.getAll()
        const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0)
        const recentUploads = files.filter(file => {
          const uploadDate = new Date(file.uploadDate)
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
          return uploadDate > dayAgo
        }).length

        setStats({
          totalFiles: files.length,
          totalSize,
          recentUploads
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-white/20 dark:border-surface-700/30 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Upload" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DropZone
                </h1>
                <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 hidden sm:block">
                  Effortless file management
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6">
              {!loading && !error && (
                <div className="hidden sm:flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-300">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Files" className="w-4 h-4" />
                    <span>{stats.totalFiles} files</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="HardDrive" className="w-4 h-4" />
                    <span>{formatFileSize(stats.totalSize)}</span>
                  </div>
                </div>
              )}
              
              <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                <ApperIcon name="Settings" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6">
              Upload Files with{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Lightning Speed
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed">
              Drag, drop, and manage your files effortlessly. Experience the fastest and most intuitive 
              file upload platform designed for modern workflows.
            </p>
          </motion.div>

          {/* Stats Cards - Mobile Friendly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <div className="glass-card rounded-2xl p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ApperIcon name="Files" className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                {loading ? '...' : stats.totalFiles}
              </div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Total Files</div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ApperIcon name="HardDrive" className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                {loading ? '...' : formatFileSize(stats.totalSize)}
              </div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Storage Used</div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 text-center sm:col-span-1 col-span-1">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ApperIcon name="Clock" className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                {loading ? '...' : stats.recentUploads}
              </div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Recent Uploads</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <section className="pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-surface-50 via-white to-surface-50 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Why Choose DropZone?
            </h3>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Built for speed, designed for simplicity, and optimized for your workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: 'Zap',
                title: 'Lightning Fast',
                description: 'Upload multiple files simultaneously with optimized performance and real-time progress tracking.'
              },
              {
                icon: 'Shield',
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with automatic file validation and error handling for peace of mind.'
              },
              {
                icon: 'Smartphone',
                title: 'Cross-Platform',
                description: 'Works seamlessly across all devices and browsers with responsive design and touch support.'
              },
              {
                icon: 'Eye',
                title: 'Smart Preview',
                description: 'Instant file previews with thumbnail generation and metadata extraction for better organization.'
              },
              {
                icon: 'BarChart3',
                title: 'Analytics',
                description: 'Track upload history, monitor storage usage, and analyze file management patterns.'
              },
              {
                icon: 'Palette',
                title: 'Beautiful UI',
                description: 'Carefully crafted interface with glassmorphism effects and smooth animations for delightful experience.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <ApperIcon name="Upload" className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900 dark:text-white">DropZone</span>
            </div>
            <p className="text-surface-600 dark:text-surface-400 text-sm text-center sm:text-right">
              © 2024 DropZone. Simplifying file management for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home