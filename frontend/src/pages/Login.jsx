import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Invalid email or password')
      }
    } catch (err) {
      setError('Invalid email or password')
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
          <div style={{ textAlign: 'right', marginTop: '8px' }}>
            <a href="#" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
          {loading ? 'Signing in...' : 'Sign In'} 
          <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Button>
      </form>
      
      <div style={{ marginTop: 24, textAlign: 'center', color: '#374151', fontSize: '14px' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: '#3f5d2a', fontWeight: 600, textDecoration: 'none' }}>
          Create one
        </Link>
      </div>
    </AuthLayout>
  )
}
