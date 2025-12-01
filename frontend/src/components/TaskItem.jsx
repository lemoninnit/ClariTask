import React from 'react'
import styles from './TaskItem.module.css'

export default function TaskItem({ title, dueDate, status, categoryName }) {
  const css = styles || {}
  return (
    <div className={css.item || ''}>
      <div className={css.title || ''}>{title}</div>
      <div className={css.meta || ''}>
        {categoryName ? `${categoryName} · ` : ''}
        Due: {dueDate || '—'} · {status}
      </div>
    </div>
  )
}
