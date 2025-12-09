import React from 'react'
import Card from './Card'
import { deleteAnnouncement } from '../api/announcements'
import { useAuth } from '../contexts/AuthContext'
import { Trash2 } from 'lucide-react'

export default function AnnouncementCard({ announcement, onDelete }) {
  const { user, isTeacher } = useAuth()
  const isOwner = user?.userId === announcement.userId

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return
    }
    try {
      await deleteAnnouncement(announcement.announcementId)
      if (onDelete) onDelete()
    } catch (error) {
      alert('Failed to delete announcement')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString // Return original if invalid
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        {(isTeacher && isOwner) && (
          <button
            onClick={handleDelete}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'none',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Trash2 size={18} />
          </button>
        )}
        
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#0f172a', marginBottom: '4px' }}>
            {announcement.title}
          </h3>
          {announcement.createdAt && (
            <div style={{ color: '#6b7280', fontSize: '12px' }}>
              {formatDate(announcement.createdAt)}
            </div>
          )}
        </div>

        {announcement.taskTitle && (
          <div style={{ 
            display: 'inline-block',
            padding: '4px 8px',
            background: '#eff6ff',
            color: '#1e40af',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}>
            Task: {announcement.taskTitle}
            {announcement.taskCategoryName && ` · ${announcement.taskCategoryName}`}
          </div>
        )}

        <div style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {announcement.content}
        </div>
      </div>
    </Card>
  )
}
