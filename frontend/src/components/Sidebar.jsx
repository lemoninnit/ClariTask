import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { LayoutDashboard, ListTodo, CalendarDays, Megaphone, User } from 'lucide-react'
import { getAnnouncements } from '../api/announcements'

export default function Sidebar() {
  const css = styles || {}
  const s = {
    aside: { borderRight:'1px solid #e5e7eb', padding:16, background:'#fff', display:'flex', flexDirection:'column', borderTopRightRadius:16, borderBottomRightRadius:16 },
    brandRow: { display:'flex', alignItems:'center', gap:8, marginBottom:16 },
    brandIcon: { width:28, height:28, borderRadius:999, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #cbd5e1', color:'#2563eb', fontWeight:800 },
    brandText: { fontWeight:800, color:'#0f172a', fontSize:16 },
    nav: { display:'flex', flexDirection:'column', gap:8 },
    link: { display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:8, color:'#0f172a', textDecoration:'none' },
    active: { background:'#3f5d2a', color:'#fff' },
    section: { marginTop:16, paddingTop:10, borderTop:'1px solid #e5e7eb' },
    sectionTitle: { display:'flex', alignItems:'center', gap:8, color:'#334155', padding:'10px 12px', borderRadius:8 },
    sectionContent: { color:'#64748b', padding:'8px 12px' },
  }
  const link = (to, label, Icon) => (
    <NavLink
      to={to}
      className={({ isActive }) => `${css.link || ''} ${isActive ? (css.active || '') : ''}`}
      style={({ isActive }) => ({ ...s.link, ...(isActive ? s.active : {}) })}
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  )

  const [ann, setAnn] = useState([])
  useEffect(()=>{ (async()=>{ try{ setAnn(await getAnnouncements()) } catch{ setAnn([]) } })() },[])

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
        {link('/profile', 'Profile', User)}
      </nav>
      <div className={css.section || ''} style={s.section}>
        <div className={css.sectionTitle || ''} style={s.sectionTitle}><Megaphone size={18} /> <span>Announcement</span></div>
        <div className={css.sectionContent || ''} style={s.sectionContent}>{ann.length ? ann[0].title : 'Nothing so far...'}</div>
      </div>
      <div className={css.bottom || ''}></div>
    </aside>
  )
}
