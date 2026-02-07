import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { searchFlights, createFlight, deleteFlight } from '../../services/flightService'

const AdminFlightsPage = () => {
  const { token } = useAuth()
  const [flights, setFlights] = useState([])
  const [form, setForm] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    currency: 'USD',
    seatsAvailable: 0,
    baggage: '',
  })

  const loadFlights = async () => {
    const res = await searchFlights()
    if (res.success) setFlights(res.flights)
  }

  useEffect(() => {
    loadFlights()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), seatsAvailable: Number(form.seatsAvailable) }
    const res = await createFlight(payload, token)
    if (res.success) {
      setForm({ ...form, airline: '', flightNumber: '', from: '', to: '', departureTime: '', arrivalTime: '', price: '', seatsAvailable: 0, baggage: '' })
      loadFlights()
    }
  }

  const handleDelete = async (id) => {
    await deleteFlight(id, token)
    loadFlights()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Add Flight</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {['airline', 'flightNumber', 'from', 'to', 'departureTime', 'arrivalTime', 'baggage'].map((field) => (
            <input
              key={field}
              value={form[field]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
              placeholder={field}
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
              required={['airline', 'flightNumber', 'from', 'to', 'departureTime', 'arrivalTime'].includes(field)}
            />
          ))}
          <input
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="price"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
            required
          />
          <input
            value={form.seatsAvailable}
            onChange={(e) => setForm((prev) => ({ ...prev, seatsAvailable: e.target.value }))}
            placeholder="seatsAvailable"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <button className="bg-primary-600 text-white rounded-xl px-4 py-2 font-semibold">Save Flight</button>
        </form>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Flights</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2">Flight</th>
                <th>Route</th>
                <th>Price</th>
                <th>Seats</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f._id} className="border-t border-slate-100">
                  <td className="py-2">{f.airline} {f.flightNumber}</td>
                  <td>{f.from} → {f.to}</td>
                  <td>{f.currency} {f.price}</td>
                  <td>{f.seatsAvailable}</td>
                  <td>
                    <button className="text-red-600 text-xs" onClick={() => handleDelete(f._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {flights.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-slate-500">No flights found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminFlightsPage
