// File service for managing file uploads and metadata
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let filesData = null

const loadData = async () => {
  if (!filesData) {
    const module = await import('../mockData/files.json')
    filesData = [...module.default]
  }
  return filesData
}

export const fileService = {
  async getAll() {
    await delay(300)
    const data = await loadData()
    return [...data]
  },

  async getById(id) {
    await delay(200)
    const data = await loadData()
    const file = data.find(item => item.id === id)
    if (!file) {
      throw new Error('File not found')
    }
    return { ...file }
  },

  async create(item) {
    await delay(400)
    const data = await loadData()
    const newFile = {
      id: Date.now().toString(),
      ...item,
      uploadDate: item.uploadDate || new Date().toISOString(),
      status: item.status || 'completed',
      progress: item.progress || 100
    }
    data.push(newFile)
    filesData = data
    return { ...newFile }
  },

  async update(id, updates) {
    await delay(300)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('File not found')
    }
    data[index] = { ...data[index], ...updates }
    filesData = data
    return { ...data[index] }
  },

  async delete(id) {
    await delay(250)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('File not found')
    }
    const deletedFile = data.splice(index, 1)[0]
    filesData = data
    return { ...deletedFile }
  }
}