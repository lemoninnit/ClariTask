import React from 'react'
import styles from './CategoryChip.module.css'
import { Trash2 } from 'lucide-react'

export default function CategoryChip({ name, active = false, onClick, onDelete, categoryId }) {
  const css = styles || {}
  const base = css.chip || ''
  
  const handleDelete = (e) => {
    e.stopPropagation()
    if (onDelete && categoryId) {
      onDelete(categoryId)
    }
  }

  const style = {
    cursor: 'pointer',
    background: active ? '#3f5d2a' : '#e8f2e6',
    color: active ? '#ffffff' : '#2d4a1b',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    boxShadow: active ? '0 2px 6px rgba(63, 93, 42, 0.25)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: active ? 'none' : '1px solid rgba(63, 93, 42, 0.1)',
  }

  return (
    <span 
      className={base} 
      style={style} 
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = '#d1fae5'
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = '#e8f2e6'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
        }
      }}
    >
      <span>{name}</span>
      {categoryId && onDelete && name !== 'All' && (
        <button
          onClick={handleDelete}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            opacity: 0.7,
            transition: 'all 0.2s',
            marginLeft: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'scale(1.15)'
            e.currentTarget.style.background = active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'
          }}
          title="Delete category"
        >
          <Trash2 size={12} />
        </button>
      )}
    </span>
  )
}
