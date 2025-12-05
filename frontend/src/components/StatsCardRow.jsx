import React, { useEffect, useState } from 'react'
import Card from './Card'
import { CheckCircle2, Clock, TrendingUp, Calendar } from 'lucide-react'

const Metric = ({ color, bg, icon: Icon, value, label }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 16, 
    background: '#fff', 
    border: '1px solid #e5e7eb', 
    borderRadius: 12, 
    padding: 20 
  }}>
    <div style={{ 
      width: 48, 
      height: 48, 
      borderRadius: 12, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: bg 
    }}>
      <Icon size={24} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  </div>
)

export default function StatsCardRow({ completed = 0, pending = 0, inProgress = 0, total = 0 }) {
  const [cols, setCols] = useState(4)
  
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth
      setCols(w < 640 ? 1 : w < 900 ? 2 : 4)
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  
  return (
    <Card style={{ borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
        <Metric color="#16a34a" bg="#dcfce7" icon={CheckCircle2} value={completed} label="Completed" />
        <Metric color="#ca8a04" bg="#fef3c7" icon={Clock} value={pending} label="Pending" />
        <Metric color="#2563eb" bg="#dbeafe" icon={TrendingUp} value={inProgress} label="In Progress" />
        <Metric color="#9333ea" bg="#f3e8ff" icon={Calendar} value={total} label="Total Tasks" />
      </div>
    </Card>
  )
}
