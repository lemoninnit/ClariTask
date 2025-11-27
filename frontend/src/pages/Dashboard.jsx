import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import StatCard from '../components/StatCard'
import CategoryChip from '../components/CategoryChip'
import TaskItem from '../components/TaskItem'
import Button from '../components/Button'
import styles from './Dashboard.module.css'
import { createTask, getTasks } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { Plus, Calendar, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const loading = false
  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ct_user') || 'null')
    if (!user) { window.location.href = '/login'; return }
    ;(async()=>{ 
      try { 
        setCategories(await getCategories())
        setTasks(await getTasks())
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

  const onAddCategory = async (e) => {
    e.preventDefault()
    if (!newCat.trim()) return
    try {
      const saved = await createCategory({ name: newCat })
      setCategories(prev=>[...prev, saved])
      setNewCat('')
    } catch { setCategories(prev=>prev) }
  }

  const completed = tasks.filter(t=>t.status==='completed').length
  const pending = tasks.filter(t=>t.status==='pending').length
  const inProgress = tasks.filter(t=>t.status==='in_progress').length
  const total = tasks.length

  const isOverdue = tasks.some(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed')

  return (
  <AppLayout>
    <div className={styles.container}>
      {isOverdue && (
        <div className={styles.alertBanner}>
          <AlertCircle size={18} />
          <span>You have overdue tasks that need attention!</span>
        </div>
      )}

      <section className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Stay on top of your assignments</p>
        </div>
        <div className={styles.greeting}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 👋
        </div>
      </section>

      <section className={styles.statsPanel}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper} style={{background: '#dcfce7'}}>
              <CheckCircle2 size={20} color="#16a34a" />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{completed}</div>
              <div className={styles.statLabel}>Completed</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper} style={{background: '#fef3c7'}}>
              <Clock size={20} color="#ca8a04" />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{pending}</div>
              <div className={styles.statLabel}>Pending</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper} style={{background: '#dbeafe'}}>
              <TrendingUp size={20} color="#2563eb" />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{inProgress}</div>
              <div className={styles.statLabel}>In Progress</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper} style={{background: '#f3e8ff'}}>
              <Calendar size={20} color="#9333ea" />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{total}</div>
              <div className={styles.statLabel}>Total Tasks</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainContent}>
        <div className={styles.categoriesPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Categories</h2>
            <span className={styles.categoryCount}>{categories.length}</span>
          </div>
          
          <div className={styles.categoriesGrid}>
            {categories.length === 0 ? (
              <div className={styles.emptyCategories}>
                <p>No categories yet. Add one below!</p>
              </div>
            ) : (
              categories.map(c => (
                <CategoryChip key={c.categoryId || c.name} name={c.name} />
              ))
            )}
          </div>

          <form onSubmit={onAddCategory} className={styles.categoryForm}>
            <input 
              value={newCat} 
              onChange={e=>setNewCat(e.target.value)} 
              placeholder="New category name" 
              className={styles.input} 
            />
            <Button type="submit" className={styles.addBtn}>
              <Plus size={18}/> Add
            </Button>
          </form>
        </div>

        <div className={styles.tasksPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>My Tasks</h2>
            <span className={styles.taskCount}>{tasks.length}</span>
          </div>

          <form onSubmit={onCreate} className={styles.taskForm}>
            <div className={styles.formInputWrapper}>
              <input 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                placeholder="Add a new task..." 
                className={styles.input} 
              />
            </div>
            <input 
              type="date" 
              value={dueDate} 
              onChange={e=>setDueDate(e.target.value)} 
              className={styles.input} 
            />
            <select 
              value={status} 
              onChange={e=>setStatus(e.target.value)} 
              className={styles.input}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Button type="submit" className={styles.addBtn}>
              <Plus size={18} /> Add
            </Button>
          </form>

          <div className={styles.taskList}>
            {loading ? (
              <div className={styles.empty}>Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>✓</div>
                <p>All caught up! No tasks yet.</p>
              </div>
            ) : (
              tasks.map(t=> (
                <TaskItem 
                  key={t.taskId} 
                  title={t.title} 
                  dueDate={t.dueDate} 
                  status={t.status} 
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
)
}
