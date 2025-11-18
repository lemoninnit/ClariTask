import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!agree) {
      alert('Please agree to the terms & policy')
      return
    }
    alert(`Signup submitted: ${name}, ${email}`)
  }

  return (
    <AuthLayout
      title="Get Started Now"
      imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
    >
      <form onSubmit={onSubmit}>
        <TextField label="Name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
        <TextField label="Email address" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Checkbox checked={agree} onChange={(e)=>setAgree(e.target.checked)} label={<span>I agree to the <a href="#">terms & policy</a></span>} />
        <Button type="submit">Signup</Button>
      </form>
      <div style={{margin:'16px 0', color:'#6b7280', textAlign:'center'}}>Or</div>
      <SocialButtons />
      <div style={{marginTop:24, color:'#111827'}}>
        Have an account? <a href="/login" style={{color:'#3f5d2a'}}>Sign In</a>
      </div>
    </AuthLayout>
  )
}