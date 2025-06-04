// File filter service for managing upload restrictions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let filtersData = null

const loadData = async () => {
  if (!filtersData) {
    const module = await import('../mockData/fileFilters.json')
    filtersData = [...module.default]
  }
  return filtersData
}

export const fileFilterService = {
  async getAll() {
    await delay(200)
    const data = await loadData()
    return [...data]
  },

  async getById(id) {
    await delay(150)
    const data = await loadData()
    const filter = data.find(item => item.id === id)
    if (!filter) {
      throw new Error('File filter not found')
    }
    return { ...filter }
  },

  async create(item) {
    await delay(300)
    const data = await loadData()
    const newFilter = {
      id: Date.now().toString(),
      ...item
    }
    data.push(newFilter)
    filtersData = data
    return { ...newFilter }
  },

  async update(id, updates) {
    await delay(250)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('File filter not found')
    }
    data[index] = { ...data[index], ...updates }
    filtersData = data
    return { ...data[index] }
  },

  async delete(id) {
    await delay(200)
    const data = await loadData()
    const index = data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('File filter not found')
    }
    const deletedFilter = data.splice(index, 1)[0]
    filtersData = data
    return { ...deletedFilter }
  }
}