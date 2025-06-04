// Upload session service for tracking batch uploads
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let sessionsData = null

const loadData = async () => {
  if (!sessionsData) {
    const module = await import('../mockData/uploadSessions.json')
    sessionsData = [...module.default]
  }
  return sessionsData
}

export const uploadSessionService = {
  async getAll() {
    await delay(300)
    const data = await loadData()
    return [...data]
  },

  async getById(id) {
    await delay(200)
    const data = await loadData()
    const session = data.find(item => item.id === id)
    if (!session) {
      throw new Error('Upload session not found')
    }
    return { ...session }
  },

  async create(item) {
    await delay(250)
    const data = await loadData()
    const newSession = {
      id: Date.now().toString(),
      ...item,
      startTime: item.startTime || new Date().toISOString(),
      status: item.status || 'active'
    }
    data.push(newSession)
    sessionsData = data
    return { ...newSession }
  },

  async update(id, updates) {
    await delay(300)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Upload session not found')
    }
    data[index] = { ...data[index], ...updates }
    sessionsData = data
    return { ...data[index] }
  },

  async delete(id) {
    await delay(250)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Upload session not found')
    }
    const deletedSession = data.splice(index, 1)[0]
    sessionsData = data
    return { ...deletedSession }
  }
}