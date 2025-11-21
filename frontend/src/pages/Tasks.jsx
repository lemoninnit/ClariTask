import React, { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import styles from './Tasks.module.css'
import Button from '../components/Button'
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
      <div className={styles.container}>
        <h1 className={styles.title}>Create Task</h1>
        <form onSubmit={onCreate} className={styles.form}>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" className={styles.input} />
          <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} className={styles.input} />
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className={styles.input}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <Button type="submit" disabled={creating}>Add</Button>
        </form>
      </div>
    </AppLayout>
  )
}