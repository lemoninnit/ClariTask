import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
 
import Button from '../components/Button'
import Card from '../components/Card'
import { createTask } from '../api/tasks'
import { getCategories } from '../api/categories'

export default function Tasks() {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const list = await getCategories()
        setCategories(list)
      } catch {
        setCategories([])
      }
    })()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)
    try {
      const user = JSON.parse(localStorage.getItem('ct_user'))
      const payload = {
        title,
        description: '',
        dueDate,
        status,
        user: { userId: user?.userId || 1 },
        category: categoryId ? { categoryId: Number(categoryId) } : null,
      }
      const saved = await createTask(payload)
      const list = JSON.parse(localStorage.getItem('ct_tasks') || '[]')
      localStorage.setItem('ct_tasks', JSON.stringify([saved, ...list]))
      setTitle('')
      setDueDate('')
      setStatus('pending')
      setCategoryId('')
      window.location.href = '/dashboard'
    } finally {
      setCreating(false)
    }
  }

  return (
    <AppLayout>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <h1 style={{ fontWeight:800, fontSize:28, color:'#0f172a' }}>Create Task</h1>
        <Card>
          <form
            onSubmit={onCreate}
            style={{ marginTop:16, display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr auto', gap:8 }}
          >
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
            <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
            <select value={status} onChange={(e)=>setStatus(e.target.value)} style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }}
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button type="submit" disabled={creating}>Add</Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
