import React from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>CT</div>
      <nav className={styles.nav}> 
        <a href="/dashboard" className={styles.link}>Dashboard</a>
        <a href="/tasks" className={styles.link}>Tasks</a>
        <a href="/calendar" className={styles.link}>Calendar</a>
        <a href="/profile" className={styles.link}>Profile</a>
      </nav>
      <div className={styles.bottom}></div>
    </aside>
  )
}