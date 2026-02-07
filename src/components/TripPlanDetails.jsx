import { useState } from 'react'
import { format, differenceInDays } from 'date-fns'

// Airport full names mapping
const getAirportFullName = (code) => {
  const airportMap = {
    'DEL': 'I. Gandhi Intl.',
    'LHR': 'Heathrow',
    'DXB': 'Dubai International',
    'PNQ': 'Pune Airport',
    'MCO': 'Orlando International',
    'BOM': 'Chhatrapati Shivaji Maharaj International',
    'BLR': 'Kempegowda International',
    'CCU': 'Netaji Subhas Chandra Bose International',
    'MAA': 'Chennai International',
    'HYD': 'Rajiv Gandhi International',
    'HND': 'Haneda',
    'SHM': 'Nanki-Shirahama',
    'JFK': 'John F. Kennedy International',
    'LAX': 'Los Angeles International',
  }
  return airportMap[code] || code
}

// Terminal mapping
const getTerminal = (airport, isArrival = false) => {
  const terminalMap = {
    'DEL': { dep: 'Terminal 3', arr: 'Terminal 3' },
    'LHR': { dep: 'Terminal 5', arr: 'Terminal 5' },
    'HND': { dep: 'Terminal 3', arr: 'Terminal 1' },
    'SHM': { dep: 'Terminal 1', arr: 'Terminal 1' },
    'BOM': { dep: 'Terminal 2', arr: 'Terminal 2' },
    'PNQ': { dep: 'Terminal 1', arr: 'Terminal 1' },
    'JFK': { dep: 'Terminal 4', arr: 'Terminal 4' },
    'LAX': { dep: 'Terminal 2', arr: 'Terminal 2' },
  }
  const terminal = terminalMap[airport] || { dep: 'Terminal 1', arr: 'Terminal 1' }
  return isArrival ? terminal.arr : terminal.dep
}

// Aircraft type mapping
const getAircraftType = (segment) => {
  const aircraftTypes = [
    'Boeing 737-800',
    'Boeing 737-800 (winglets)',
    'Boeing 777-300ER',
    'Boeing 787',
    '789',
    'Airbus A320',
    'Airbus A350',
  ]
  return aircraftTypes[segment.flight_no?.charCodeAt(0) % aircraftTypes.length] || 'Boeing 737-800'
}

// Calculate distance
const calculateDistance = (from, to) => {
  const distances = {
    'DEL-HND': 5859,
    'HND-SHM': 461,
    'SHM-HND': 461,
    'HND-DEL': 5859,
    'DEL-LHR': 6715,
    'PNQ-MCO': 14500,
    'DEL-JFK': 11700,
    'JFK-LAX': 3944,
  }
  const key = `${from}-${to}`
  return distances[key] || Math.floor(Math.random() * 2000) + 500
}

// Check if flight is overnight
const isOvernight = (depTime, arrTime) => {
  const dep = new Date(depTime)
  const arr = new Date(arrTime)
  return differenceInDays(arr, dep) > 0 || (dep.getHours() >= 18 && arr.getHours() < 12)
}

// Format duration
const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')} h`
}

