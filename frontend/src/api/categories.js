// import apiClient from '../lib/apiClient.js'

// export async function getCategories() {
//   const response = await apiClient.get('/categories')
//   return response.data
// }

// export async function createCategory(payload) {
//   const response = await apiClient.post('/categories', payload)
//   return response.data
// }

// export async function updateCategory(id, payload) {
//   const response = await apiClient.put(`/categories/${id}`, payload)
//   return response.data
// }

// export async function deleteCategory(id) {
//   await apiClient.delete(`/categories/${id}`)
// }


import apiClient from '../lib/apiClient.js'

export async function getCategories() {
  const response = await apiClient.get('/categories')
  return response.data
}

export async function createCategory(payload) {
  const response = await apiClient.post('/categories', payload)
  return response.data
}

export async function updateCategory(id, payload) {
  const response = await apiClient.put(`/categories/${id}`, payload)
  return response.data
}

export async function deleteCategory(id) {
  try {
    await apiClient.delete(`/categories/${id}`)
  } catch (error) {
    // Re-throw with a more descriptive message
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Failed to delete category'
      throw new Error(errorMessage)
    }
    throw error
  }
}
