import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import WelcomeCard from '../components/WelcomeCard'
import StatsCardRow from '../components/StatsCardRow'
import CategoriesCard from '../components/CategoriesCard'
import TasksCard from '../components/TasksCard'
import { getTasks } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { useAuth } from '../contexts/AuthContext'
import { Plus } from 'lucide-react'
import Button from '../components/Button'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        getTasks(),
        getCategories()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (name) => {
    try {
      await createCategory({ name })
      await loadData()
    } catch (error) {
      console.error('Failed to create category:', error)
      alert('Failed to create category')
    }
  }

  const handleCategoryDeleted = (categoryId) => {
    setCategories(prev => prev.filter(c => c.categoryId !== categoryId))
    if (activeCategoryId === categoryId) {
      setActiveCategoryId(null)
    }
  }

  const visibleTasks = activeCategoryId
    ? tasks.filter(t => t.categoryId === activeCategoryId)
    : tasks

  const completed = visibleTasks.filter(t => t.status === 'completed').length
  const pending = visibleTasks.filter(t => t.status === 'pending').length
  const inProgress = visibleTasks.filter(t => t.status === 'in_progress').length
  const total = visibleTasks.length

  const todayTasks = visibleTasks.filter(t => {
    if (!t.dueDate) return false
    try {
      const taskDate = new Date(t.dueDate)
      const today = new Date()
      return taskDate.toDateString() === today.toDateString()
    } catch {
      return false
    }
  })

  const userName = user?.userDto?.name || user?.name || 'User'

  if (loading) {
    return (
      <AppLayout>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
            Loading dashboard...
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24
        }}>
          <div>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 8px 0',
              lineHeight: 1.2
            }}>
              Dashboard
            </h1>
            <p style={{
              fontSize: 15,
              color: '#64748b',
              margin: 0
            }}>
              Stay on top of your assignments
            </p>
          </div>
          <Button onClick={() => navigate('/tasks/create')} style={{ fontSize: '14px', padding: '10px 20px' }}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Create Task
          </Button>
        </div>
        
        <WelcomeCard 
          greeting={`Welcome ${userName} 👋`}
          taskCount={todayTasks.length}
        />

        <div style={{ marginBottom: 24 }}>
          <StatsCardRow 
            completed={completed} 
            pending={pending} 
            inProgress={inProgress} 
            total={total} 
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'minmax(320px, 400px) 1fr',
          gap: 24,
          alignItems: 'start'
        }}>
          <CategoriesCard
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setActiveCategoryId}
            onAddCategory={handleAddCategory}
            onCategoryDeleted={handleCategoryDeleted}
          />
          
          <TasksCard tasks={visibleTasks} loading={loading} />
        </div>
      </div>
    </AppLayout>
  )
}
