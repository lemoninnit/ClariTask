import React from 'react'

export default function Header() {
  const s = {
    header: { borderBottom:'1px solid #e5e7eb', background:'#fff' },
    wrap: { maxWidth:1100, margin:'0 auto', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' },
    brand: { fontWeight:800, color:'#0f172a', fontSize:20 },
    nav: { display:'inline-flex', gap:8 },
    ghost: { padding:'8px 14px', border:'1px solid #e5e7eb', borderRadius:10, color:'#0f172a' },
    primary: { padding:'8px 14px', borderRadius:10, background:'#3f5d2a', color:'#fff' },
  }
  return (
    <header style={s.header}>
      <div style={s.wrap}>
        <a href="/" style={s.brand}>ClariTask</a>
        <nav style={s.nav}>
          <a href="/login" style={s.ghost}>Sign in</a>
          <a href="/signup" style={s.primary}>Register</a>
        </nav>
      </div>
    </header>
  )
}
