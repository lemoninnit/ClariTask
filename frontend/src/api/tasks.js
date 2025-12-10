// import apiClient from '../lib/apiClient.js'

// export async function getTasks() {
//   const response = await apiClient.get('/tasks')
//   return response.data
// }

// export async function getTask(id) {
//   const response = await apiClient.get(`/tasks/${id}`)
//   return response.data
// }

// export async function createTask(payload) {
//   const response = await apiClient.post('/tasks', payload)
//   return response.data
// }

// export async function updateTask(id, payload) {
//   const response = await apiClient.put(`/tasks/${id}`, payload)
//   return response.data
// }

// export async function deleteTask(id) {
//   await apiClient.delete(`/tasks/${id}`)
// }

// export async function completeTask(id) {
//   const response = await apiClient.patch(`/tasks/${id}/complete`)
//   return response.data
// }

import apiClient from '../lib/apiClient.js'

export async function getTasks() {
  const response = await apiClient.get('/tasks')
  return response.data
}

export async function getTask(id) {
  const response = await apiClient.get(`/tasks/${id}`)
  return response.data
}

export async function createTask(payload) {
  const response = await apiClient.post('/tasks', payload)
  return response.data
}

export async function updateTask(id, payload) {
  const response = await apiClient.put(`/tasks/${id}`, payload)
  return response.data
}

export async function deleteTask(id) {
  try {
    await apiClient.delete(`/tasks/${id}`)
  } catch (error) {
    // Re-throw with a more descriptive message
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to delete task')
    }
    throw error
  }
}

export async function completeTask(id) {
  const response = await apiClient.patch(`/tasks/${id}/complete`)
  return response.data
}
