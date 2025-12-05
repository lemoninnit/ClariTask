import apiClient from '../lib/apiClient.js'

export async function getCurrentUser() {
  const response = await apiClient.get('/users/me')
  return response.data
}

export async function updateCurrentUser(payload) {
  const response = await apiClient.put('/users/me', payload)
  return response.data
}

export async function deleteCurrentUser() {
  await apiClient.delete('/users/me')
}
