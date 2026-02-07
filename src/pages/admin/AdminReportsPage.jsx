import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchReports } from '../../services/adminService'

const AdminReportsPage = () => {
  const { token } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetchReports(token)
      if (res.success) setStats(res.stats)
    }
    if (token) load()
  }, [token])

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Reports</h3>
      {!stats ? (
        <p className="text-sm text-slate-500">Loading reports...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-100 rounded-xl p-4">
            <p className="text-xs uppercase text-slate-400 font-bold">Bookings</p>
            <p className="text-2xl font-black text-primary-700">{stats.bookings}</p>
          </div>
          <div className="border border-slate-100 rounded-xl p-4">
            <p className="text-xs uppercase text-slate-400 font-bold">Payments</p>
            <p className="text-2xl font-black text-primary-700">{stats.payments}</p>
          </div>
          <div className="border border-slate-100 rounded-xl p-4">
            <p className="text-xs uppercase text-slate-400 font-bold">Revenue</p>
            <p className="text-2xl font-black text-primary-700">${stats.revenue}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminReportsPage
