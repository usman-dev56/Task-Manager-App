// import axios from 'axios'

// const API_URL = 'http://localhost:5000/api'

// const taskService = {
//   getTasks: async () => {
//     const response = await axios.get(`${API_URL}/tasks`)
//     return response.data
//   },

//   createTask: async (taskData) => {
//     const response = await axios.post(`${API_URL}/tasks`, taskData)
//     return response.data
//   },

//   updateTask: async (taskId, taskData) => {
//     const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData)
//     return response.data
//   },

//   deleteTask: async (taskId) => {
//     const response = await axios.delete(`${API_URL}/tasks/${taskId}`)
//     return response.data
//   },

//   toggleTask: async (taskId) => {
//     const response = await axios.patch(`${API_URL}/tasks/${taskId}/toggle`)
//     return response.data
//   }
// }

// export { taskService }




// Static data 

import { mockTasks } from '../data/mockData'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const taskService = {
  getTasks: async () => {
    await delay(500) // Simulate network delay
    return [...mockTasks] // Return copy of mock data
  },

  createTask: async (taskData) => {
    await delay(300)
    const newTask = {
      id: Date.now(), // Simple ID generation
      ...taskData,
      completed: false,
      createdAt: new Date()
    }
    return newTask
  },

  updateTask: async (taskId, taskData) => {
    await delay(300)
    const updatedTask = {
      id: taskId,
      ...taskData
    }
    return updatedTask
  },

  deleteTask: async (taskId) => {
    await delay(300)
    return { message: 'Task deleted successfully' }
  },

  toggleTask: async (taskId) => {
    await delay(300)
    // In real app, this would toggle completion status
    const task = mockTasks.find(t => t.id === taskId)
    return {
      ...task,
      completed: !task?.completed
    }
  }
}

export { taskService }