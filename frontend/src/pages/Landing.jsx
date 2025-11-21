import React from 'react'
import SiteLayout from '../layouts/SiteLayout'
import styles from './Landing.module.css'
import Button from '../components/Button'

export default function Landing() {
  return (
    <SiteLayout>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Organize Tasks Clearly</h1>
          <p className={styles.subtitle}>Manage assignments, track deadlines, and stay informed with a simple, fast, and reliable experience.</p>
          <div className={styles.ctaRow}>
            <a href="/signup" className={styles.cta}><Button>Get Started</Button></a>
            <a href="/login" className={styles.cta}><Button variant="ghost">Sign In</Button></a>
          </div>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.grid}>
          <div className={styles.feature}><div className={styles.fTitle}>Task Management</div><div className={styles.fDesc}>Create, edit, and track tasks with status and due dates.</div></div>
          <div className={styles.feature}><div className={styles.fTitle}>Announcements</div><div className={styles.fDesc}>Teachers post updates visible to students instantly.</div></div>
          <div className={styles.feature}><div className={styles.fTitle}>Search & Filter</div><div className={styles.fDesc}>Find the right task or announcement quickly.</div></div>
          <div className={styles.feature}><div className={styles.fTitle}>Notifications</div><div className={styles.fDesc}>Get notified before deadlines and on new posts.</div></div>
          <div className={styles.feature}><div className={styles.fTitle}>Responsive Design</div><div className={styles.fDesc}>Beautiful on desktops, tablets, and mobile devices.</div></div>
          <div className={styles.feature}><div className={styles.fTitle}>Secure Storage</div><div className={styles.fDesc}>Backed by a reliable database for smooth operations.</div></div>
        </div>
      </section>
    </SiteLayout>
  )
}