import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getMyVisaApplications } from '../services/visaService'
import { useTranslation } from 'react-i18next'
import { formatDate } from '../utils/formatters'

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700',
  processing: 'bg-blue-50 text-blue-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
}

const VisaStatusPage = () => {
  const { token } = useAuth()
  const { i18n } = useTranslation()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const submittedId = searchParams.get('submitted')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const response = await getMyVisaApplications(token)
      if (response.success) {
        setApplications(response.applications || [])
      }
      setLoading(false)
    }
    if (token) {
      load()
    }
  }, [token])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto px-6 pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Visa Applications</h1>
            <p className="text-slate-500 text-sm">Track your application status in real-time</p>
          </div>
        </div>

        {submittedId && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold">
            Application submitted successfully. Tracking ID: {submittedId}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center text-slate-500">
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center text-slate-500">
            No visa applications found.
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {app.country?.name} {app.visaType} visa
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Submitted: {formatDate(app.createdAt, i18n.language)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[app.status] || 'bg-slate-100 text-slate-700'}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-slate-400">Payment: {app.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VisaStatusPage
