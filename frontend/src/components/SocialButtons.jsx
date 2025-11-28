import React from 'react'
import Button from './Button'

export default function SocialButtons() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
      <Button variant="ghost">Sign in with Google</Button>
      <Button variant="ghost">Sign in with Apple</Button>
    </div>
  )
}
