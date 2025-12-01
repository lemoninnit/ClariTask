const BASE = 'http://localhost:8080/api'

export async function getCategories(userId) {
  const r = await fetch(`${BASE}/categories?userId=${userId}`)
  if (!r.ok) throw new Error('Failed to load categories')
  return r.json()
}

export async function createCategory(userId, payload) {
  const r = await fetch(`${BASE}/categories?userId=${userId}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create category')
  return r.json()
}