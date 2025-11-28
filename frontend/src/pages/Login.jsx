
// LOGIN.JSX
import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Card from '../components/Card'
import TextField from '../components/TextField'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { login } from '../lib/api'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
// inline styles

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(email, password)
      localStorage.setItem('ct_user', JSON.stringify(user))
      window.location.href = '/dashboard'
    } catch {
      alert('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Enter your credentials to access your account"
      imageUrl="/public/wildcat.jpg"
    >
      <Card>
        <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
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
        <div style={{ textAlign:'right' }}>
          <a href="#">Forgot password?</a>
        </div>
          <Button type="submit" disabled={loading} className="" >
            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
          </Button>
        </form>
      </Card>
      <div style={{ margin:'16px 0', color:'#6b7280', textAlign:'center' }}>Or continue with</div>
      <SocialButtons />
      <div style={{ marginTop:24, color:'#111827' }}>
        Don't have an account? <a href="/signup">Create one</a>
      </div>
    </AuthLayout>
  )
}
