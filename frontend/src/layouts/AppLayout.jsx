import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'

export default function AppLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(false)
  
  useEffect(() => {
    const apply = () => setMobile(window.innerWidth < 900)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  
  const userName = user?.userDto?.name || user?.name || 'User'
  
  const s = {
    shell: { 
      display: 'grid', 
      gridTemplateColumns: mobile ? '200px 1fr' : '260px 1fr', 
      minHeight: '100vh',
      height: '100vh',
      background: '#f5f7f8' 
    },
    content: { 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden'
    },
    header: { 
      borderBottom: '1px solid #e5e7eb', 
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    headerWrap: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '16px 24px' 
    },
    greeting: { 
      fontWeight: 600, 
      color: '#334155',
      fontSize: 16
    },
    actions: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 12 
    },
    profileLink: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 8, 
      padding: '8px 16px', 
      background: '#3f5d2a', 
      borderRadius: 999, 
      color: '#fff',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s',
      border: 'none'
    },
    avatar: { 
      width: 28, 
      height: 28, 
      borderRadius: 999, 
      background: 'rgba(255, 255, 255, 0.2)', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 12
    },
    logoutBtn: { 
      background: '#3f5d2a', 
      color: '#fff', 
      padding: '8px 16px', 
      border: 'none', 
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      transition: 'all 0.2s'
    },
    main: { 
      flex: 1, 
      padding: mobile ? 16 : 24,
      overflowY: 'auto'
    }
  }
  
  return (
    <div style={s.shell}>
      <Sidebar />
      <div style={s.content}>
        <header style={s.header}>
          <div style={s.headerWrap}>
            <div style={s.greeting}>
              Welcome {userName} 👋
            </div>
            <div style={s.actions}>
              <button 
                onClick={() => navigate('/profile')} 
                style={s.profileLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(63, 93, 42, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={s.avatar}>{userName?.[0]?.toUpperCase() || 'U'}</span>
                <span>Profile</span>
              </button>
              <button
                style={s.logoutBtn}
                onClick={logout}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3f5d2a'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3f5d2a'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
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
