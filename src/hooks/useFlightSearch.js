import { useState, useMemo, useCallback } from 'react'

const STUB_AIRLINES = [
  'Aer Lingus',
  'Aeroflot',
  'Air Canada',
  'Air France',
  'Air India',
  'Air India Express',
  'Air New Zealand',
  'AirAsia',
  'Alitalia',
  'All Nippon Airways',
  'Asiana Airlines',
  'Austrian Airlines',
  'British Airways',
  'Brussels Airlines',
  'Cathay Pacific',
  'Czech Airlines',
  'EgyptAir',
  'Emirates',
  'Ethiopian Airlines',
  'Etihad Airways',
  'Finnair',
  'GoAir',
  'Iberia',
  'Icelandair',
  'IndiGo',
  'Japan Airlines',
  'KLM',
  'Kenya Airways',
  'Korean Air',
  'LOT Polish Airlines',
  'Lufthansa',
  'Malaysia Airlines',
  'Oman Air',
  'Qantas',
  'Qatar Airways',
  'Royal Air Maroc',
  'Royal Jordanian',
  'Saudia',
  'Scandinavian Airlines',
  'Singapore Airlines',
  'South African Airways',
  'SpiceJet',
  'Swiss International',
  'TAP Air Portugal',
  'TAROM',
  'Thai Airways',
  'Turkish Airlines',
  'United Airlines',
  'Virgin Atlantic',
  'Vistara',
  'flydubai',
]

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '')

const matchesStopFilter = (stops, filterStops = []) => {
  if (!filterStops || filterStops.length === 0) {
    return true
  }
  if (stops === 0 && filterStops.includes(0)) return true
  if (stops === 1 && filterStops.includes(1)) return true
  if (stops >= 2 && filterStops.includes(2)) return true
  return false
}

const matchesStubFilters = (stub, filters) => {
  if (filters.priceMin !== undefined && stub.price < filters.priceMin) return false
  if (filters.priceMax !== undefined && stub.price > filters.priceMax) return false
  if (filters.maxDuration !== undefined && stub.duration_total_min > filters.maxDuration) return false
  if (filters.refundableOnly && !stub.refundable) return false
  if (!matchesStopFilter(stub.stops, filters.stops)) return false
  return true
}

const createStubFlight = (airline, origin, destination) => {
  const index = STUB_AIRLINES.indexOf(airline)
  if (index === -1) return null
  const price = 38000 + index * 500
  const score = Math.min(9.5, 7 + (index % 20) * 0.12)
  const duration = 360 + (index % 5) * 30
  const depart = new Date(Date.UTC(2024, 2, 15, 6 + (index % 10), 0))
  const arrival = new Date(depart.getTime() + duration * 60000)
  const slug = slugify(airline)

  return {
    id: `stub-${slug}-${origin}-${destination}-${index}`,
    price,
    currency: 'INR',
    refundable: index % 3 !== 0,
    score,
    airlines: [airline],
    booking_token: `stub-token-${slug}-${index}`,
    segments: [
      {
        from: origin || 'DEL',
        to: destination || 'LHR',
        dep_time: depart.toISOString(),
        arr_time: arrival.toISOString(),
        duration_min: duration,
        flight_no: `ST${100 + index}`,
        airline,
      },
    ],
    duration_total_min: duration,
    stops: 0,
    transfers: [],
    seats_left: 5 + (index % 8),
    baggage_info: '1 checked bag (23kg), 1 carry-on (7kg)',
    booking_link: `https://example.com/book/stub-${slug}`,
  }
}

const appendStubFlights = (results, filters) => {
  if (!filters.airlines || filters.airlines.length === 0) return results
  const origin = filters.origin || 'DEL'
  const destination = filters.destination || 'LHR'
  const existingAirlines = new Set(results.flatMap(flight => flight.airlines || []))
  const stubs = filters.airlines
    .filter(airline => !existingAirlines.has(airline))
    .map(airline => createStubFlight(airline, origin, destination))
    .filter(stub => stub && matchesStubFilters(stub, filters))

  if (stubs.length === 0) {
    return results
  }

  return [...results, ...stubs]
}

const getFlightOrigin = (flight) => {
  return (
    flight.metadata?.origin ||
    flight.segments?.[0]?.from ||
    ''
  )
}

const getFlightDestination = (flight) => {
  return (
    flight.metadata?.destination ||
    flight.segments?.[flight.segments.length - 1]?.to ||
    ''
  )
}

