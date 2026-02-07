import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import flightsData from '../data/flights.json'
import { fetchAllFlights } from '../services/ypsilonApi'
import { testAPIConnection } from '../services/ypsilonApiTest'

function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    averageBookingValue: 0,
  })
  const [ypsilonFlights, setYpsilonFlights] = useState([])
  const [loadingFlights, setLoadingFlights] = useState(false)
  const [flightError, setFlightError] = useState(null)
  const [useYpsilonData, setUseYpsilonData] = useState(false)

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('skynav_bookings') || '[]')
    setBookings(storedBookings)
    
    const totalRevenue = storedBookings.reduce((sum, b) => sum + b.total_price, 0)
    setStats({
      totalBookings: storedBookings.length,
      totalRevenue,
      averageBookingValue: storedBookings.length > 0 ? totalRevenue / storedBookings.length : 0,
    })
  }, [])

  // Fetch flights from Ypsilon.Net API
  const loadYpsilonFlights = async () => {
    console.log('🔄 [AdminDashboard] Starting to load Ypsilon flights...')
    setLoadingFlights(true)
    setFlightError(null)
    
    try {
      console.log('📡 [AdminDashboard] Calling fetchAllFlights()...')
      const result = await fetchAllFlights()
      
      console.log('📦 [AdminDashboard] API Result:', result)
      console.log('📊 [AdminDashboard] Result Summary:', {
        success: result.success,
        flightsCount: result.flights?.length || 0,
        hasError: !!result.error,
        errorMessage: result.error,
      })

      if (result.success && result.flights.length > 0) {
        console.log('✅ [AdminDashboard] Successfully loaded flights:', result.flights.length)
        if (result.routesSearched) {
          console.log(`📊 [AdminDashboard] Searched ${result.routesSearched} routes, found flights in ${result.routesWithFlights} routes`)
        }
        if (result.errors && result.errors.length > 0) {
          console.warn('⚠️ [AdminDashboard] Some routes had errors:', result.errors)
        }
        setYpsilonFlights(result.flights)
        setUseYpsilonData(true)
      } else {
        const errorMsg = result.error || result.errors?.join('; ') || 'No flights data available from Ypsilon.Net API'
        console.warn('⚠️ [AdminDashboard] No flights found:', errorMsg)
        setFlightError(errorMsg)
        setUseYpsilonData(false)
      }
    } catch (error) {
      console.error('❌ [AdminDashboard] Error in loadYpsilonFlights:', error)
      console.error('❌ [AdminDashboard] Error Details:', {
        message: error.message,
        stack: error.stack,
      })
      setFlightError(`Error loading flights: ${error.message}`)
      setUseYpsilonData(false)
    } finally {
      console.log('🏁 [AdminDashboard] Finished loading flights')
      setLoadingFlights(false)
    }
  }

  useEffect(() => {
    // Auto-load Ypsilon flights on component mount
    // This will fetch flights from multiple popular routes
    loadYpsilonFlights()
  }, [])

  // Determine which flights to display
  const displayFlights = useYpsilonData && ypsilonFlights.length > 0 ? ypsilonFlights : flightsData.flights
  const flightsSource = useYpsilonData && ypsilonFlights.length > 0 ? 'Ypsilon.Net API' : 'Local Data'

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Total Bookings</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.totalBookings}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary-600">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Average Booking</h3>
          <p className="text-3xl font-bold text-primary-600">₹{Math.round(stats.averageBookingValue).toLocaleString()}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Booking ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Passenger</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Flight ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-b border-neutral-100 hover:bg-white">
                    <td className="py-3 px-4">{booking.booking_id}</td>
                    <td className="py-3 px-4">{booking.passenger.name}</td>
                    <td className="py-3 px-4">{booking.passenger.email}</td>
                    <td className="py-3 px-4">{booking.flight_id}</td>
                    <td className="py-3 px-4">₹{booking.total_price.toLocaleString()}</td>
                    <td className="py-3 px-4">{format(new Date(booking.booked_at), 'MMM dd, yyyy HH:mm')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Available Flights</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Total flights: {displayFlights.length} | Source: {flightsSource}
              {useYpsilonData && ypsilonFlights.length > 0 && (
                <span className="ml-2 text-green-600">
                  ✓ Fetched from Ypsilon.Net API
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {flightError && (
              <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded">
                {flightError}
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  console.log('🧪 [AdminDashboard] Testing API connection...')
                  const testResult = await testAPIConnection()
                  console.log('🧪 [AdminDashboard] Test Result:', testResult)
                  alert(`API Test Result:\nSuccess: ${testResult.success}\nStatus: ${testResult.status || 'N/A'}\nError: ${testResult.error || 'None'}\n\nCheck console for details.`)
                }}
                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-all text-xs font-medium"
                title="Test API Connection"
              >
                Test API
              </button>
              <button
                onClick={loadYpsilonFlights}
                disabled={loadingFlights}
                className="px-4 py-2 bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingFlights ? 'Loading...' : 'Refresh from Ypsilon API'}
              </button>
            </div>
          </div>
        </div>

        {loadingFlights && (
          <div className="text-center py-8">
            <p className="text-neutral-600">Loading flights from Ypsilon.Net API...</p>
          </div>
        )}

        {!loadingFlights && displayFlights.length === 0 && (
          <div className="text-center py-8">
            <p className="text-neutral-500 mb-4">No flights available</p>
            {flightError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-red-800 font-semibold mb-2">⚠️ API Error:</p>
                <p className="text-sm text-red-700 whitespace-pre-line text-left">
                  {flightError}
                </p>
                <div className="mt-4 text-xs text-red-600">
                  <p className="font-semibold mb-1">💡 Solutions:</p>
                  <ul className="list-disc list-inside space-y-1 text-left">
                    <li>Check browser Console (F12) for detailed error logs</li>
                    <li>Verify .env file has correct credentials</li>
                    <li>Ypsilon.Net XML API may require backend proxy due to CORS</li>
                    <li>Use iframe integration at /ibe route for booking engine</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {!loadingFlights && displayFlights.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Flight ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Route</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Airline</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Stops</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Seats Left</th>
                </tr>
              </thead>
              <tbody>
                {displayFlights.slice(0, 20).map((flight, index) => {
                  // Handle different flight data structures
                  const flightId = flight.id || flight.flight_id || `FL-${index + 1}`
                  const origin = flight.segments?.[0]?.from || flight.origin || flight.from || 'N/A'
                  const destination = flight.segments?.[flight.segments?.length - 1]?.to || flight.destination || flight.to || 'N/A'
                  const airlines = flight.airlines || (flight.airline ? [flight.airline] : ['N/A'])
                  const price = flight.price || flight.total_price || 0
                  const stops = flight.stops !== undefined ? flight.stops : (flight.segments?.length - 1 || 0)
                  const seatsLeft = flight.seats_left || flight.seats_available || 'N/A'

                  return (
                    <tr key={flightId} className="border-b border-neutral-100 hover:bg-white">
                      <td className="py-3 px-4">{flightId}</td>
                      <td className="py-3 px-4">
                        {origin} → {destination}
                      </td>
                      <td className="py-3 px-4">{Array.isArray(airlines) ? airlines.join(', ') : airlines}</td>
                      <td className="py-3 px-4">₹{price.toLocaleString()}</td>
                      <td className="py-3 px-4">{stops}</td>
                      <td className="py-3 px-4">{seatsLeft}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

