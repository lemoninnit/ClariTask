const BASE = 'http://localhost:8080/api'

export async function getAnnouncements(userId) {
  const r = await fetch(`${BASE}/announcements?userId=${userId}`)
  if (!r.ok) throw new Error('Failed to load announcements')
  return r.json()
}

export async function createAnnouncement(userId, payload, taskId) {
  const qs = new URLSearchParams({ userId: String(userId), ...(taskId ? { taskId: String(taskId) } : {}) })
  const r = await fetch(`${BASE}/announcements?${qs.toString()}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create announcement')
  return r.json()
}

export async function deleteAnnouncement(id) {
  const r = await fetch(`${BASE}/announcements/${id}`, { method:'DELETE' })
  if (!r.ok) throw new Error('Failed to delete announcement')
}