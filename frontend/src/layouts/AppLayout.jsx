import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Cog, Moon } from 'lucide-react'

export default function AppLayout({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('ct_theme') === 'dark')
  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('ct_theme', next ? 'dark' : 'light')
  }
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const apply = () => setMobile(window.innerWidth < 900)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  const s = {
    shell: { display:'grid', gridTemplateColumns: mobile ? '200px 1fr' : '260px 1fr', minHeight:'100vh', background:'#f5f7f8' },
    content: { display:'flex', flexDirection:'column' },
    header: { borderBottom:'1px solid #e5e7eb', background:'#fff' },
    headerWrap: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px' },
    greeting: { fontWeight:600, color:'#334155' },
    actions: { display:'inline-flex', alignItems:'center', gap:16 },
    iconBtn: { display:'inline-flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:999, border:'1px solid #e5e7eb', background:'#fff' },
    profileLink: { display:'inline-flex', alignItems:'center', gap:8, padding:'8px 12px', background:'#3f5d2a', borderRadius:999, color:'#fff' },
    avatar: { width:28, height:28, borderRadius:999, background:'#27431b', color:'#fff' },
    logoutBtn: { background:'#3f5d2a', color:'#fff', padding:'8px 12px', border:'none', borderRadius:10 },
    main: { flex:1, padding: mobile ? 12 : 20 }
  }
  return (
    <div style={s.shell}>
      <Sidebar />
      <div style={s.content}>
        <header style={s.header}>
          <div style={s.headerWrap}>
            <div style={s.greeting}>Welcome 👋</div>
            <div style={s.actions}>
              <button style={s.iconBtn} title="Settings"><Cog size={18} color="#334155" /></button>
              <button style={s.iconBtn} onClick={toggleTheme} title="Toggle theme"><Moon size={18} color="#334155" /></button>
              <a href="/profile" style={s.profileLink}>
                <span style={s.avatar}></span>
                <span>Profile</span>
              </a>
              <button
                style={s.logoutBtn}
                onClick={() => { localStorage.removeItem('ct_user'); window.location.href = '/login' }}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </header>
        <main style={s.main}>{children}</main>
      </div>
    </div>
  )
}
