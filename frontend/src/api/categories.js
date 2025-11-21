const BASE = 'http://localhost:8080/api'

export async function getCategories() {
  const r = await fetch(`${BASE}/categories`)
  if (!r.ok) throw new Error('Failed to load categories')
  return r.json()
}

export async function createCategory(payload) {
  const r = await fetch(`${BASE}/categories`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create category')
  return r.json()
}