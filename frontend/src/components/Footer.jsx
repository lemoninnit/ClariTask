import React from 'react'
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

const columns = [
  {
    title: 'Use cases',
    links: [
      { label: 'Student task tracking' },
      { label: 'Assignment planning' },
      { label: 'Teacher announcements' },
      { label: 'Deadlines & reminders' },
      { label: 'Class communication' },
      { label: 'Task status (pending/completed)' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Task creation & editing' },
      { label: 'Announcement posting' },
      { label: 'Filters & search' },
      { label: 'Responsive UI' },
      { label: 'Secure data storage' },
      { label: 'Notifications' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'User manual' },
      { label: 'Best practices' },
      { label: 'Support' },
      { label: 'Developers' },
      { label: 'Resource library' },
    ],
  },
]

export default function Footer() {
  const s = {
    footer: { borderTop:'1px solid #e5e7eb', padding:'24px 20px', background:'#fff' },
    socialRow: { maxWidth:1100, margin:'0 auto 16px', display:'flex', gap:10 },
    social: { display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:28, border:'1px solid #e5e7eb', borderRadius:999, color:'#374151', fontSize:12 },
    columns: { maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 },
    column: {},
    colTitle: { fontWeight:600, color:'#111827', marginBottom:8 },
    list: { listStyle:'none', padding:0, margin:0 },
    listItem: { margin:'6px 0' },
    link: { color:'#374151' },
  }
  return (
    <footer style={s.footer}>
      <div style={s.socialRow}>
        <a style={s.social} href="#" aria-label="Twitter"><Twitter size={16} /></a>
        <a style={s.social} href="#" aria-label="Instagram"><Instagram size={16} /></a>
        <a style={s.social} href="#" aria-label="YouTube"><Youtube size={16} /></a>
        <a style={s.social} href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
      </div>
      <div style={s.columns}>
        {columns.map((col) => (
          <div key={col.title} style={s.column}>
            <div style={s.colTitle}>{col.title}</div>
            <ul style={s.list}>
              {col.links.map((l) => (
                <li key={l.label} style={s.listItem}><a href="#" style={s.link}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
