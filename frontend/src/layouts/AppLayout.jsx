import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'

export default function AppLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.logo}>ClariTask</div>
          <div className={styles.actions}>
            <a href="/profile" className={styles.profileLink}>
              <img 
                src="https://ui-avatars.com/api/?name=User&background=3f5d2a&color=fff&size=32" 
                alt="Profile" 
                className={styles.avatar}
              />
              <span>Profile</span>
            </a>
            <button
              className={styles.logoutBtn}
              onClick={() => { localStorage.removeItem('ct_user'); window.location.href = '/login' }}
            >
              LOGOUT
            </button>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}