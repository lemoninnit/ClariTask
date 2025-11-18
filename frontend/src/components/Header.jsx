import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <a href="/" className={styles.brand}>ClariTask</a>
        <nav className={styles.nav}>
          <a href="/login" className={styles.ghost}>Sign in</a>
          <a href="/signup" className={styles.primary}>Register</a>
        </nav>
      </div>
    </header>
  )
}