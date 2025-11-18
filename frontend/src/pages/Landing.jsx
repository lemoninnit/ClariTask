import React from 'react'
import SiteLayout from '../layouts/SiteLayout'
import styles from './Landing.module.css'

export default function Landing() {
  return (
    <SiteLayout>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>ClariTask</h1>
          <p className={styles.subtitle}>A Smart and Organized Task Management System</p>
        </div>
      </section>
    </SiteLayout>
  )
}