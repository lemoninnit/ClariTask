import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, imageUrl, children, footer }) {
  const [mobile, setMobile] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const apply = () => setMobile(window.innerWidth < 900)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  
  const fallback = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80'
  const s = {
    wrapper: { 
      display: 'grid', 
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', 
      minHeight: '100vh',
      maxHeight: '100vh',
      overflow: 'visible',
      background: '#fff' 
    },
    left: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px 24px', 
      background: '#f7f7f7',
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    content: { 
      width: '100%', 
      maxWidth: 520,
      margin: '0 auto'
    },
    brand: { 
      fontWeight: 800, 
      fontSize: 28,
      color: '#3f5d2a', 
      marginBottom: 16,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s'
    },
    title: { 
      fontSize: 36, 
      fontWeight: 800, 
      color: '#0f172a', 
      margin: '0 0 20px 0',
      lineHeight: 1.2
    },
    subtitle: { 
      color: '#64748b', 
      margin: '0 0 32px 0',
      fontSize: 16
    },
    card: { 
      background: '#fff', 
      border: '1px solid #e5e7eb', 
      borderRadius: 16, 
      boxShadow: '0 8px 24px rgba(16,24,40,0.06)', 
      padding: 24
    },
    form: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 12
    },
    right: { 
      position: 'relative', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      display: mobile ? 'none' : 'block'
    },
  }
  
  return (
    <div style={s.wrapper}>
      <div style={s.left}> 
        <div style={s.content}>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/') }}
            style={s.brand}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.color = '#2d4a1b'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.color = '#3f5d2a'
            }}
          >
            ClariTask
          </a>
          <h1 style={s.title}>{title}</h1>
          {subtitle && <p style={s.subtitle}>{subtitle}</p>}
          <div style={s.card}>
            <div style={s.form}>{children}</div>
            {footer}
          </div>
        </div>
      </div>
      {!mobile && <div style={{ ...s.right, backgroundImage: `url(${imageUrl || fallback})` }} />}
    </div>
  )
}
