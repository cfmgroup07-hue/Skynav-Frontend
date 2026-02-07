import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchVisaApplications } from '../../services/adminService'
import { updateVisaApplicationStatus } from '../../services/visaService'

const AdminVisaApplicationsPage = () => {
  const { token } = useAuth()
  const [applications, setApplications] = useState([])
  const [statusFilter, setStatusFilter] = useState('')

  const load = async () => {
    const res = await fetchVisaApplications(token, statusFilter || undefined)
    if (res.success) setApplications(res.applications)
  }

  useEffect(() => {
    if (token) load()
  }, [token, statusFilter])

  const updateStatus = async (id, status) => {
    await updateVisaApplicationStatus(id, status, '', token)
    load()
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">Visa Apply Requests</h3>
          <p className="text-xs text-slate-500">Approve or reject pending visa requests.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Applicant</th>
              <th>Country</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t border-slate-100">
                <td className="py-2">{app.userId?.fullName || 'User'}</td>
                <td>{app.country?.name}</td>
                <td>{app.visaType}</td>
                <td>{app.status}</td>
                <td className="space-x-2">
                  <button className="text-green-600 text-xs" onClick={() => updateStatus(app._id, 'approved')}>Approve</button>
                  <button className="text-red-600 text-xs" onClick={() => updateStatus(app._id, 'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-slate-500">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminVisaApplicationsPage
