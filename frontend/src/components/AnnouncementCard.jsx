import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAnnouncements, createAnnouncement } from '../api/announcements'
import { getTasks } from '../api/tasks'

export default function AnnouncementCard() {
  const [items, setItems] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
    if (!user) return
    ;(async () => {
      try {
        const [a, t] = await Promise.all([
          getAnnouncements(user.userId),
          getTasks(user.userId),
        ])
        setItems(a)
        setTasks(t)
      } catch {
        setItems([])
        setTasks([])
      }
    })()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
    if (!user || !selectedTaskId || !message.trim()) return
    setSubmitting(true)
    try {
      const task = tasks.find(t => t.taskId === Number(selectedTaskId))
      const payload = {
        title: task ? `Update: ${task.title}` : 'Task update',
        content: message,
      }
      const saved = await createAnnouncement(user.userId, payload, Number(selectedTaskId))
      setItems(prev => [saved, ...prev])
      setMessage('')
      setSelectedTaskId('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card title="Announcement">
      {items.length === 0 ? (
        <div style={{ color:'#64748b', marginBottom:12 }}>Nothing so far...</div>
      ) : (
        <div style={{ display:'grid', gap:8, marginBottom:12 }}>
          {items.map(a => (
            <div key={a.announcementId} style={{ padding:12, border:'1px solid #e5e7eb', borderRadius:8 }}>
              <div style={{ fontWeight:700 }}>{a.title}</div>
              {a.taskTitle && (
                <div style={{ color:'#6b7280', fontSize:12, marginBottom:4 }}>
                  Task: {a.taskTitle}
                  {a.taskCategoryName ? ` · ${a.taskCategoryName}` : ''}
                </div>
              )}
              <div style={{ color:'#64748b' }}>{a.content}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={onCreate} style={{ display:'grid', gridTemplateColumns:'2fr 2fr auto', gap:8 }}>
        <select
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        >
          <option value="">Link to task...</option>
          {tasks.map(t => (
            <option key={t.taskId} value={t.taskId}>
              {t.title}
            </option>
          ))}
        </select>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Announcement message"
          style={{ padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
        <button
          type="submit"
          disabled={submitting || !selectedTaskId || !message.trim()}
          style={{ padding:'8px 12px', borderRadius:8, border:'none', background:'#3f5d2a', color:'#fff', fontWeight:600 }}
        >
          Post
        </button>
      </form>
    </Card>
  )
}
