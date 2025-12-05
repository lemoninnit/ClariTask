import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!agree) {
      setError('Please agree to the terms & policy')
      return
    }
    setError('')
    setLoading(true)
    try {
      const result = await register(name, email, password, role)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Get Started Now"
      subtitle="Create your account to start managing tasks"
      imageUrl="/public/wildcat.jpg"
    >
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {error && (
          <div style={{ 
            color: '#ef4444', 
            fontSize: '14px', 
            padding: '12px', 
            background: '#fee2e2', 
            borderRadius: '8px',
            border: '1px solid #fecaca',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {error}
          </div>
        )}
        
        <TextField 
          label="Full Name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <TextField 
          label="Email address" 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div>
          <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            suffix={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
              </button>
            }
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
            Role
          </label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              fontSize: '14px',
              background: '#fff',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3f5d2a'
              e.target.style.boxShadow = '0 0 0 3px rgba(63, 93, 42, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        
        <Checkbox 
          checked={agree} 
          onChange={(e) => setAgree(e.target.checked)} 
          label={
            <span style={{ fontSize: '14px', color: '#374151' }}>
              I agree to the <a href="#" style={{ color: '#3b82f6' }}>terms & policy</a>
            </span>
          } 
        />
        
        <Button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
          {loading ? 'Creating account...' : 'Create Account'} 
          <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Button>
      </form>
      
      <div style={{ marginTop: 24, textAlign: 'center', color: '#374151', fontSize: '14px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#3f5d2a', fontWeight: 600, textDecoration: 'none' }}>
          Sign In
        </Link>
      </div>
    </AuthLayout>
  )
}
