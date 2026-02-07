import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import TripPlanDetails from '../components/TripPlanDetails'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import flightsData from '../data/flights.json'

function ConfirmationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { formatCurrency } = useRegionalSettings()
  const [booking, setBooking] = useState(null)
  const [flight, setFlight] = useState(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Get booking data from location state or localStorage
    const bookingId = new URLSearchParams(location.search).get('id')
    
    if (location.state?.booking && location.state?.flight) {
      setBooking(location.state.booking)
      setFlight(location.state.flight)
    } else if (bookingId) {
      // Try to get from localStorage
      const bookings = JSON.parse(localStorage.getItem('skynav_bookings') || '[]')
      const foundBooking = bookings.find(b => b.booking_id === bookingId)
      if (foundBooking) {
        setBooking(foundBooking)
        const foundFlight = flightsData.flights.find(f => f.id === foundBooking.flight_id)
        if (foundFlight) {
          setFlight({ ...foundFlight, metadata: flightsData.metadata })
        }
      } else {
        navigate('/')
      }
    } else {
      // Redirect if no booking data
      navigate('/')
    }

    // Animation effect
    setTimeout(() => setIsAnimating(false), 1000)
  }, [location, navigate])

  const formatTime = (isoString) => {
    return format(new Date(isoString), 'HH:mm')
  }

  const formatDate = (isoString) => {
    return format(new Date(isoString), 'MMM dd, yyyy')
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (!booking || !flight) {
    return (
      <div className="min-h-screen bg-sky-50">
        <div className="container mx-auto px-4 py-8">
          <div className="card text-center py-12">
            <p className="text-primary-600 text-lg">Loading booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  const firstSegment = flight.segments[0]
  const lastSegment = flight.segments[flight.segments.length - 1]

  return (
    <div className="min-h-screen bg-sky-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator - All Completed */}
          <div className="bg-white rounded-xl p-6 mb-8 border border-neutral-200 shadow-lg">
            <div className="flex items-center justify-between">
              {/* Step 1: Search - Completed */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-900 font-medium">Search</span>
              </div>

              {/* Chevron Separator */}
              <div className="flex-shrink-0 mx-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 2: Pricelist - Completed */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-900 font-medium">Pricelist</span>
              </div>

              {/* Chevron Separator */}
              <div className="flex-shrink-0 mx-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 3: Booking - Completed */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-900 font-medium">Booking</span>
              </div>

              {/* Chevron Separator */}
              <div className="flex-shrink-0 mx-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 4: Confirmation - Active/Completed */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-900 font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] p-8 text-center text-white relative overflow-hidden">
              <div className={`absolute inset-0 bg-white opacity-10 ${isAnimating ? 'animate-pulse' : ''}`}></div>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 ${isAnimating ? 'animate-bounce' : ''}`}>
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-lg text-white/90">
                  Your flight ticket has been generated successfully
                </p>
                <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-semibold">Booking ID: {booking.booking_id}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Trip Plan Details */}
              <div className="mb-8">
                <TripPlanDetails flight={flight} passengers={1} />
              </div>

              {/* E-Ticket Card */}
              <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-xl p-8 mb-8 border-2 border-blue-200 shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] bg-clip-text text-transparent mb-2">
                      E-TICKET
                    </h2>
                    <p className="text-sm text-neutral-600 font-medium">skynav.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600 mb-1">Booking ID</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] bg-clip-text text-transparent">
                      {booking.booking_id}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                  {/* Passenger Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-neutral-200">
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Passenger Name</p>
                      <p className="text-xl font-bold text-neutral-900">{booking.passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-lg font-semibold text-neutral-700">{booking.passenger.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Phone</p>
                      <p className="text-lg font-semibold text-neutral-700">{booking.passenger.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Passport</p>
                      <p className="text-lg font-semibold text-neutral-700">{booking.passenger.passportNumber}</p>
                    </div>
                  </div>

                  {/* Flight Route */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">From</p>
                      <p className="text-3xl font-bold text-neutral-900 mb-1">{firstSegment.from}</p>
                      <p className="text-sm text-neutral-600">
                        {formatDate(firstSegment.dep_time)} {formatTime(firstSegment.dep_time)}
                      </p>
                    </div>
                    <div className="flex-1 text-center px-4">
                      <div className="inline-flex flex-col items-center">
                        <div className="text-xs font-semibold text-neutral-500 mb-1">Duration</div>
                        <div className="text-lg font-bold text-neutral-900">{formatDuration(flight.duration_total_min)}</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">To</p>
                      <p className="text-3xl font-bold text-neutral-900 mb-1">{lastSegment.to}</p>
                      <p className="text-sm text-neutral-600">
                        {formatDate(lastSegment.arr_time)} {formatTime(lastSegment.arr_time)}
                      </p>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Airline</p>
                      <p className="text-lg font-semibold text-neutral-900">{flight.airlines.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Total Amount</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] bg-clip-text text-transparent">
                        {formatCurrency(booking.total_price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Reference */}
                <div className="bg-white rounded-xl p-6 border-2 border-dashed border-blue-300">
                  <p className="text-sm font-bold text-center mb-3 text-neutral-700">Booking Reference</p>
                  <div className="font-mono text-lg text-center break-all bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                    {booking.booking_token}
                  </div>
                  <p className="text-xs text-neutral-500 text-center mt-3">
                    Please save this reference number for your records
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="flex-1 px-6 py-4 bg-white border-2 border-neutral-300 rounded-xl text-neutral-700 font-semibold hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Print Ticket</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Book Another Flight</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage

