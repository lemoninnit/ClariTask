import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './SiteLayout.module.css'

export default function SiteLayout({ children }) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}