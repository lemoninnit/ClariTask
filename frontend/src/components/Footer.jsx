import React from 'react'
import styles from './Footer.module.css'

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
        <a className={styles.social} href="#" aria-label="X">X</a>
        <a className={styles.social} href="#" aria-label="Instagram">IG</a>
        <a className={styles.social} href="#" aria-label="YouTube">YT</a>
        <a className={styles.social} href="#" aria-label="LinkedIn">In</a>
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