import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SiteLayout({ children }) {
  const s = { page: { minHeight:'100vh', display:'flex', flexDirection:'column' }, main: { flex:1 } }
  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>{children}</main>
      <Footer />
    </div>
  )
}
