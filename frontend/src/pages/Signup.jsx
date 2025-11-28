import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Card from '../components/Card'
import TextField from '../components/TextField'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { register } from '../lib/api'
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react'
// inline styles

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!agree) {
      alert('Please agree to the terms & policy')
      return
    }
    setLoading(true)
    try {
      const saved = await register({ name, email, password, role: 'student' })
      alert(`Account created for ${saved.name}`)
      window.location.href = '/login'
    } catch {
      alert('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Get Started Now"
      imageUrl="/public/wildcat.jpg"
    >
      <Card>
        <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <TextField 
            label="Full Name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <TextField 
          label="Email address" 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <TextField 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          placeholder="Enter password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
          inputClassName=""
          required
          suffix={
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <Checkbox 
          checked={agree} 
          onChange={(e)=>setAgree(e.target.checked)} 
          label={<span>I agree to the <a href="#">terms & policy</a></span>} 
        />
          <Button type="submit" disabled={loading} className="">
            {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
      <div style={{ margin:'16px 0', color:'#6b7280', textAlign:'center' }}>Or sign up with</div>
      <SocialButtons />
      <div style={{ marginTop:24, color:'#111827' }}>
        Already have an account? <a href="/login">Sign In</a>
      </div>
    </AuthLayout>
  )
}
