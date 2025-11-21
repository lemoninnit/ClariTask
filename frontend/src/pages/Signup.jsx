import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import SocialButtons from '../components/SocialButtons'
import { register } from '../lib/api'
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react'
import styles from './Auth.module.css'

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
      imageUrl="/wildcat.jpg"
    >
      <form onSubmit={onSubmit} className={styles.form}>
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
        <div className={styles.passwordField}>
          <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            inputClassName={styles.passwordInput}
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
        <Checkbox 
          checked={agree} 
          onChange={(e)=>setAgree(e.target.checked)} 
          label={<span>I agree to the <a href="#">terms & policy</a></span>} 
        />
        <Button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
        </Button>
      </form>
      <div className={styles.divider}>Or sign up with</div>
      <SocialButtons />
      <div className={styles.signup}>
        Already have an account? <a href="/login">Sign In</a>
      </div>
    </AuthLayout>
  )
}