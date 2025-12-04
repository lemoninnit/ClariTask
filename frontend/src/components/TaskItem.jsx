import React, { useState } from 'react'
import styles from './TaskItem.module.css'
import { updateTask, deleteTask, completeTask } from '../api/tasks'

export default function TaskItem({ title, dueDate, dueTime, status, categoryName, taskId }) {
  const css = styles || {}
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ title, dueDate, dueTime, status })
  const [busy, setBusy] = useState(false)

  const onSave = async () => {
    setBusy(true)
    try {
      await updateTask(taskId, { title: form.title, description:'', dueDate: form.dueDate, dueTime: form.dueTime, status: form.status })
      window.location.reload()
    } finally { setBusy(false) }
  }

  const onDelete = async () => {
    if (!confirm('Delete this task?')) return
    setBusy(true)
    try { await deleteTask(taskId); window.location.reload() } finally { setBusy(false) }
  }

  const onComplete = async () => {
    setBusy(true)
    try { await completeTask(taskId); window.location.reload() } finally { setBusy(false) }
  }
  return (
    <div className={css.item || ''}>
      {editing ? (
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr auto auto', gap:8 }}>
          <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }} />
          <input type="date" value={form.dueDate||''} onChange={(e)=>setForm({...form, dueDate:e.target.value})} style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }} />
          <input type="time" value={form.dueTime||''} onChange={(e)=>setForm({...form, dueTime:e.target.value})} style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }} />
          <select value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})} style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={onSave} disabled={busy} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:'#3f5d2a', color:'#fff', fontWeight:600 }}>Save</button>
          <button onClick={()=>setEditing(false)} style={{ padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', background:'#fff', color:'#334155' }}>Cancel</button>
        </div>
      ) : (
        <>
          <div className={css.title || ''}>{title}</div>
          <div className={css.meta || ''}>
            {categoryName ? `${categoryName} · ` : ''}
            Due: {dueDate || '—'}{dueTime ? ` ${dueTime}` : ''} · {status}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <button onClick={()=>setEditing(true)} style={{ padding:'6px 10px', border:'1px solid #e5e7eb', background:'#fff', borderRadius:8 }}>Edit</button>
            <button onClick={onComplete} disabled={busy} style={{ padding:'6px 10px', border:'1px solid #e5e7eb', background:'#fff', borderRadius:8 }}>Complete</button>
            <button onClick={onDelete} disabled={busy} style={{ padding:'6px 10px', border:'1px solid #ef4444', color:'#ef4444', background:'#fff', borderRadius:8 }}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
