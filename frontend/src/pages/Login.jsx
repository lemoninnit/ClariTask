import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: integrate API
    alert(`Login submitted: ${email}`)
  }

  const rightAction = <a href="#" style={{color:'#5f7a4b'}}>forgot password</a>

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Enter your Credentials to access your account"
      imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
    >
      <form onSubmit={onSubmit}>
        <TextField label="Email address" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} rightAction={rightAction} />
        <Checkbox checked={remember} onChange={(e)=>setRemember(e.target.checked)} label={<span>Remember for 30 days</span>} />
        <Button type="submit">Login</Button>
      </form>
      <div style={{margin:'16px 0', color:'#6b7280', textAlign:'center'}}>Or</div>
      <SocialButtons />
      <div style={{marginTop:24, color:'#111827'}}>
        Don't have an account? <a href="/signup" style={{color:'#3f5d2a'}}>Sign Up</a>
      </div>
    </AuthLayout>
  )
}