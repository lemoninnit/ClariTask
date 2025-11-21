const BASE = 'http://localhost:8080/api'

export async function getTasks() {
  const r = await fetch(`${BASE}/tasks`)
  if (!r.ok) throw new Error('Failed to load tasks')
  return r.json()
}

export async function createTask(payload) {
  const r = await fetch(`${BASE}/tasks`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to create task')
  return r.json()
}

export async function updateTask(id, payload) {
  const r = await fetch(`${BASE}/tasks/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Failed to update task')
  return r.json()
}

export async function deleteTask(id) {
  const r = await fetch(`${BASE}/tasks/${id}`, { method:'DELETE' })
  if (!r.ok) throw new Error('Failed to delete task')
}