export function useFlightSearch(initialResults = [], initialFilters = {}, initialSort = 'best', perPage = 10) {
  const [filters, setFilters] = useState(initialFilters)
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(1)

  const filteredAndSorted = useMemo(() => {
    let results = [...initialResults]

    // Filter by origin/destination
    if (filters.origin) {
      results = results.filter(flight =>
        getFlightOrigin(flight) === filters.origin
      )
    }
    if (filters.destination) {
      results = results.filter(flight =>
        getFlightDestination(flight) === filters.destination
      )
    }

    // Filter by price range
    if (filters.priceMin !== undefined) {
      results = results.filter(flight => flight.price >= filters.priceMin)
    }
    if (filters.priceMax !== undefined) {
      results = results.filter(flight => flight.price <= filters.priceMax)
    }

    // Filter by stops
    if (filters.stops && filters.stops.length > 0) {
      results = results.filter(flight => {
        if (filters.stops.includes(0) && flight.stops === 0) return true
        if (filters.stops.includes(1) && flight.stops === 1) return true
        if (filters.stops.includes(2) && flight.stops >= 2) return true
        return false
      })
    }

    // Filter by airlines
    if (filters.airlines && filters.airlines.length > 0) {
      results = results.filter(flight => 
        flight.airlines.some(airline => filters.airlines.includes(airline))
      )
    }

    // Filter by duration
    if (filters.maxDuration !== undefined) {
      results = results.filter(flight => flight.duration_total_min <= filters.maxDuration)
    }

    // Filter by departure time
    if (filters.departureTimeMin !== undefined || filters.departureTimeMax !== undefined) {
      results = results.filter(flight => {
        if (!flight.segments || flight.segments.length === 0) return true
        const firstSegment = flight.segments[0]
        const depTime = new Date(firstSegment.dep_time)
        const depMinutes = depTime.getHours() * 60 + depTime.getMinutes()
        
        if (filters.departureTimeMin !== undefined && depMinutes < filters.departureTimeMin) return false
        if (filters.departureTimeMax !== undefined && depMinutes > filters.departureTimeMax) return false
        return true
      })
    }

    // Filter by baggages (if flight has baggage_info)
    if (filters.baggages && filters.baggages.length > 0 && filters.baggages.length < 2) {
      results = results.filter(flight => {
        const hasFreeBag = flight.baggage_info && (
          flight.baggage_info.includes('checked') || 
          flight.baggage_info.includes('bag')
        )
        if (filters.baggages.includes('free-bag') && hasFreeBag) return true
        if (filters.baggages.includes('no-bag') && !hasFreeBag) return true
        return false
      })
    }

    // Filter by refundability
    if (filters.refundability && filters.refundability.length > 0 && filters.refundability.length < 3) {
      results = results.filter(flight => {
        if (filters.refundability.includes('refundable') && flight.refundable) return true
        if (filters.refundability.includes('non-refundable') && !flight.refundable) return true
        if (filters.refundability.includes('unknown') && flight.refundable === undefined) return true
        return false
      })
    }

    // Filter by fare types (if flight has fare_type)
    if (filters.fareTypes && filters.fareTypes.length > 0 && filters.fareTypes.length < 2) {
      results = results.filter(flight => {
        const fareType = flight.fare_type || (flight.price < 800 ? 'lowcost' : 'regular')
        return filters.fareTypes.includes(fareType)
      })
    }

    // Filter by class of service (if flight has class_of_service)
    if (filters.classOfService && filters.classOfService.length > 0 && filters.classOfService.length < 2) {
      results = results.filter(flight => {
        const classOfService = flight.class_of_service || 'economy'
        return filters.classOfService.includes(classOfService)
      })
    }

    // Filter by refundable
    if (filters.refundableOnly) {
      results = results.filter(flight => flight.refundable)
    }

    results = appendStubFlights(results, filters)

    // Sort
    const sorted = [...results].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'duration':
          return a.duration_total_min - b.duration_total_min
        case 'best':
        default:
          return b.score - a.score
      }
    })

    return sorted
  }, [initialResults, filters, sort])

  const total = filteredAndSorted.length
  const totalPages = Math.ceil(total / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const resultsPage = filteredAndSorted.slice(startIndex, endIndex)

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPage(1)
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
    setSort(initialSort)
    setPage(1)
  }, [initialFilters, initialSort])

  return {
    resultsPage,
    total,
    page,
    perPage,
    totalPages,
    setPage,
    setFilters: updateFilters,
    setSort,
    resetFilters,
    loading: false,
  }
}

