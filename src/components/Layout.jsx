import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '../contexts/AuthContext'

function Layout() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (user && ['admin', 'superadmin'].includes(user.role)) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

