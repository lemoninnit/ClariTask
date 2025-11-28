import React from 'react'
import AppLayout from '../layouts/AppLayout'
 
import Card from '../components/Card'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
  const name = user?.name || 'User'
  const email = user?.email || ''
  return (
    <AppLayout>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <h1 style={{ fontWeight:800, fontSize:28, color:'#0f172a', marginBottom:16 }}>Profile</h1>
        <Card style={{ borderRadius:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ width:64, height:64, borderRadius:999, background:'#e5e7eb', color:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:24 }}>
              {name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ flex:1, display:'grid', gap:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ fontWeight:600, color:'#334155' }}>Name</span><span style={{ fontWeight:600 }}>{name}</span></div>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ fontWeight:600, color:'#334155' }}>Email</span><span style={{ color:'#334155' }}>{email}</span></div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
