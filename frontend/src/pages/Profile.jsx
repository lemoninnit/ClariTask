import React from 'react'
import AppLayout from '../layouts/AppLayout'
import styles from './Profile.module.css'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
  const name = user?.name || 'User'
  const email = user?.email || ''
  return (
    <AppLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.card}>
          <div className={styles.avatar}>{name?.[0] || 'U'}</div>
          <div className={styles.info}>
            <div className={styles.row}><span className={styles.label}>Name</span><span>{name}</span></div>
            <div className={styles.row}><span className={styles.label}>Email</span><span>{email}</span></div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}