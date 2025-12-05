import apiClient from '../lib/apiClient.js'

export async function getAnnouncements() {
  const response = await apiClient.get('/announcements')
  return response.data
}

export async function createAnnouncement(payload, taskId) {
  const params = taskId ? { taskId } : {}
  const response = await apiClient.post('/announcements', payload, { params })
  return response.data
}

export async function updateAnnouncement(id, payload) {
  const response = await apiClient.put(`/announcements/${id}`, payload)
  return response.data
}

export async function deleteAnnouncement(id) {
  await apiClient.delete(`/announcements/${id}`)
}
