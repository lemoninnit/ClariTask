const BASE = 'http://localhost:8080/api'

export async function getAnnouncements() {
  const r = await fetch(`${BASE}/announcements`)
  if (!r.ok) throw new Error('Failed to load announcements')
  return r.json()
}

export async function createAnnouncement(payload) {
  const r = await fetch(`${BASE}/announcements`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create announcement')
  return r.json()
}

export async function deleteAnnouncement(id) {
  const r = await fetch(`${BASE}/announcements/${id}`, { method:'DELETE' })
  if (!r.ok) throw new Error('Failed to delete announcement')
}