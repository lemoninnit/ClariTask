import React from 'react'
import Card from './Card'
import Button from './Button'
import TaskItem from './TaskItem'

export default function TasksCard({ tasks=[], title, setTitle, dueDate, setDueDate, status, setStatus, onCreate, loading=false }) {
  return (
    <Card title="My Tasks" right={<span style={{ background:'#f1f5f9', color:'#475569', padding:'4px 12px', borderRadius:12, fontSize:14, fontWeight:600 }}>{tasks.length}</span>}>
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
            <TaskItem
              key={t.taskId}
              title={t.title}
              dueDate={t.dueDate}
              status={t.status}
              categoryName={t.categoryName}
            />
          ))
        )}
      </div>
    </Card>
  )
}