function TripPlanDetails({ flight, passengers = 1 }) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!flight || !flight.segments || flight.segments.length === 0) {
    return null
  }

  const formatTime = (isoString) => format(new Date(isoString), 'HH:mm')
  const formatDate = (isoString) => format(new Date(isoString), 'EEEE, dd.MM.yyyy')

  // Determine if it's a round trip
  const isRoundTrip = flight.segments.length > 1 && 
    flight.segments[0].to !== flight.segments[flight.segments.length - 1].from

  // Split segments into outbound and return
  let outboundSegments = []
  let returnSegments = []
  
  if (isRoundTrip && flight.segments.length > 1) {
    const firstDestination = flight.segments[0].to
    const splitIndex = flight.segments.findIndex((seg, idx) => 
      idx > 0 && seg.from === firstDestination
    )
    
    if (splitIndex > 0) {
      outboundSegments = flight.segments.slice(0, splitIndex)
      returnSegments = flight.segments.slice(splitIndex)
    } else {
      outboundSegments = flight.segments
    }
  } else {
    outboundSegments = flight.segments
  }

  const baggageInfo = flight.baggage_info || '2 pc/s (Adult)'
  const classOfService = flight.class_of_service || 'ECONOMY'

  const renderSegment = (segment, index, isLast, isReturn = false) => {
    const distance = calculateDistance(segment.from, segment.to)
    const aircraft = getAircraftType(segment)
    const overnight = isOvernight(segment.dep_time, segment.arr_time)

    return (
      <div key={index} className="relative">
        {/* Timeline line and dots */}
        <div className="flex items-start gap-4">
          {/* Left side - Timeline */}
          <div className="flex flex-col items-center">
            {/* Top dot (departure) - solid for first segment, hollow for connections */}
            {index === 0 && !isReturn ? (
              <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm z-10" style={{ background: 'linear-gradient(135deg, #0A1A2F 0%, #102A45 100%)' }}></div>
            ) : (
              <div className="w-4 h-4 rounded-full border-2 bg-white z-10" style={{ borderColor: '#0A1A2F' }}></div>
            )}
            
            {/* Dashed line - Separate line for each segment */}
            <div className="w-0.5 min-h-[280px] border-l-2 border-dashed my-2" style={{ borderColor: '#0A1A2F' }}></div>
            
            {/* Bottom dot (arrival) - always hollow */}
            <div className="w-4 h-4 rounded-full border-2 bg-white z-10" style={{ borderColor: '#0A1A2F' }}></div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 pb-6">
            {/* Departure Date and Time */}
            <div className="mb-2">
              <div className="text-sm font-semibold text-neutral-900">
                {formatDate(segment.dep_time)}, {formatTime(segment.dep_time)}
              </div>
            </div>

            {/* Flight Number */}
            <div className="mb-2">
              <div className="text-sm font-bold text-neutral-900">
                {segment.flight_no || `AI ${1000 + index}`}
              </div>
            </div>

            {/* Origin Airport */}
            <div className="mb-4">
              <div className="text-sm text-neutral-700">
                {getAirportFullName(segment.from)} ({segment.from}), {getTerminal(segment.from, false)}
              </div>
            </div>

            {/* Flight Details Grid */}
            <div className="space-y-2.5 mb-4">
              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Duration: {formatDuration(segment.duration_min || 120)}</span>
              </div>

              {/* Overnight indicator */}
              {overnight && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>overnight</span>
                </div>
              )}

              {/* Baggage */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Baggages: {baggageInfo}</span>
              </div>

              {/* Airline */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {segment.airline?.charAt(0) || flight.airlines[0]?.charAt(0) || 'A'}
                </div>
                <span className="font-semibold">{segment.airline || flight.airlines[0] || 'Airline'}</span>
              </div>

              {/* Class */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>{classOfService}</span>
              </div>

              {/* Meals */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Meals</span>
              </div>

              {/* Distance */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Distance: {distance} km</span>
              </div>

              {/* Aircraft Type */}
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>{aircraft}</span>
              </div>
            </div>

            {/* Arrival Date and Time */}
            <div className="mb-2">
              <div className="text-sm font-semibold text-neutral-900">
                {formatDate(segment.arr_time)}, {formatTime(segment.arr_time)}
              </div>
            </div>

            {/* Destination Airport */}
            <div>
              <div className="text-sm text-neutral-700">
                {getAirportFullName(segment.to)} ({segment.to}){getTerminal(segment.to, true) ? `, ${getTerminal(segment.to, true)}` : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Connection time if not last segment */}
        {!isLast && (
          <div className="ml-6 mb-6 pl-4 border-l-2 border-dashed border-neutral-300">
            <div className="text-xs text-neutral-600 italic">
              Connection time: {formatDuration(
                Math.floor((new Date(flight.segments[index + 1].dep_time) - new Date(segment.arr_time)) / 60000)
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 w-full -mx-4 px-4 md:-mx-6 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <h3 className="text-lg font-bold text-neutral-900">TRIP PLAN</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-neutral-900 hover:text-neutral-700 font-medium flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <span>HIDE</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              <span>SHOW</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6 max-h-[600px] overflow-y-auto scrollbar-hidden">
          {/* Outbound Section */}
          {outboundSegments.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A1A2F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <h4 className="text-base font-bold text-neutral-900">Outbound</h4>
              </div>
              <div className="space-y-6">
                {outboundSegments.map((segment, index) => 
                  renderSegment(segment, index, index === outboundSegments.length - 1, false)
                )}
              </div>
            </div>
          )}

          {/* Return Flight Section */}
          {returnSegments.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <h4 className="text-base font-bold text-neutral-900">Return flight</h4>
              </div>
              <div className="space-y-6">
                {returnSegments.map((segment, index) => 
                  renderSegment(segment, outboundSegments.length + index, index === returnSegments.length - 1, true)
                )}
              </div>
            </div>
          )}

          {/* Single trip (no return) - show as Outbound */}
          {!isRoundTrip && outboundSegments.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0A1A2F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <h4 className="text-base font-bold text-neutral-900">Return</h4>
              </div>
              <div className="space-y-6">
                {outboundSegments.map((segment, index) => 
                  renderSegment(segment, index, index === outboundSegments.length - 1, false)
                )}
              </div>
            </div>
          )}

          {/* Tariff Terms Link */}
          <div className="pt-4 mt-6 border-t border-neutral-200">
            <button className="text-sm font-medium flex items-center gap-1 transition-colors" style={{ color: '#0A1A2F' }}
            onMouseEnter={(e) => {
              e.target.style.color = '#102A45';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#0A1A2F';
            }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tariff terms
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TripPlanDetails
