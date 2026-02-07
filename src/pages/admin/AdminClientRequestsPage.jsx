import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { fetchVisaApplications } from '../../services/adminService'

const AdminClientRequestsPage = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetchVisaApplications(token, 'pending')
      if (res.success) setRequests(res.applications)
      setLoading(false)
    }
    if (token) load()
  }, [token])

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Client Requests</h3>
          <p className="text-sm text-slate-500">
            Live pending visa requests from clients. Review and take action.
          </p>
        </div>
        <button
          className="text-xs font-bold px-3 py-2 rounded-xl bg-primary-600 text-white"
          onClick={() => navigate('/admin/visa-apply-requests')}
        >
          Open Requests
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Request ID</th>
              <th>Client</th>
              <th>Country</th>
              <th>Visa Type</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-slate-500">Loading requests...</td>
              </tr>
            )}
            {!loading && requests.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-slate-500">No pending requests.</td>
              </tr>
            )}
            {!loading && requests.map((req) => (
              <tr key={req._id} className="border-t border-slate-100">
                <td className="py-2 font-semibold">{req._id}</td>
                <td>{req.userId?.fullName || 'Client'}</td>
                <td>{req.country?.name || '—'}</td>
                <td>{req.visaType}</td>
                <td className="capitalize">{req.status}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminClientRequestsPage
