import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { LayoutDashboard, ListTodo, CalendarDays, Megaphone, User } from 'lucide-react'

export default function Sidebar() {
  const css = styles || {}
  const s = {
    aside: { 
      borderRight: '1px solid #e5e7eb', 
      padding: 20, 
      background: '#3f5d2a', 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh'
    },
    brandRow: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      marginBottom: 32 
    },
    brandIcon: { 
      width: 40, 
      height: 40, 
      borderRadius: 10, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#fff',
      color: '#3f5d2a', 
      fontWeight: 800,
      fontSize: 20
    },
    brandText: { 
      fontWeight: 800, 
      color: '#fff', 
      fontSize: 20 
    },
    nav: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 8 
    },
    link: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: '12px 16px', 
      borderRadius: 10, 
      color: '#fff', 
      textDecoration: 'none',
      transition: 'all 0.2s',
      opacity: 0.8
    },
    active: { 
      background: 'rgba(255, 255, 255, 0.15)', 
      color: '#fff',
      opacity: 1,
      fontWeight: 600
    },
  }
  
  const link = (to, label, Icon) => (
    <NavLink
      to={to}
      className={({ isActive }) => `${css.link || ''} ${isActive ? (css.active || '') : ''}`}
      style={({ isActive }) => ({ ...s.link, ...(isActive ? s.active : {}) })}
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  )

  return (
    <aside className={css.sidebar || ''} style={s.aside}>
      <div className={css.brandRow || ''} style={s.brandRow}>
        <div className={css.brandIcon || ''} style={s.brandIcon}>C</div>
        <div className={css.brandText || ''} style={s.brandText}>ClariTasks</div>
      </div>
      <nav className={css.nav || ''} style={s.nav}> 
        {link('/dashboard', 'Dashboard', LayoutDashboard)}
        {link('/tasks', 'Tasks', ListTodo)}
        {link('/calendar', 'Calendar', CalendarDays)}
        {link('/announcements', 'Announcements', Megaphone)}
        {link('/profile', 'Profile', User)}
      </nav>
    </aside>
  )
}
