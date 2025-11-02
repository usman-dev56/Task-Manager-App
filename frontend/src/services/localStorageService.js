const STORAGE_KEY = 'taskManager_tasks'

export const localStorageService = {
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEY)
      return tasks ? JSON.parse(tasks) : []
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error)
      return []
    }
  },

  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  },

  clearTasks: () => {
    localStorage.removeItem(STORAGE_KEY)
  }
}