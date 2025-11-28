import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
 
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { getTasks } from '../api/tasks'

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ 
    (async ()=>{
      try { setTasks(await getTasks()) } catch { setTasks([]) } finally { setLoading(false) }
    })()
  },[])

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
  const emptyDays = Array.from({length: firstDay}, () => null)

  const getTasksForDay = (day) => {
    if (!day) return []
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(t => t.dueDate && t.dueDate.startsWith(dateStr))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981'
      case 'in_progress': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const allCalendarDays = [...emptyDays, ...days]

  return (
    <AppLayout>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div>
            <h1 style={{ fontWeight:800, fontSize:28, color:'#0f172a', display:'flex', alignItems:'center', gap:8 }}>
              <CalendarIcon size={28} /> Calendar
            </h1>
            <p style={{ color:'#6b7280' }}>Track your assignments by due date</p>
          </div>
        </div>

        <Card>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <button onClick={prevMonth} style={{ padding:'8px 10px', border:'1px solid #e5e7eb', borderRadius:8, background:'#fff' }} title="Previous month">
              <ChevronLeft size={20} />
            </button>
            <h2 style={{ fontWeight:700, color:'#0f172a' }}>{monthYear}</h2>
            <button onClick={nextMonth} style={{ padding:'8px 10px', border:'1px solid #e5e7eb', borderRadius:8, background:'#fff' }} title="Next month">
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:8, marginBottom:8 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ textAlign:'center', fontWeight:600, color:'#334155' }}>{day}</div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:8 }}>
            {allCalendarDays.map((day, idx) => (
              <div 
                key={idx} 
                style={{ border:'1px dashed #e5e7eb', borderRadius:8, minHeight:110, background: !day ? '#f9fafb' : '#fff' }}
              >
                {day && (
                  <div style={{ padding:8 }}>
                    <div style={{ fontWeight:700, color:'#334155', marginBottom:8 }}>{day}</div>
                    <div style={{ display:'grid', gap:6 }}>
                      {getTasksForDay(day).slice(0, 2).map((task, i) => (
                        <div 
                          key={i} 
                          style={{ border:'1px solid #e5e7eb', borderLeft:'4px solid '+getStatusColor(task.status), borderRadius:8, padding:'6px 10px', fontSize:13, color:'#334155' }}
                          title={task.title}
                        >
                          {task.title.substring(0, 12)}
                        </div>
                      ))}
                      {getTasksForDay(day).length > 2 && (
                        <div style={{ fontSize:12, color:'#64748b' }}>
                          +{getTasksForDay(day).length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display:'flex', gap:16, marginTop:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:10, height:10, borderRadius:999, display:'inline-block', background:'#3b82f6' }}></span>
            <span>Pending</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:10, height:10, borderRadius:999, display:'inline-block', background:'#f59e0b' }}></span>
            <span>In Progress</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:10, height:10, borderRadius:999, display:'inline-block', background:'#10b981' }}></span>
            <span>Completed</span>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign:'center', marginTop:12, color:'#64748b' }}>Loading tasks...</div>
        )}
      </div>
    </AppLayout>
  )
}
