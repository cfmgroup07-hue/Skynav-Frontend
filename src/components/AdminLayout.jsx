import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { FaBell, FaChartPie, FaPassport, FaClipboardList, FaUsers, FaMoneyBill, FaChartBar, FaCog, FaFolderOpen } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { changePassword, requestPasswordReset, updateProfile } from '../services/authService'

const AdminLayout = () => {
  const { user, loading, logout, updateUser, token } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({ fullName: '', profilePicture: '' })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' })
  const [profileMessage, setProfileMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        profilePicture: user.profilePicture || '',
      })
    }
  }, [user])

  const handleProfileSave = async (e) => {
    e.preventDefault()
    setProfileMessage('')
    setIsSavingProfile(true)
    const res = await updateProfile(
      {
        fullName: profileForm.fullName.trim(),
        profilePicture: profileForm.profilePicture.trim() || undefined,
      },
      token
    )
    if (res.success && res.user) {
      updateUser(res.user)
      setProfileMessage('Profile updated successfully.')
    } else {
      setProfileMessage(res.message || 'Unable to update profile.')
    }
    setIsSavingProfile(false)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPasswordMessage('')
    setIsSavingPassword(true)
    const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword, token)
    if (res.success) {
      setPasswordForm({ currentPassword: '', newPassword: '' })
      setPasswordMessage('Password updated successfully.')
    } else {
      setPasswordMessage(res.message || 'Unable to change password.')
    }
    setIsSavingPassword(false)
  }

  const handleResetPassword = async () => {
    if (!user?.email) return
    setResetMessage('')
    const res = await requestPasswordReset(user.email)
    setResetMessage(res.message || 'Reset link sent if the email exists.')
  }

  const initials = (user?.fullName || 'Admin')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || !['admin', 'superadmin'].includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  const mainNavItems = [
    { to: '/admin', label: 'Dashboard', icon: <FaChartPie /> },
    { to: '/admin/visa-handle', label: 'Visa Handle', icon: <FaPassport /> },
    { to: '/admin/visa-hub', label: 'Visa Hub', icon: <FaChartBar /> },
    { to: '/admin/visa-apply-requests', label: 'Visa Apply Requests', icon: <FaClipboardList /> },
    { to: '/admin/documents', label: 'Documents', icon: <FaFolderOpen /> },
    { to: '/admin/client-requests', label: 'Client Requests', icon: <FaClipboardList /> },
    { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { to: '/admin/payments', label: 'Payments', icon: <FaMoneyBill /> },
    { to: '/admin/reports', label: 'Reports', icon: <FaChartBar /> },
  ]

  const settingsNavItems = [
    { to: '/admin/settings', label: 'Settings', icon: <FaCog /> },
  ]

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <aside
        className={`bg-white text-slate-700 h-screen hidden lg:flex flex-col transition-all duration-300 border-r border-slate-200 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`px-5 py-6 ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className="flex items-start justify-between">
            {!isSidebarCollapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-800">Admin Panel</h2>
                <p className="text-xs text-slate-400 mt-1">Super Admin</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? '›' : '‹'}
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-3 scrollbar-hidden">
          <div className={`${isSidebarCollapsed ? 'text-center' : ''}`}>
            {!isSidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Main
              </p>
            )}
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 border border-sky-100'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  {!isSidebarCollapsed && item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className={`${isSidebarCollapsed ? 'text-center' : ''}`}>
            {!isSidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Settings
              </p>
            )}
            <div className="space-y-2">
              {settingsNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 border border-sky-100'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  {!isSidebarCollapsed && item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto scrollbar-admin-light">
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-900">Super Admin Dashboard</h1>
            <p className="text-xs text-slate-500">Welcome back, {user?.fullName || 'Super Admin'}</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 bg-white">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="relative w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50">
              <FaBell className="mx-auto" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-slate-50"
            >
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-700">{user?.fullName || 'Super Admin'}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50"
                >
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Profile & Security</h2>
                <p className="text-xs text-slate-500">Update profile details and manage password.</p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-700">Profile Information</h3>
                <p className="text-xs text-slate-400">Shown in admin header and audit logs.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Full name"
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <input
                  value={profileForm.profilePicture}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, profilePicture: e.target.value }))}
                  placeholder="Profile image URL"
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
                />
              </div>
              {profileMessage && <p className="text-xs text-slate-500">{profileMessage}</p>}
              <button
                type="submit"
                disabled={isSavingProfile}
                className="bg-primary-600 text-white rounded-xl px-4 py-2 text-sm font-semibold"
              >
                {isSavingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </form>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-700">Security</h3>
                <p className="text-xs text-slate-400">Change password or request a reset link.</p>
              </div>
              <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Current password"
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="New password"
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="bg-slate-900 text-white rounded-xl px-4 py-2 text-sm font-semibold"
                >
                  {isSavingPassword ? 'Updating...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Send Reset Link
                </button>
              </form>
              {passwordMessage && <p className="text-xs text-slate-500">{passwordMessage}</p>}
              {resetMessage && <p className="text-xs text-slate-500">{resetMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLayout
