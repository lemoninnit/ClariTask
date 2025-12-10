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
  try {
    await apiClient.delete('/users/me')
  } catch (error) {
    // Re-throw with a more descriptive message
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Failed to delete account'
      throw new Error(errorMessage)
    }
    throw error
  }
}
