import React, { useState } from 'react'
import styles from './TaskItem.module.css'
import { completeTask } from '../api/tasks'
import { Edit2, Trash2, CheckCircle2 } from 'lucide-react'

export default function TaskItem({ title, dueDate, status, categoryName, taskId, description, onEdit, onDelete }) {
  const css = styles || {}
  const [busy, setBusy] = useState(false)

  const onComplete = async () => {
    if (status === 'completed') return
    setBusy(true)
    try { 
      await completeTask(taskId)
      // Refresh page to show new notification
      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      alert('Failed to complete task')
      setBusy(false)
    }
  }

  const formatDisplayDate = (dateTimeStr) => {
    if (!dateTimeStr) return '—'
    try {
      const date = new Date(dateTimeStr)
      if (isNaN(date.getTime())) {
        return dateTimeStr // Return original if invalid
      }
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateTimeStr
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981'
      case 'in_progress': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  return (
    <div className={css.item || ''} style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 16,
      background: status === 'completed' ? '#f9fafb' : '#fff',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            marginBottom: 8 
          }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: '#0f172a', 
              margin: 0,
              textDecoration: status === 'completed' ? 'line-through' : 'none',
              opacity: status === 'completed' ? 0.6 : 1
            }}>
              {title}
            </h3>
            {status === 'completed' && (
              <CheckCircle2 size={16} color="#10b981" />
            )}
          </div>
          
          {description && (
            <p style={{ 
              color: '#6b7280', 
              fontSize: 14, 
              margin: '0 0 8px 0',
              lineHeight: 1.5
            }}>
              {description}
            </p>
          )}
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            fontSize: 13, 
            color: '#64748b' 
          }}>
            {categoryName && (
              <span style={{
                padding: '2px 8px',
                background: '#f1f5f9',
                borderRadius: 4,
                fontSize: 12
              }}>
                {categoryName}
              </span>
            )}
            <span>Due: {formatDisplayDate(dueDate)}</span>
            <span style={{
              padding: '2px 8px',
              background: getStatusColor(status) + '20',
              color: getStatusColor(status),
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize'
            }}>
              {status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          {onEdit && (
            <button 
              onClick={() => onEdit(taskId)}
              style={{ 
                padding: '6px', 
                border: '1px solid #e5e7eb', 
                background: '#fff', 
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              title="Edit"
            >
              <Edit2 size={16} color="#6b7280" />
            </button>
          )}
          {status !== 'completed' && (
            <button 
              onClick={onComplete} 
              disabled={busy}
              style={{ 
                padding: '6px', 
                border: '1px solid #10b981', 
                background: '#fff', 
                borderRadius: 6,
                cursor: busy ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: busy ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!busy) {
                  e.currentTarget.style.background = '#10b981'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!busy) {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
              title="Complete"
            >
              <CheckCircle2 size={16} color={busy ? '#6b7280' : '#10b981'} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(taskId)} 
              disabled={busy}
              style={{ 
                padding: '6px', 
                border: '1px solid #ef4444', 
                color: '#ef4444', 
                background: '#fff', 
                borderRadius: 6,
                cursor: busy ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: busy ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!busy) {
                  e.currentTarget.style.background = '#ef4444'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!busy) {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.color = '#ef4444'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
