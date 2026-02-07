import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { getAirportCoordinates } from '../utils/airportCoordinates'

function FlightCard({ flight, onSelect, passengers = 2 }) {
  const navigate = useNavigate()
  const { formatCurrency, currencyDisplay } = useRegionalSettings()
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [showOutboundDetails, setShowOutboundDetails] = useState(false)
  const [showReturnDetails, setShowReturnDetails] = useState(false)
  const [showBaggageModal, setShowBaggageModal] = useState(false)
  const [baggageModalSegments, setBaggageModalSegments] = useState([])
  
  const handleBook = (e) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(flight.id)
    } else {
      navigate(`/booking/${flight.id}`)
    }
  }

  const formatTime = (isoString) => {
    return format(new Date(isoString), 'HH:mm')
  }

  const formatDate = (isoString) => {
    return format(new Date(isoString), 'dd.MM.yyyy')
  }

  const formatFullDate = (isoString) => {
    return format(new Date(isoString), 'EEEE, MMMM d, yyyy')
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${String(mins).padStart(2, '0')}`
  }

  const formatDurationText = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${String(mins).padStart(2, '0')} h`
  }

  const formatDurationHours = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${String(mins).padStart(2, '0')} hrs.`
  }

  // Get airport full name
  const getAirportName = (code) => {
    const names = {
      'DEL': 'Delhi - I. Gandhi Intl.',
      'LHR': 'London Heathrow',
      'LTN': 'London - Luton',
      'BOM': 'Mumbai/Bombay (BOM), Chhatrapati S. Maharaj',
      'SIN': 'Singapore',
      'BCN': 'Barcelona',
      'IST': 'Istanbul',
      'ALA': 'Almaty',
      'DXB': 'Dubai',
      'AUH': 'Abu Dhabi'
    }
    return names[code] || code
  }

  // Handle baggage icon click - combine outbound and return segments
  const handleBaggageClick = () => {
    // Combine all segments from both outbound and return flights
    const allSegments = [...flight.segments, ...returnFlight.segments]
    setBaggageModalSegments(allSegments)
    setShowBaggageModal(true)
  }

  // Calculate exact distance using Haversine formula
  const calculateDistance = (segment) => {
    const fromCoords = getAirportCoordinates(segment.from)
    const toCoords = getAirportCoordinates(segment.to)
    
    if (!fromCoords.lat || !toCoords.lat) {
      // Fallback if coordinates not found
      return 0
    }
    
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371 // Earth's radius in kilometers
    const dLat = (toCoords.lat - fromCoords.lat) * Math.PI / 180
    const dLon = (toCoords.lon - fromCoords.lon) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(fromCoords.lat * Math.PI / 180) * Math.cos(toCoords.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    
    return Math.round(distance)
  }

  const firstSegment = flight.segments[0]
  const lastSegment = flight.segments[flight.segments.length - 1]
  const airlinesLabel = flight.airlines.join(', ')
  const pricePerPerson = flight.price
  const totalPrice = pricePerPerson * passengers
  
  // Determine fare type
  const fareType = flight.fare_type || (flight.price < 800 ? 'LowCost (LOW)' : 'published (PUB)')
  
  // Check if arrival is next day
  const depDate = new Date(firstSegment.dep_time)
  const arrDate = new Date(lastSegment.arr_time)
  const isNextDay = arrDate.getDate() !== depDate.getDate() || arrDate.getMonth() !== depDate.getMonth()

  // Create mock return flight (reverse route, 7 days later)
  const returnDepDate = new Date(arrDate)
  returnDepDate.setDate(returnDepDate.getDate() + 7)
  
  const returnFlight = {
    segments: [
      {
        from: lastSegment.to,
        to: firstSegment.from,
        dep_time: returnDepDate.toISOString(),
        arr_time: new Date(returnDepDate.getTime() + flight.duration_total_min * 60000).toISOString(),
        duration_min: flight.duration_total_min,
        flight_no: flight.segments[0].flight_no.replace(/\d+/, (match) => String(parseInt(match) + 100)),
        airline: flight.airlines[0] || 'Airline'
      }
    ],
    duration_total_min: flight.duration_total_min,
    stops: flight.stops,
    airlines: flight.airlines,
    fare_type: fareType
  }

  const returnFirstSegment = returnFlight.segments[0]
  const returnLastSegment = returnFlight.segments[returnFlight.segments.length - 1]
  const returnDepDateObj = new Date(returnFirstSegment.dep_time)
  const returnArrDateObj = new Date(returnLastSegment.arr_time)
  const returnIsNextDay = returnArrDateObj.getDate() !== returnDepDateObj.getDate() || returnArrDateObj.getMonth() !== returnDepDateObj.getMonth()

  // Render detailed segment view
  const renderSegmentDetails = (segments, isReturn = false) => {
    return (
      <div className="mt-2 pt-2 border-t border-neutral-200">
        <div className="text-sm font-semibold text-neutral-700 mb-2">
          Travel time: {formatDurationHours(segments.reduce((sum, seg) => sum + seg.duration_min, 0))}
        </div>
        
        <div className="relative pl-8">
          {/* Vertical dashed line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 border-l-2 border-dashed" style={{ borderColor: '#0A1A2F' }}></div>
          
          {segments.map((segment, index) => {
            const segmentDepDate = new Date(segment.dep_time)
            const segmentArrDate = new Date(segment.arr_time)
            const isSegmentNextDay = segmentArrDate.getDate() !== segmentDepDate.getDate() || segmentArrDate.getMonth() !== segmentDepDate.getMonth()
            
            return (
              <div key={index} className="relative mb-3 last:mb-0">
                {/* Circle marker */}
                <div className="absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ 
                  backgroundColor: '#fff',
                  borderColor: '#0A1A2F',
                  marginLeft: '-12px',
                  marginTop: '4px'
                }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0A1A2F' }}></div>
                </div>
                
                {/* Departure */}
                <div className="mb-2 ml-4">
                  <div className="text-sm font-semibold text-neutral-900">
                    {formatFullDate(segment.dep_time)}
                  </div>
                  <div className="text-lg font-bold text-neutral-900 mt-0.5">
                    {formatTime(segment.dep_time)}
                  </div>
                  <div className="text-sm text-neutral-600 mt-0.5">
                    {segment.from} {segment.from === 'DEL' ? 'Delhi - I. Gandhi Intl.' : segment.from === 'LHR' ? 'London Heathrow' : segment.from === 'BOM' ? 'Mumbai/Bombay (BOM), Chhatrapati S. Maharaj' : segment.from === 'LTN' ? 'London - Luton' : segment.from === 'SIN' ? 'Singapore' : segment.from}
                  </div>
                </div>

                {/* Flight details */}
                <div className="ml-4 mb-2 p-2 bg-neutral-50 rounded border border-neutral-200">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-neutral-700">Duration {formatDuration(segment.duration_min)} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-neutral-700">Distance: {calculateDistance(segment)} km</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-semibold text-neutral-900">{segment.airline}</div>
                    <div className="text-sm text-neutral-600">{segment.flight_no}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm text-neutral-600">{fareType}</span>
                    <svg className="w-4 h-4 text-neutral-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-sm text-neutral-600">Economy</span>
                  </div>
                </div>

                {/* Arrival or Stopover */}
                {index < segments.length - 1 ? (
                  <div className="mb-2 ml-4">
                    <div className="text-sm font-semibold text-neutral-900">
                      {formatFullDate(segment.arr_time)}
                    </div>
                    <div className="text-lg font-bold text-neutral-900 mt-0.5">
                      {formatTime(segment.arr_time)}
                    </div>
                    <div className="text-sm text-neutral-600 mt-0.5">
                      {segment.to} {segment.to === 'DEL' ? 'Delhi - I. Gandhi Intl.' : segment.to === 'LHR' ? 'London Heathrow' : segment.to === 'BOM' ? 'Mumbai/Bombay (BOM), Chhatrapati S. Maharaj' : segment.to === 'LTN' ? 'London - Luton' : segment.to === 'SIN' ? 'Singapore' : segment.to}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5 italic">Stopover</div>
                  </div>
                ) : (
                  <div className="mb-2 ml-4">
                    <div className="text-sm font-semibold text-neutral-900">
                      {formatFullDate(segment.arr_time)}
                    </div>
                    <div className="text-lg font-bold text-neutral-900 mt-0.5">
                      {formatTime(segment.arr_time)}
                    </div>
                    <div className="text-sm text-neutral-600 mt-0.5">
                      {segment.to} {segment.to === 'DEL' ? 'Delhi - I. Gandhi Intl.' : segment.to === 'LHR' ? 'London Heathrow' : segment.to === 'BOM' ? 'Mumbai/Bombay (BOM), Chhatrapati S. Maharaj' : segment.to === 'LTN' ? 'London - Luton' : segment.to === 'SIN' ? 'Singapore' : segment.to}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-all mb-4"
      role="article"
      aria-label={`Flight from ${firstSegment.from} to ${lastSegment.to}`}
    >
      {/* Total Price at Top */}
      <div className="p-3 border-b border-neutral-200">
        <div className="text-3xl font-bold text-neutral-900">
          {formatCurrency(totalPrice)} {currencyDisplay.code}
        </div>
        <div className="text-sm text-neutral-600 mt-0.5">
          Price per person : Total price: {passengers} adult{passengers > 1 ? 's' : ''} - {formatCurrency(totalPrice)} {currencyDisplay.code}
        </div>
      </div>

      {/* Outbound Flight Section */}
      <div>
        {/* Outbound Header Bar */}
        <div className="text-white px-4 py-2 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, #0A1A2F 0%, #102A45 100%)' }}>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
            <span className="font-semibold">Outbound flight</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{fareType}</span>
          <span className="font-semibold">{airlinesLabel}</span>
        </div>
      </div>

        {/* Outbound Flight Summary */}
        <div className="p-3 bg-neutral-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#0A1A2F' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0A1A2F' }}></div>
        </div>
          <div>
            <div className="text-lg font-semibold text-neutral-900">
              {formatTime(firstSegment.dep_time)}
            </div>
            <div className="text-sm text-neutral-600">
              {formatDate(firstSegment.dep_time)}
            </div>
                <div className="text-sm font-medium text-neutral-900 mt-0.5">
                  {firstSegment.from} {firstSegment.from === 'DEL' ? 'Delhi - I. Gandhi Intl.' : firstSegment.from === 'LHR' ? 'London Heathrow' : firstSegment.from}
                </div>
              </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-neutral-900">
                  {formatDurationHours(flight.duration_total_min)}
                </span>
            </div>
              <div className="text-xs text-neutral-600 mt-0.5">
              {flight.stops === 0 ? 'Direct/Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-neutral-900">
              {formatTime(lastSegment.arr_time)}
            </div>
            <div className="text-sm text-neutral-600">
              {formatDate(lastSegment.arr_time)}
              {isNextDay && <span className="ml-1" style={{ color: '#0A1A2F' }}>(+1d)</span>}
            </div>
              <div className="text-sm font-medium text-neutral-900 mt-0.5">
                {lastSegment.to} {lastSegment.to === 'DEL' ? 'Delhi - I. Gandhi Intl.' : lastSegment.to === 'LHR' ? 'London Heathrow' : lastSegment.to}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOutboundDetails(!showOutboundDetails)
                }}
                className={`p-2 hover:bg-neutral-200 rounded transition ${showOutboundDetails ? 'bg-neutral-200' : ''}`}
              >
                <svg 
                  className={`w-5 h-5 text-neutral-600 transition-transform ${showOutboundDetails ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showOutboundDetails ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleBaggageClick()
                }}
                className="p-2 hover:bg-neutral-200 rounded"
                aria-label="View baggage details"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Outbound Detailed Segments */}
          {showOutboundDetails && renderSegmentDetails(flight.segments, false)}
        </div>
      </div>

      {/* Return Flight Section */}
      <div className="border-t border-neutral-200">
        {/* Return Header Bar */}
        <div className="text-white px-4 py-2 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, #0A1A2F 0%, #102A45 100%)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Return flight</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{returnFlight.fare_type}</span>
            <span className="font-semibold">{returnFlight.airlines.join(', ')}</span>
          </div>
        </div>

        {/* Return Flight Summary */}
        <div className="p-3 bg-neutral-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#0A1A2F' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0A1A2F' }}></div>
              </div>
              <div>
                <div className="text-lg font-semibold text-neutral-900">
                  {formatTime(returnFirstSegment.dep_time)}
                </div>
                <div className="text-sm text-neutral-600">
                  {formatDate(returnFirstSegment.dep_time)}
                </div>
                <div className="text-sm font-medium text-neutral-900 mt-0.5">
                  {returnFirstSegment.from} {returnFirstSegment.from === 'DEL' ? 'Delhi - I. Gandhi Intl.' : returnFirstSegment.from === 'LHR' ? 'London Heathrow' : returnFirstSegment.from === 'LTN' ? 'London - Luton' : returnFirstSegment.from}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-neutral-900">
                  {formatDurationHours(returnFlight.duration_total_min)}
                </span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">
                {returnFlight.stops === 0 ? 'Direct/Nonstop' : `${returnFlight.stops} stop${returnFlight.stops > 1 ? 's' : ''}`}
              </div>
            </div>
            
            <div>
              <div className="text-lg font-semibold text-neutral-900">
                {formatTime(returnLastSegment.arr_time)}
              </div>
              <div className="text-sm text-neutral-600">
                {formatDate(returnLastSegment.arr_time)}
                {returnIsNextDay && <span className="ml-1" style={{ color: '#0A1A2F' }}>(+1d)</span>}
              </div>
              <div className="text-sm font-medium text-neutral-900 mt-0.5">
                {returnLastSegment.to} {returnLastSegment.to === 'DEL' ? 'Delhi - I. Gandhi Intl.' : returnLastSegment.to === 'LHR' ? 'London Heathrow' : returnLastSegment.to === 'LTN' ? 'London - Luton' : returnLastSegment.to}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowReturnDetails(!showReturnDetails)
                }}
                className={`p-2 hover:bg-neutral-200 rounded transition ${showReturnDetails ? 'bg-neutral-200' : ''}`}
              >
                <svg 
                  className={`w-5 h-5 text-neutral-600 transition-transform ${showReturnDetails ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showReturnDetails ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleBaggageClick()
                }}
                className="p-2 hover:bg-neutral-200 rounded"
                aria-label="View baggage details"
              >
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Return Detailed Segments */}
          {showReturnDetails && renderSegmentDetails(returnFlight.segments, true)}
        </div>
      </div>

      {/* Payment Details and Action Buttons */}
      <div className="p-3 border-t border-neutral-200">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowPriceBreakdown(!showPriceBreakdown)
          }}
          className="text-sm font-medium mb-2 transition-colors flex items-center gap-2"
          style={{ color: '#0A1A2F' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPriceBreakdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
          PAYMENT DETAILS
        </button>

        {showPriceBreakdown && (
          <div className="mb-2 p-2 bg-neutral-50 rounded border border-neutral-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Base Fare ({passengers}x Adults):</span>
                <span className="font-semibold">{formatCurrency(pricePerPerson * passengers)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Taxes & Fees:</span>
                <span className="font-semibold">{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-300">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Add to compare functionality
              }}
              className="px-4 py-2 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition"
            >
              Add to comparison
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Show comparison functionality
              }}
              className="px-4 py-2 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition"
            >
              Show comparison
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Split functionality
              }}
              className="px-4 py-2 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Split
            </button>
          </div>
          <button
            onClick={handleBook}
            className="text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            style={{
              background: 'linear-gradient(90deg, #0A1A2F 0%, #102A45 100%)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #102A45 0%, #0A1A2F 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(90deg, #0A1A2F 0%, #102A45 100%)';
            }}
            aria-label={`Book flight ${flight.id}`}
          >
            to the offer
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Baggage Details Modal */}
      {showBaggageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBaggageModal(false)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900"> Allowances</h3>
              <button
                onClick={() => setShowBaggageModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {baggageModalSegments.map((segment, index) => (
                <div key={index} className={index !== baggageModalSegments.length - 1 ? "border-b border-neutral-200 pb-4 mb-4" : ""}>
                  <div className="font-semibold text-neutral-900 mb-3">
                    {getAirportName(segment.from)} ({segment.from}) - {getAirportName(segment.to)} ({segment.to})
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-700 mb-2">
                    <span>Cabin baggage:</span>
                    <span className="font-medium">included</span>
                    <svg className="w-4 h-4 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-neutral-700">
                    <span className="font-medium">Free Baggage Allowance:</span> cabin bag only
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlightCard
