import React, { useEffect, useMemo, useState } from 'react'
import { FaClipboardList, FaMoneyBill, FaPassport, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { fetchAdminBookings, fetchAdminUsers, fetchVisaApplications, fetchReports } from '../../services/adminService'

const AdminDashboardPage = () => {
  const { token } = useAuth()
  const [stats, setStats] = useState({ bookings: 0, payments: 0, revenue: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentVisas, setRecentVisas] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [visaCount, setVisaCount] = useState(0)
  const [visaStatusCounts, setVisaStatusCounts] = useState({
    pending: 0,
    processing: 0,
    approved: 0,
    rejected: 0,
  })

  useEffect(() => {
    const load = async () => {
      const reportRes = await fetchReports(token)
      if (reportRes.success) setStats(reportRes.stats)

      const usersRes = await fetchAdminUsers(token)
      if (usersRes.success) setUserCount(usersRes.users.length)

      const bookingsRes = await fetchAdminBookings(token)
      if (bookingsRes.success) setRecentBookings(bookingsRes.bookings.slice(0, 5))

      const visaRes = await fetchVisaApplications(token)
      if (visaRes.success) {
        setRecentVisas(visaRes.applications.slice(0, 5))
        setVisaCount(visaRes.applications.length)
        const counts = visaRes.applications.reduce(
          (acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1
            return acc
          },
          { pending: 0, processing: 0, approved: 0, rejected: 0 }
        )
        setVisaStatusCounts(counts)
      }
    }
    if (token) load()
  }, [token])

  const statCards = useMemo(
    () => [
      { label: 'Total Users', value: userCount, icon: <FaUsers />, color: 'bg-blue-500' },
      { label: 'Visa Requests', value: visaCount, icon: <FaPassport />, color: 'bg-indigo-500' },
      { label: 'Total Bookings', value: stats.bookings, icon: <FaClipboardList />, color: 'bg-emerald-500' },
      { label: 'Payments', value: stats.payments, icon: <FaMoneyBill />, color: 'bg-amber-500' },
      { label: 'Pending Visas', value: visaStatusCounts.pending, icon: <FaPassport />, color: 'bg-orange-500' },
      { label: 'Approved Visas', value: visaStatusCounts.approved, icon: <FaPassport />, color: 'bg-green-500' },
      { label: 'Processing Visas', value: visaStatusCounts.processing, icon: <FaPassport />, color: 'bg-purple-500' },
      { label: 'Rejected Visas', value: visaStatusCounts.rejected, icon: <FaPassport />, color: 'bg-rose-500' },
    ],
    [stats, userCount, visaCount, visaStatusCounts]
  )

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-semibold">{card.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-2">{card.value}</p>
                <p className="text-[11px] text-slate-400 mt-2">Live data</p>
              </div>
              <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">System Overview</h3>
            <button className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 text-slate-600">
              Export Report
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500">Revenue Trend</p>
              <p className="text-2xl font-black text-slate-900 mt-2">${stats.revenue}</p>
              <p className="text-xs text-slate-400 mt-1">Last 30 days</p>
            </div>
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500">Payment Activity</p>
              <p className="text-2xl font-black text-slate-900 mt-2">{stats.payments}</p>
              <p className="text-xs text-slate-400 mt-1">Total payments logged</p>
            </div>
            <div className="border border-slate-100 rounded-2xl p-4 bg-white">
              <p className="text-xs font-semibold text-slate-500">Recent Visa Requests</p>
              {recentVisas.length === 0 ? (
                <p className="text-sm text-slate-500 mt-3">No visa requests yet.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {recentVisas.map((v) => (
                    <li key={v._id} className="flex items-center justify-between">
                      <span>{v.country?.name} ({v.visaType})</span>
                      <span className="text-slate-400 capitalize">{v.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border border-slate-100 rounded-2xl p-4 bg-white">
              <p className="text-xs font-semibold text-slate-500">Recent Bookings</p>
              {recentBookings.length === 0 ? (
                <p className="text-sm text-slate-500 mt-3">No bookings yet.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {recentBookings.map((b) => (
                    <li key={b._id} className="flex items-center justify-between">
                      <span>{b.airline} {b.flightNumber}</span>
                      <span className="text-slate-400">${b.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
            <button className="text-xs font-semibold text-sky-600">View All</button>
          </div>
          <div className="space-y-4 text-sm">
            {recentVisas.slice(0, 3).map((v) => (
              <div key={v._id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <FaPassport />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">
                    New visa request: {v.country?.name}
                  </p>
                  <p className="text-xs text-slate-400">{v.userId?.fullName || 'Client'}</p>
                </div>
              </div>
            ))}
            {recentBookings.slice(0, 2).map((b) => (
              <div key={b._id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <FaClipboardList />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">
                    Booking placed: {b.airline} {b.flightNumber}
                  </p>
                  <p className="text-xs text-slate-400">${b.price}</p>
                </div>
              </div>
            ))}
            {recentVisas.length === 0 && recentBookings.length === 0 && (
              <p className="text-sm text-slate-500">No recent activity yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
