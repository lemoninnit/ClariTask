import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { getTasks } from '../api/tasks'

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try { 
        setTasks(await getTasks()) 
      } catch { 
        setTasks([]) 
      } finally { 
        setLoading(false) 
      }
    })()
  }, [])

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
    return tasks.filter(t => {
      if (!t.dueDate) return false
      const taskDate = t.dueDate.split('T')[0]
      return taskDate === dateStr
    })
  }
  
  const formatTaskTime = (dueDate) => {
    if (!dueDate) return ''
    try {
      const date = new Date(dueDate)
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    } catch {
      return ''
    }
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
  const selectedTasks = selectedDate ? getTasksForDay(selectedDate) : []

  return (
    <AppLayout>
      <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 28, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
              <CalendarIcon size={28} /> Calendar
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>Track your assignments by due date</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr', gap: 24, width: '100%' }}>
          <Card style={{ width: '100%', maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <button 
                onClick={prevMonth} 
                style={{ 
                  padding: '8px 12px', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: 8, 
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3f5d2a'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                title="Previous month"
              >
                <ChevronLeft size={20} color="#374151" />
              </button>
              <h2 style={{ fontWeight: 700, color: '#0f172a', fontSize: 20, margin: 0 }}>{monthYear}</h2>
              <button 
                onClick={nextMonth} 
                style={{ 
                  padding: '8px 12px', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: 8, 
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3f5d2a'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                title="Next month"
              >
                <ChevronRight size={20} color="#374151" />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#334155', fontSize: 13, padding: '8px 0' }}>
                  {day}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
              {allCalendarDays.map((day, idx) => {
                const dayTasks = getTasksForDay(day)
                const isSelected = selectedDate === day
                const isToday = day && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                
                return (
                  <div 
                    key={idx} 
                    onClick={() => day && setSelectedDate(day)}
                    style={{ 
                      border: isSelected ? '2px solid #3f5d2a' : '1px dashed #e5e7eb', 
                      borderRadius: 8, 
                      minHeight: 100, 
                      background: !day ? '#f9fafb' : isToday ? '#f0fdf4' : '#fff',
                      padding: 8,
                      cursor: day ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 2px 8px rgba(63, 93, 42, 0.15)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (day) {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (day && !isSelected) {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  >
                    {day && (
                      <>
                        <div style={{ 
                          fontWeight: 700, 
                          color: isToday ? '#3f5d2a' : '#334155', 
                          marginBottom: 8,
                          fontSize: 14
                        }}>
                          {day}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {dayTasks.slice(0, 2).map((task, i) => {
                            const timeStr = formatTaskTime(task.dueDate)
                            return (
                              <div 
                                key={i} 
                                style={{ 
                                  border: '1px solid #e5e7eb', 
                                  borderLeft: `3px solid ${getStatusColor(task.status)}`, 
                                  borderRadius: 4, 
                                  padding: '4px 6px', 
                                  fontSize: 11, 
                                  color: '#334155',
                                  background: '#fff',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  transition: 'all 0.2s'
                                }}
                                title={task.title}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)'
                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)'
                                  e.currentTarget.style.boxShadow = 'none'
                                }}
                              >
                                {timeStr && <span style={{ fontWeight: 600 }}>{timeStr} </span>}
                                {task.title.substring(0, 12)}
                              </div>
                            )
                          })}
                          {dayTasks.length > 2 && (
                            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
                              +{dayTasks.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          {selectedDate && (
            <Card>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
                Tasks for {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </h3>
              {selectedTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: 14 }}>
                  No tasks for this date
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedTasks.map((task) => {
                    const timeStr = formatTaskTime(task.dueDate)
                    return (
                      <div 
                        key={task.taskId}
                        style={{
                          border: '1px solid #e5e7eb',
                          borderLeft: `4px solid ${getStatusColor(task.status)}`,
                          borderRadius: 8,
                          padding: 12,
                          background: '#fff',
                          transition: 'all 0.2s',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(4px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)'
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4, fontSize: 14 }}>
                          {task.title}
                        </div>
                        {timeStr && (
                          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                            Time: {timeStr}
                          </div>
                        )}
                        <div style={{ 
                          display: 'inline-block',
                          padding: '2px 8px',
                          background: getStatusColor(task.status) + '20',
                          color: getStatusColor(task.status),
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 500,
                          textTransform: 'capitalize'
                        }}>
                          {task.status.replace('_', ' ')}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          )}
        </div>

        <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, display: 'inline-block', background: '#3b82f6' }}></span>
            <span style={{ fontSize: 14, color: '#64748b' }}>Pending</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, display: 'inline-block', background: '#f59e0b' }}></span>
            <span style={{ fontSize: 14, color: '#64748b' }}>In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, display: 'inline-block', background: '#10b981' }}></span>
            <span style={{ fontSize: 14, color: '#64748b' }}>Completed</span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
