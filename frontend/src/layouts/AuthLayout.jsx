import React from 'react'
import styles from './AuthLayout.module.css'

export default function AuthLayout({ title, subtitle, imageUrl, children, footer }) {
  const fallback = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80'
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}> 
        <div className={styles.content}>
          <div className={styles.brand}><a href="/">ClariTask</a></div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.card}>
            <div className={styles.form}>{children}</div>
            {footer}
          </div>
        </div>
      </div>
      <div className={styles.right} style={{ backgroundImage: `url(${imageUrl || fallback})` }} />
    </div>
  )
}