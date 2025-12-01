import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import WelcomeCard from '../components/WelcomeCard'
import StatsCardRow from '../components/StatsCardRow'
import CategoriesCard from '../components/CategoriesCard'
import TasksCard from '../components/TasksCard'
import AnnouncementCard from '../components/AnnouncementCard'
 
import { createTask, getTasks } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { Plus, Calendar, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
    if (!user) { window.location.href = '/login'; return }
    ;(async()=>{ 
      try { 
        setCategories(await getCategories(user.userId))
        setTasks(await getTasks(user.userId))
      } catch { 
        setCategories([])
        setTasks([])
      } 
    })()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const user = JSON.parse(localStorage.getItem('ct_user'))
      const saved = await createTask({ title, description:'', dueDate, status, user:{ userId: user?.userId || 1 } })
      setTasks(prev=>[saved, ...prev])
      setTitle(''); setDueDate(''); setStatus('pending')
    } catch (error) {
      console.error(error)
    }
  }

  const visibleTasks = activeCategoryId
    ? tasks.filter(t => t.categoryId === activeCategoryId)
    : tasks

  const completed = visibleTasks.filter(t=>t.status==='completed').length
  const pending = visibleTasks.filter(t=>t.status==='pending').length
  const inProgress = visibleTasks.filter(t=>t.status==='in_progress').length
  const total = visibleTasks.length

  const isOverdue = tasks.some(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed')

  return (
  <AppLayout>
    <div style={{ maxWidth:1100, margin:'0 auto' }}>
      {isOverdue && (
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', border:'1px solid #fde68a', background:'#fffbeb', borderRadius:10, color:'#92400e', marginBottom:12 }}>
          <AlertCircle size={18} />
          <span>You have overdue tasks that need attention!</span>
        </div>
      )}

      <section style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <div>
          <h1 style={{ fontWeight:800, fontSize:28, color:'#0f172a' }}>Dashboard</h1>
          <p style={{ color:'#6b7280' }}>Stay on top of your assignments</p>
        </div>
      </section>
      <WelcomeCard greeting={"Welcome 👋"} />

      <StatsCardRow completed={completed} pending={pending} inProgress={inProgress} total={total} />

      <section style={{ display:'grid', gridTemplateColumns: (typeof window !== 'undefined' && window.innerWidth < 1024) ? '1fr' : '1fr 1fr', gap:20 }}>
        <div>
          <CategoriesCard
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />
        </div>
        <div>
          <TasksCard
            tasks={visibleTasks}
            title={title}
            setTitle={setTitle}
            dueDate={dueDate}
            setDueDate={setDueDate}
            status={status}
            setStatus={setStatus}
            onCreate={onCreate}
          />
        </div>
      </section>
    </div>
  </AppLayout>
)
}
