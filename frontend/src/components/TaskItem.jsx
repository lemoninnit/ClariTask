import React from 'react'
import styles from './TaskItem.module.css'

export default function TaskItem({ title, dueDate, status }) {
  return (
    <div className={styles.item}>
      <div className={styles.title}>{title}</div>
      <div className={styles.meta}>Due: {dueDate || '—'} · {status}</div>
    </div>
  )
}