import React from 'react'
import cls from 'classnames'

export default function Button({ children, variant = 'primary', type = 'button', onClick, className, disabled, style: customStyle }) {
  const base = { 
    display: 'inline-flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8,
    padding: '12px 16px', 
    fontWeight: 600, 
    borderRadius: 12, 
    border: 'none', 
    cursor: disabled ? 'not-allowed' : 'pointer', 
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
    fontSize: '14px',
    fontFamily: 'inherit'
  }
  const primary = { 
    background: '#3f5d2a', 
    color: '#fff', 
    boxShadow: '0 2px 8px rgba(63, 93, 42, 0.2)' 
  }
  const ghost = { 
    background: '#fff', 
    color: '#0f172a', 
    border: '1px solid #e5e7eb' 
  }
  const defaultStyle = { ...base, ...(variant === 'ghost' ? ghost : primary) }
  const finalStyle = customStyle ? { ...defaultStyle, ...customStyle, width: customStyle.width || defaultStyle.width } : defaultStyle
  
  return (
    <button 
      style={finalStyle} 
      className={cls(className)} 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(63, 93, 42, 0.3)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(63, 93, 42, 0.2)'
        }
      }}
    >
      {children}
    </button>
  )
}
