import React from 'react'

export default function Card({ title, right, children, style }) {
  const base = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease'
  }
  
  return (
    <section 
      style={{ ...base, ...(style || {}) }}
      onMouseEnter={(e) => {
        if (!style?.onMouseEnter) {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!style?.onMouseLeave) {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
        }
      }}
    >
      {(title || right) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: '#0f172a'
          }}>
            {title}
          </h2>
          {right}
        </div>
      )}
      {children}
    </section>
  )
}
