import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import styles from './Calendar.module.css'
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
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <CalendarIcon size={28} /> Calendar
            </h1>
            <p className={styles.subtitle}>Track your assignments by due date</p>
          </div>
        </div>

        <div className={styles.calendarCard}>
          <div className={styles.monthHeader}>
            <button onClick={prevMonth} className={styles.navBtn} title="Previous month">
              <ChevronLeft size={20} />
            </button>
            <h2 className={styles.monthYear}>{monthYear}</h2>
            <button onClick={nextMonth} className={styles.navBtn} title="Next month">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.weekDay}>{day}</div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {allCalendarDays.map((day, idx) => (
              <div 
                key={idx} 
                className={`${styles.dayCell} ${!day ? styles.empty : ''}`}
              >
                {day && (
                  <div className={styles.dayContent}>
                    <div className={styles.dayNumber}>{day}</div>
                    <div className={styles.dayTasks}>
                      {getTasksForDay(day).slice(0, 2).map((task, i) => (
                        <div 
                          key={i} 
                          className={styles.taskBadge}
                          style={{ borderLeftColor: getStatusColor(task.status) }}
                          title={task.title}
                        >
                          {task.title.substring(0, 12)}
                        </div>
                      ))}
                      {getTasksForDay(day).length > 2 && (
                        <div className={styles.moreTask}>
                          +{getTasksForDay(day).length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{background: '#3b82f6'}}></span>
            <span>Pending</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{background: '#f59e0b'}}></span>
            <span>In Progress</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{background: '#10b981'}}></span>
            <span>Completed</span>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingMsg}>Loading tasks...</div>
        )}
      </div>
    </AppLayout>
  )
}