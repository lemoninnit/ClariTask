import React from 'react'
import styles from './AuthLayout.module.css'

export default function AuthLayout({ title, subtitle, imageUrl, children, footer }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}> 
        <div className={styles.content}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.form}>{children}</div>
          {footer}
        </div>
      </div>
      <div className={styles.right}>
        <img src={imageUrl} alt="Auth side" className={styles.image} />
      </div>
    </div>
  )
}