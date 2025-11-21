import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { login } from '../lib/api'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import styles from './Auth.module.css'

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
      imageUrl="/wildcat.jpg"
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <TextField 
          label="Email address" 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordField}>
          <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
        <Button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
        </Button>
      </form>
      <div className={styles.divider}>Or continue with</div>
      <SocialButtons />
      <div className={styles.signup}>
        Don't have an account? <a href="/signup">Create one</a>
      </div>
    </AuthLayout>
  )
}