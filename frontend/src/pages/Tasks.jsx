import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
 
import Button from '../components/Button'
import Card from '../components/Card'
import { createTask } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'

export default function Tasks() {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueTime, setDueTime] = useState('')
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [creating, setCreating] = useState(false)
  const [newCat, setNewCat] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
        if (!user) return
        const list = await getCategories(user.userId)
        setCategories(list)
      } catch {
        setCategories([])
      }
    })()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!title.trim()) nextErrors.title = 'Title is required'
    if (!dueDate) nextErrors.dueDate = 'Deadline date is required'
    if (!dueTime) nextErrors.dueTime = 'Deadline time is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setCreating(true)
    try {
      const user = JSON.parse(localStorage.getItem('ct_user'))
      const payload = {
        title,
        description: '',
        dueDate,
        dueTime,
        status,
        user: { userId: user?.userId || 1 },
        category: categoryId ? { categoryId: Number(categoryId) } : null,
      }
      const saved = await createTask(payload)
      const list = JSON.parse(localStorage.getItem('ct_tasks') || '[]')
      localStorage.setItem('ct_tasks', JSON.stringify([saved, ...list]))
      setTitle('')
      setDueDate('')
      setDueTime('')
      setStatus('pending')
      setCategoryId('')
      window.location.href = '/dashboard'
    } finally {
      setCreating(false)
    }
  }

  const onAddCategory = async (e) => {
    e.preventDefault()
    if (!newCat.trim()) return
    try {
      const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
      if (!user) return
      const saved = await createCategory(user.userId, { name: newCat })
      setCategories(prev => [...prev, saved])
      setNewCat('')
      setCategoryId(saved.categoryId)
    } catch {
      // keep existing categories on error
    }
  }

  return (
    <AppLayout>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <h1 style={{ fontWeight:800, fontSize:28, color:'#0f172a' }}>Create Task</h1>
        <Card>
          <form
            onSubmit={onCreate}
            style={{ marginTop:16, display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.2fr 1.2fr auto', gap:8 }}
          >
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" style={{ padding:10, border: (errors.title?'1px solid #ef4444':'1px solid #e5e7eb'), borderRadius:8 }} />
            <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} style={{ padding:10, border: (errors.dueDate?'1px solid #ef4444':'1px solid #e5e7eb'), borderRadius:8 }} />
            <input type="time" value={dueTime} onChange={(e)=>setDueTime(e.target.value)} style={{ padding:10, border: (errors.dueTime?'1px solid #ef4444':'1px solid #e5e7eb'), borderRadius:8 }} />
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

          {Object.values(errors).length > 0 && (
            <div style={{ color:'#ef4444', marginTop:8, fontSize:12 }}>
              {Object.values(errors).join(' · ')}
            </div>
          )}

          <form
            onSubmit={onAddCategory}
            style={{ marginTop:16, display:'grid', gridTemplateColumns:'1fr auto', gap:8 }}
          >
            <input
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="New category name"
              style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }}
            />
            <Button type="submit">Add Category</Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
