import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchVisaApplications } from '../../services/adminService'

const AdminDocumentsPage = () => {
  const { token } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetchVisaApplications(token)
      if (res.success) setApplications(res.applications)
      setLoading(false)
    }
    if (token) load()
  }, [token])

  const uploads = useMemo(() => {
    const list = []
    applications.forEach((app) => {
      app.uploads?.forEach((u) => {
        list.push({
          ...u,
          applicationId: app._id,
          applicant: app.userId?.fullName || 'Applicant',
          visaType: app.visaType,
          country: app.country?.name || 'Unknown',
          createdAt: app.createdAt,
        })
      })
    })
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [applications])

  const labelStats = useMemo(() => {
    const map = new Map()
    uploads.forEach((u) => {
      map.set(u.label, (map.get(u.label) || 0) + 1)
    })
    return Array.from(map.entries()).map(([label, count]) => ({ label, count }))
  }, [uploads])

  const formatSize = (size) => {
    if (!size) return '0 KB'
    const kb = size / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Documents</h3>
        <p className="text-sm text-slate-500">
          Track live uploaded files from visa applications and verify required documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Total Uploads</h4>
          <p className="text-3xl font-black text-primary-700">{uploads.length}</p>
          <p className="text-xs text-slate-500 mt-2">Files attached to visa applications</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Document Types</h4>
          <p className="text-3xl font-black text-primary-700">{labelStats.length}</p>
          <p className="text-xs text-slate-500 mt-2">Unique document labels in uploads</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Latest Upload</h4>
          <p className="text-sm text-slate-600">
            {uploads[0]?.label ? `${uploads[0].label} • ${uploads[0].applicant}` : 'No uploads yet'}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {uploads[0]?.createdAt ? new Date(uploads[0].createdAt).toLocaleString() : ''}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-slate-800 mb-4">Uploads by Document Type</h4>
        {labelStats.length === 0 ? (
          <p className="text-sm text-slate-500">No document uploads found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {labelStats.map((item) => (
              <div key={item.label} className="border border-slate-100 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400">{item.count} upload(s)</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-slate-800 mb-4">Recent Uploads</h4>
        {loading ? (
          <p className="text-sm text-slate-500">Loading uploads...</p>
        ) : uploads.length === 0 ? (
          <p className="text-sm text-slate-500">No uploads available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Document</th>
                  <th>Applicant</th>
                  <th>Visa</th>
                  <th>File</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {uploads.slice(0, 10).map((u) => (
                  <tr key={`${u.applicationId}-${u.label}-${u.fileId}`} className="border-t border-slate-100">
                    <td className="py-2 font-semibold">{u.label}</td>
                    <td>{u.applicant}</td>
                    <td>{u.country} • {u.visaType}</td>
                    <td className="text-slate-500">{u.fileName || '—'}</td>
                    <td className="text-slate-500">{formatSize(u.size)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDocumentsPage
