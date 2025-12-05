import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requireTeacher = false }) {
  const { isAuthenticated, isTeacher, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireTeacher && !isTeacher) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

