import React from 'react'

export default function Card({ title, right, children, style }) {
  const base = {
    background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, marginBottom: 16,
  }
  return (
    <section style={{ ...base, ...(style || {}) }}>
      {(title || right) && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, paddingBottom:12, borderBottom:'1px solid #e5e7eb' }}>
          <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:'#0f172a' }}>{title}</h2>
          {right}
        </div>
      )}
      {children}
    </section>
  )
}
