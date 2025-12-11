import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import WelcomeCard from '../components/WelcomeCard'
import StatsCardRow from '../components/StatsCardRow'
import CategoriesCard from '../components/CategoriesCard'
import TasksCard from '../components/TasksCard'
import { getTasks, updateTaskStatus } from '../api/tasks'
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
      // Extract error message from backend response
      let errorMessage = 'Failed to create category'
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          try {
            const parsed = JSON.parse(error.response.data)
            errorMessage = parsed.message || errorMessage
          } catch {
            errorMessage = error.response.data
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        }
      } else if (error.message) {
        errorMessage = error.message
      }
      alert(errorMessage)
    }
  }

  const handleCategoryDeleted = (categoryId) => {
    // Normalize IDs for safe comparison before filtering
    const normalizeId = (id) => id != null ? String(id) : null
    const normalizedDeletedId = normalizeId(categoryId)
    
    setCategories(prev => prev.filter(c => {
      const catId = normalizeId(c.categoryId)
      return catId !== normalizedDeletedId
    }))
    
    // Reset active category if the deleted one was active
    const normalizedActiveId = normalizeId(activeCategoryId)
    if (normalizedDeletedId === normalizedActiveId) {
      setActiveCategoryId(null)
    }
  }

  // Helper function to normalize IDs for comparison (handles both string and number)
  const normalizeId = (id) => {
    if (id == null) return null
    return String(id)
  }

  // Filter tasks by category - handle type mismatch between string and number
  const visibleTasks = activeCategoryId != null
    ? tasks.filter(t => {
        // Normalize both IDs to strings for safe comparison
        const taskCategoryId = normalizeId(t.categoryId)
        const activeId = normalizeId(activeCategoryId)
        return taskCategoryId === activeId
      })
    : tasks

  // Dashboard statistics should use ALL tasks, not filtered by category
  const completed = tasks.filter(t => t.status === 'completed').length
  const pending = tasks.filter(t => t.status === 'pending').length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const total = tasks.length

  const todayTasks = visibleTasks.filter(t => {
    if (!t.dueDate) return false
    try {
      const taskDate = new Date(t.dueDate)
      if (isNaN(taskDate.getTime())) return false
      
      const today = new Date()
      // Compare year, month, and day only (ignore time)
      return taskDate.getFullYear() === today.getFullYear() &&
             taskDate.getMonth() === today.getMonth() &&
             taskDate.getDate() === today.getDate()
    } catch {
      return false
    }
  })

  const userName = user?.userDto?.name || user?.name || 'User'

  const handleStatusChange = async (taskId, nextStatus) => {
    await updateTaskStatus(taskId, nextStatus)
    setTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, status: nextStatus } : t))
  }

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
          
          <TasksCard tasks={visibleTasks} loading={loading} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </AppLayout>
  )
}
