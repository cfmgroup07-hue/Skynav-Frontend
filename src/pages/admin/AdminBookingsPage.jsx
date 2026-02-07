import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchAdminBookings } from '../../services/adminService'

const AdminBookingsPage = () => {
  const { token } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetchAdminBookings(token)
      if (res.success) setBookings(res.bookings)
    }
    if (token) load()
  }, [token])

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Flight</th>
              <th>Route</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t border-slate-100">
                <td className="py-2">{b.airline} {b.flightNumber}</td>
                <td>{b.from} → {b.to}</td>
                <td>{b.currency} {b.price}</td>
                <td>{b.bookingStatus}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-slate-500">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminBookingsPage
