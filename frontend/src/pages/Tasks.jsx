import React, { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
 
import Button from '../components/Button'
import Card from '../components/Card'
import { createTask } from '../api/tasks'

export default function Tasks() {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [creating, setCreating] = useState(false)

  const onCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)
    try {
      const user = JSON.parse(localStorage.getItem('ct_user'))
      const saved = await createTask({ title, description:'', dueDate, status, user:{ userId: user?.userId || 1 } })
      const list = JSON.parse(localStorage.getItem('ct_tasks') || '[]')
      localStorage.setItem('ct_tasks', JSON.stringify([saved, ...list]))
      setTitle(''); setDueDate(''); setStatus('pending')
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
          <form onSubmit={onCreate} style={{ marginTop:16, display:'grid', gridTemplateColumns:'2fr 1fr 1fr auto', gap:8 }}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
            <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
            <select value={status} onChange={(e)=>setStatus(e.target.value)} style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Button type="submit" disabled={creating}>Add</Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
