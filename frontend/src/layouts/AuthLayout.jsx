import React, { useEffect, useState } from 'react'

export default function AuthLayout({ title, subtitle, imageUrl, children, footer }) {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const apply = () => setMobile(window.innerWidth < 900)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  const fallback = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80'
  const s = {
    wrapper: { display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', minHeight:'100vh', background:'#fff' },
    left: { display:'flex', alignItems:'center', justifyContent:'center', padding:'64px 24px', background:'#f7f7f7' },
    content: { width:'100%', maxWidth:520 },
    brand: { fontWeight:700, color:'#3f5d2a', marginBottom:12 },
    title: { fontSize:44, fontWeight:700, color:'#0f172a', margin:'0 0 8px' },
    subtitle: { color:'#334155', margin:'0 0 24px' },
    card: { background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, boxShadow:'0 8px 24px rgba(16,24,40,0.06)', padding:24 },
    form: { display:'flex', flexDirection:'column', gap:14 },
    right: { position:'relative', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat' },
  }
  return (
    <div style={s.wrapper}>
      <div style={s.left}> 
        <div style={s.content}>
          <div style={s.brand}><a href="/">ClariTask</a></div>
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
