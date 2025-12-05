import React from 'react'

export default function WelcomeCard({ greeting, taskCount = 0 }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 16,
      padding: 32,
      marginBottom: 24,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{
        fontSize: 28,
        fontWeight: 700,
        color: '#0f172a',
        margin: '0 0 8px 0',
        lineHeight: 1.2
      }}>
        {greeting}
      </h2>
      <p style={{
        color: '#64748b',
        margin: 0,
        fontSize: 16
      }}>
        You have {taskCount} task{taskCount !== 1 ? 's' : ''} today
      </p>
    </div>
  )
}
