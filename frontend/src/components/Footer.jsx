import React from 'react'
import styles from './Footer.module.css'
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
  return (
    <footer className={styles.footer}>
      <div className={styles.socialRow}>
        <a className={styles.social} href="#" aria-label="Twitter"><Twitter size={16} /></a>
        <a className={styles.social} href="#" aria-label="Instagram"><Instagram size={16} /></a>
        <a className={styles.social} href="#" aria-label="YouTube"><Youtube size={16} /></a>
        <a className={styles.social} href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
      </div>
      <div className={styles.columns}>
        {columns.map((col) => (
          <div key={col.title} className={styles.column}>
            <div className={styles.colTitle}>{col.title}</div>
            <ul className={styles.list}>
              {col.links.map((l) => (
                <li key={l.label}><a href="#">{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}