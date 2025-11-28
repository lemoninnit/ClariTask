import React from 'react'
import Card from './Card'
import Button from './Button'
import TaskItem from './TaskItem'

export default function TasksCard({ tasks=[], title, setTitle, dueDate, setDueDate, status, setStatus, onCreate, loading=false }) {
  return (
    <Card title="My Tasks" right={<span style={{ background:'#f1f5f9', color:'#475569', padding:'4px 12px', borderRadius:12, fontSize:14, fontWeight:600 }}>{tasks.length}</span>}>
      <form onSubmit={onCreate} style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:10, marginBottom:16 }}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a new task..." style={{ width:'100%', padding:'10px 12px', border:'1px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={{ padding:'10px 12px', border:'1px solid #e5e7eb', borderRadius:8 }} />
        <select value={status} onChange={e=>setStatus(e.target.value)} style={{ padding:'10px 12px', border:'1px solid #e5e7eb', borderRadius:8 }}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <Button type="submit">Add</Button>
      </form>
      <div style={{ display:'grid', gap:10 }}>
        {loading ? (
          <div style={{ textAlign:'center', padding:'48px 24px', color:'#64748b' }}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 24px', color:'#64748b' }}>
            <div style={{ fontSize:48, marginBottom:12, opacity:.5 }}>✓</div>
            <p>All caught up! No tasks yet.</p>
          </div>
        ) : (
          tasks.map(t => (
            <TaskItem key={t.taskId} title={t.title} dueDate={t.dueDate} status={t.status} />
          ))
        )}
      </div>
    </Card>
  )
}
