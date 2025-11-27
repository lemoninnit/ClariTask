import React from 'react'
import styles from './Sidebar.module.css'
import { LayoutDashboard, ListTodo, CalendarDays, Megaphone, User } from 'lucide-react'

export default function Sidebar() {
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
  const link = (href, label, Icon) => (
    <a href={href} className={`${styles.link} ${path === href ? styles.active : ''}`}>
      <Icon size={18} />
      <span>{label}</span>
    </a>
  )

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandRow}>
        <div className={styles.brandIcon}>C</div>
        <div className={styles.brandText}>ClariTasks</div>
      </div>
      <nav className={styles.nav}> 
        {link('/dashboard', 'Dashboard', LayoutDashboard)}
        {link('/tasks', 'Tasks', ListTodo)}
        {link('/calendar', 'Calendar', CalendarDays)}
        {link('/announcement', 'Announcement', Megaphone)}
        {link('/profile', 'Profile', User)}
      </nav>
      <div className={styles.bottom}></div>
    </aside>
  )
}
