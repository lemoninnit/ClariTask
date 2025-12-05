import React from 'react'
import Card from './Card'
import TaskItem from './TaskItem'
import { Clipboard } from 'lucide-react'

export default function TasksCard({ tasks = [], loading = false }) {
  return (
    <Card 
      title="My Tasks" 
      right={
        <span style={{ 
          background: '#f1f5f9', 
          color: '#475569', 
          padding: '4px 12px', 
          borderRadius: 12, 
          fontSize: 14, 
          fontWeight: 600 
        }}>
          {tasks.length}
        </span>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
          <Clipboard size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#f97316' }} />
          <p style={{ margin: 0, fontSize: 14 }}>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tasks.map(t => (
            <TaskItem
              key={t.taskId}
              title={t.title}
              description={t.description}
              dueDate={t.dueDate}
              status={t.status}
              categoryName={t.categoryName}
              taskId={t.taskId}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
