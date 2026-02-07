import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResultsList from '../components/ResultsList'
import FiltersSidebar from '../components/FiltersSidebar'
import CompactSearchForm from '../components/CompactSearchForm'
import CheapestDealsTable from '../components/CheapestDealsTable'
import { useFlightSearch } from '../hooks/useFlightSearch'
import { searchFlights as searchYpsilonFlights } from '../services/ypsilonApi'

const deriveFlightMetadata = (flight, fallback = {}) => {
  const firstSegment = flight.segments?.[0] || {}
  const lastSegment = flight.segments?.[flight.segments.length - 1] || {}
  const baseMetadata = flight.metadata || {}
  const fallbackMetadata = fallback || {}

  const formatDate = (isoString) => isoString?.split('T')[0] || null

  const origin = baseMetadata.origin ?? firstSegment.from ?? fallbackMetadata.origin ?? ''
  const destination = baseMetadata.destination ?? lastSegment.to ?? fallbackMetadata.destination ?? ''
  const depart_date =
    baseMetadata.depart_date ??
    formatDate(firstSegment.dep_time) ??
    fallbackMetadata.depart_date ??
    ''
  const return_date =
    baseMetadata.return_date ??
    formatDate(lastSegment.arr_time) ??
    fallbackMetadata.return_date ??
    null
  const scraped_at = baseMetadata.scraped_at ?? fallbackMetadata.scraped_at ?? null

  return { origin, destination, depart_date, return_date, scraped_at }
}

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchFilters = location.state?.filters || {}
  
  // Start with empty array - only API data will be shown
  const [allFlights, setAllFlights] = useState([])
  const [loadingYpsilonFlights, setLoadingYpsilonFlights] = useState(false)
  const [ypsilonError, setYpsilonError] = useState(null)

  const availableFacets = useMemo(() => {
    if (allFlights.length === 0) {
      return {
        priceMin: 0,
        priceMax: 100000,
        durationMax: 1440,
        airlines: [],
      }
    }
    
    const prices = allFlights.map(f => f.price)
    const durations = allFlights.map(f => f.duration_total_min)
    const airlinesSet = new Set()
    allFlights.forEach(f => f.airlines?.forEach(a => airlinesSet.add(a)))

    return {
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
      durationMax: Math.max(...durations),
      airlines: Array.from(airlinesSet).sort(),
    }
  }, [allFlights])

  const [filters, setFilters] = useState({
    origin: searchFilters.origin,
    destination: searchFilters.destination,
    priceMin: availableFacets.priceMin,
    priceMax: availableFacets.priceMax,
    stops: [],
    airlines: [],
    maxDuration: availableFacets.durationMax,
    departureTimeMin: 0,
    departureTimeMax: 1435,
    baggages: ['no-bag', 'free-bag'],
    refundability: ['non-refundable', 'unknown', 'refundable'],
    fareTypes: ['lowcost', 'regular'],
    classOfService: ['economy', 'premium-economy'],
    refundableOnly: false,
    sort: 'best',
  })

  const {
    resultsPage,
    total,
    page,
    totalPages,
    setPage,
    setFilters: updateFilters,
  } = useFlightSearch(allFlights, filters, filters.sort, 6)

  // Fetch flights from Ypsilon API when search is performed
  useEffect(() => {
    if (searchFilters.origin && searchFilters.destination) {
      console.log('🔍 [ResultsPage] Search filters detected, fetching from Ypsilon API...', searchFilters)
      setLoadingYpsilonFlights(true)
      setYpsilonError(null)
      
      // Format dates for API (YYYY-MM-DD)
      let departDate = searchFilters.depart_date
      if (departDate && !departDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Convert from other formats if needed
        const date = new Date(departDate)
        if (!isNaN(date.getTime())) {
          departDate = date.toISOString().split('T')[0]
        }
      }
      
      // If no date provided, use tomorrow's date
      if (!departDate) {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        departDate = tomorrow.toISOString().split('T')[0]
      }
      
      // Fetch from Ypsilon API
      searchYpsilonFlights({
        origin: searchFilters.origin,
        destination: searchFilters.destination,
        depart_date: departDate,
        return_date: searchFilters.return_date,
        adults: searchFilters.passengers?.adults || 1,
        children: searchFilters.passengers?.children || 0,
        infants: searchFilters.passengers?.infants || 0,
        cabin: searchFilters.cabin || 'Economy',
      })
        .then((result) => {
          console.log('📦 [ResultsPage] Ypsilon API Result:', result)
          if (result.success && result.flights && result.flights.length > 0) {
            console.log(`✅ [ResultsPage] Found ${result.flights.length} flights from Ypsilon API`)
            // Add metadata to flights
            const flightsWithMetadata = result.flights.map((flight) => ({
              ...flight,
              metadata: {
                origin: searchFilters.origin,
                destination: searchFilters.destination,
                depart_date: searchFilters.depart_date,
                return_date: searchFilters.return_date,
              },
            }))
            
            // Remove duplicates based on unique flight ID or combination of key fields
            // Create a Set to track seen flights
            const seenFlights = new Set()
            const uniqueFlights = flightsWithMetadata.filter((flight) => {
              // Create a unique key for each flight
              const flightKey = flight.id || 
                `${flight.segments?.[0]?.from || ''}-${flight.segments?.[flight.segments.length - 1]?.to || ''}-${flight.segments?.[0]?.dep_time || ''}-${flight.price || ''}-${flight.airlines?.[0] || ''}`
              
              if (seenFlights.has(flightKey)) {
                return false // Duplicate, skip it
              }
              seenFlights.add(flightKey)
              return true // Unique flight
            })
            
            if (flightsWithMetadata.length !== uniqueFlights.length) {
              console.log(`✅ [ResultsPage] Removed ${flightsWithMetadata.length - uniqueFlights.length} duplicate flights`)
            }
            console.log(`✅ [ResultsPage] Showing ${uniqueFlights.length} unique flights from Ypsilon API`)
            setAllFlights(uniqueFlights)
            setYpsilonError(null)
          } else {
            console.warn('⚠️ [ResultsPage] No flights from Ypsilon API')
            setYpsilonError(result.error || 'No flights found from Ypsilon API')
            // Clear flights - only show API data
            setAllFlights([])
          }
        })
        .catch((error) => {
          console.error('❌ [ResultsPage] Error fetching from Ypsilon API:', error)
          setYpsilonError(error.message)
          // Clear flights - only show API data
          setAllFlights([])
        })
        .finally(() => {
          setLoadingYpsilonFlights(false)
        })
      
      // Update filters
      updateFilters({
        origin: searchFilters.origin,
        destination: searchFilters.destination,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters.origin, searchFilters.destination, searchFilters.depart_date])

  // Get initial search values for the form - memoized to prevent re-renders
  // This replaces the old getInitialSearchValues function to prevent infinite loops
  const initialSearchValues = useMemo(() => {
    return {
      origin: filters.origin || searchFilters.origin || '',
      destination: filters.destination || searchFilters.destination || '',
      depart_date: searchFilters.depart_date || '',
      return_date: searchFilters.return_date || '',
      passengers: searchFilters.passengers?.adults || 2,
      cabin: searchFilters.cabin || 'Economy',
      tripType: searchFilters.tripType || 'one-way',
    }
  }, [filters.origin, filters.destination, searchFilters.origin, searchFilters.destination, searchFilters.depart_date, searchFilters.return_date, searchFilters.passengers?.adults, searchFilters.cabin, searchFilters.tripType])

  const handleFilterChange = useCallback((newFilters) => {
    updateFilters(newFilters)
  }, [updateFilters])

  const handleSearch = useCallback((searchParams) => {
    console.log('🔍 [ResultsPage] New search initiated:', searchParams)
    
    // Update URL state to reflect new search (this will trigger the useEffect to fetch from API)
    navigate('/results', {
      state: {
        filters: {
          origin: searchParams.origin,
          destination: searchParams.destination,
          depart_date: searchParams.depart_date,
          return_date: searchParams.return_date,
          passengers: searchParams.passengers,
          cabin: searchParams.cabin,
          tripType: searchParams.tripType,
        }
      },
      replace: false // Don't replace, allow navigation
    })
  }, [navigate])

  const handleReset = useCallback(() => {
    // Reset filters but keep origin/destination from search to show results
    updateFilters({
      priceMin: availableFacets.priceMin,
      priceMax: availableFacets.priceMax,
      stops: [],
      airlines: [],
      maxDuration: availableFacets.durationMax,
      departureTimeMin: 0,
      departureTimeMax: 1435,
      baggages: ['no-bag', 'free-bag'],
      refundability: ['non-refundable', 'unknown', 'refundable'],
      fareTypes: ['lowcost', 'regular'],
      classOfService: ['economy', 'premium-economy'],
      refundableOnly: false,
      sort: 'best',
    })
  }, [updateFilters, availableFacets])

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <CompactSearchForm
        onSearch={handleSearch}
        initialValues={initialSearchValues}
        onReset={handleReset}
      />

      {/* Loading and Error States */}
      {loadingYpsilonFlights && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <p className="text-blue-800 font-medium">Searching flights from Ypsilon.Net API...</p>
          </div>
        </div>
      )}
      
      {ypsilonError && !loadingYpsilonFlights && (
        <div className={`border rounded-lg p-4 mb-6 ${
          ypsilonError.includes('Backend Server Not Running') 
            ? 'bg-red-50 border-red-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`text-xl ${ypsilonError.includes('Backend Server Not Running') ? 'text-red-600' : 'text-yellow-600'}`}>
              {ypsilonError.includes('Backend Server Not Running') ? '⚠️' : 'ℹ️'}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold mb-2 ${
                ypsilonError.includes('Backend Server Not Running') ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {ypsilonError.includes('Backend Server Not Running') 
                  ? 'Backend Server Required' 
                  : 'API Connection Issue'}
              </p>
              <p className={`text-sm whitespace-pre-line ${
                ypsilonError.includes('Backend Server Not Running') ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {ypsilonError}
              </p>
              {ypsilonError.includes('Backend Server Not Running') && (
                <div className="mt-3 p-3 bg-white rounded border border-red-200">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Quick Fix:</p>
                  <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
                    <li>Open a new terminal/command prompt</li>
                    <li>Navigate to project folder: <code className="bg-gray-100 px-1 rounded">cd "C:\Live Project\Skynav-Flightly"</code></li>
                    <li>Run: <code className="bg-gray-100 px-1 rounded">npm run server</code></li>
                    <li>Wait for: <code className="bg-gray-100 px-1 rounded">Server running on http://localhost:3001</code></li>
                    <li>Refresh this page and search again</li>
                  </ol>
                </div>
              )}
              <p className={`text-xs mt-2 ${
                ypsilonError.includes('Backend Server Not Running') ? 'text-red-600' : 'text-yellow-600'
              }`}>
                Please ensure backend server is running and try again.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <FiltersSidebar
            availableFacets={availableFacets}
            onChange={handleFilterChange}
            currentFilters={filters}
          />
        </aside>
        <main className="lg:w-3/4">
          <CheapestDealsTable
            flights={allFlights}
            origin={filters.origin || searchFilters.origin}
            destination={filters.destination || searchFilters.destination}
          />
          <ResultsList
            results={resultsPage}
            total={total}
            page={page}
            totalPages={totalPages}
            perPage={5}
            onPageChange={setPage}
          />
        </main> 
      </div>
      </div>
    </div>
  )
}

export default ResultsPage

