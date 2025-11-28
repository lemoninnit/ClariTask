import React from 'react'
import Card from './Card'

export default function WelcomeCard({ greeting }) {
  return (
    <Card>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontWeight:700, color:'#0f172a' }}>{greeting}</div>
      </div>
    </Card>
  )
}
