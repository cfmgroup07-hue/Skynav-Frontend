import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchPayments } from '../../services/adminService'

const AdminPaymentsPage = () => {
  const { token } = useAuth()
  const [payments, setPayments] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetchPayments(token)
      if (res.success) setPayments(res.payments)
    }
    if (token) load()
  }, [token])

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Payments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t border-slate-100">
                <td className="py-2">{p.reference}</td>
                <td>{p.currency} {p.amount}</td>
                <td>{p.status}</td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-slate-500">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPaymentsPage
