const BASE = 'http://localhost:8080/api'

export async function updateUser(id, payload) {
  const r = await fetch(`${BASE}/users/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to update user')
  return r.json()
}