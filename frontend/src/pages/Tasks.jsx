import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import TextField from '../components/TextField'
import TaskItem from '../components/TaskItem'
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { useAuth } from '../contexts/AuthContext'
import { Plus, ArrowLeft } from 'lucide-react'

export default function Tasks() {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(id ? true : false)
  const [editingTask, setEditingTask] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [status, setStatus] = useState('pending')
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [creating, setCreating] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      await loadData()
      if (id) {
        loadTask(id)
      }
    }
    init()
  }, [id])

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

  const loadTask = async (taskId) => {
    try {
      const task = await getTask(taskId)
      if (task) {
        setEditingTask(task)
        setTitle(task.title)
        setDescription(task.description || '')
        
        // Safely parse date with error handling
        if (task.dueDate) {
          try {
            const date = new Date(task.dueDate)
            if (!isNaN(date.getTime())) {
              setDueDate(date.toISOString().split('T')[0])
              setDueTime(date.toTimeString().split(' ')[0].substring(0, 5))
            } else {
              // Invalid date, set to today
              const today = new Date()
              setDueDate(today.toISOString().split('T')[0])
              setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
            }
          } catch (e) {
            // Date parsing failed, set to today
            const today = new Date()
            setDueDate(today.toISOString().split('T')[0])
            setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
          }
        } else {
          // No due date, set to today
          const today = new Date()
          setDueDate(today.toISOString().split('T')[0])
          setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
        }
        
        // Don't set status from task - status is managed by system
        setStatus('pending') // Default for form, but won't be used when editing
        setCategoryId(task.categoryId || '')
        setShowForm(true)
      }
    } catch (error) {
      console.error('Failed to load task:', error)
      navigate('/tasks')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!title.trim()) nextErrors.title = 'Title is required'
    if (!dueDate) nextErrors.dueDate = 'Deadline date is required'
    if (!dueTime) nextErrors.dueTime = 'Deadline time is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    
    setCreating(true)
    try {
      const dueDateTime = `${dueDate}T${dueTime}:00`
      const payload = {
        title,
        description: description || '',
        dueDate: dueDateTime,
        // Status is system-managed: preserve existing status when editing, always 'pending' when creating
        status: editingTask ? editingTask.status : 'pending',
        categoryId: categoryId ? Number(categoryId) : null,
      }
      
      if (editingTask) {
        await updateTask(editingTask.taskId, payload)
      } else {
        await createTask(payload)
      }
      
      await loadData()
      if (editingTask) {
        resetForm()
        navigate('/tasks')
      } else {
        resetForm()
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save task' })
    } finally {
      setCreating(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
    setDueTime('')
    setStatus('pending')
    setCategoryId('')
    setErrors({})
    setEditingTask(null)
    setShowForm(false)
  }

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await deleteTask(taskId)
      // Remove from local state immediately for better UX
      setTasks(prev => prev.filter(t => t.taskId !== taskId))
      // Reload to ensure sync with backend
      await loadData()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete task. Please try again.')
    }
  }

  const onAddCategory = async (e) => {
    e.preventDefault()
    if (!newCat.trim()) return
    try {
      const saved = await createCategory({ name: newCat })
      setCategories(prev => [...prev, saved])
      setNewCat('')
      setCategoryId(saved.categoryId)
    } catch {
      // keep existing categories on error
    }
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 28, color: '#0f172a', margin: '0 0 8px 0' }}>
              Tasks
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>
              Manage your tasks and assignments
            </p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus size={18} style={{ marginRight: '8px' }} /> Create Task
            </Button>
          )}
        </div>

        {showForm && (
          <Card style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={resetForm}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowLeft size={20} color="#6b7280" />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {errors.submit && (
                <div style={{ color: '#ef4444', fontSize: '14px', padding: '8px', background: '#fee2e2', borderRadius: '6px' }}>
                  {errors.submit}
                </div>
              )}
              
              <TextField
                label="Task Title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  placeholder="Enter task description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                    Due Date {errors.dueDate && <span style={{ color: '#ef4444' }}>*</span>}
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: errors.dueDate ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                    Due Time {errors.dueTime && <span style={{ color: '#ef4444' }}>*</span>}
                  </label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: errors.dueTime ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button type="button" onClick={resetForm} style={{ background: '#6b7280' }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
            All Tasks ({tasks.length})
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tasks.map(t => (
                <TaskItem
                  key={t.taskId}
                  title={t.title}
                  description={t.description}
                  dueDate={t.dueDate}
                  status={t.status}
                  categoryName={t.categoryName}
                  taskId={t.taskId}
                  onDelete={() => handleDelete(t.taskId)}
                  onEdit={() => navigate(`/tasks/edit/${t.taskId}`)}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  )
}
