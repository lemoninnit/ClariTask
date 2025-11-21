const BASE = 'http://localhost:8080/api'

export async function getAttachments() {
  const r = await fetch(`${BASE}/attachments`)
  if (!r.ok) throw new Error('Failed to load attachments')
  return r.json()
}

export async function createAttachment(payload) {
  const r = await fetch(`${BASE}/attachments`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create attachment')
  return r.json()
}

export async function deleteAttachment(id) {
  const r = await fetch(`${BASE}/attachments/${id}`, { method:'DELETE' })
  if (!r.ok) throw new Error('Failed to delete attachment')
}