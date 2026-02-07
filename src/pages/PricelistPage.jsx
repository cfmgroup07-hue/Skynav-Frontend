import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResultsList from '../components/ResultsList'
import FiltersSidebar from '../components/FiltersSidebar'
import CompactSearchForm from '../components/CompactSearchForm'
import CheapestDealsTable from '../components/CheapestDealsTable'
import { useFlightSearch } from '../hooks/useFlightSearch'
import flightsData from '../data/flights.json'

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
  
  const [allFlights] = useState(() =>
    flightsData.flights.map((flight) => ({
      ...flight,
      metadata: deriveFlightMetadata(flight, flightsData.metadata),
    }))
  )

  const availableFacets = useMemo(() => {
    const prices = allFlights.map(f => f.price)
    const durations = allFlights.map(f => f.duration_total_min)
    const airlinesSet = new Set()
    allFlights.forEach(f => f.airlines.forEach(a => airlinesSet.add(a)))

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
    setPage,
    setFilters: updateFilters,
  } = useFlightSearch(allFlights, filters, filters.sort, 10)

  useEffect(() => {
    if (searchFilters.origin || searchFilters.destination) {
      updateFilters({
        origin: searchFilters.origin,
        destination: searchFilters.destination,
      })
    }
  }, [searchFilters.origin, searchFilters.destination, updateFilters])

  // Get initial search values for the form
  const getInitialSearchValues = () => {
    return {
      origin: filters.origin || searchFilters.origin || '',
      destination: filters.destination || searchFilters.destination || '',
      depart_date: searchFilters.depart_date || '',
      return_date: searchFilters.return_date || '',
      passengers: searchFilters.passengers?.adults || 2,
      cabin: searchFilters.cabin || 'Economy',
      tripType: searchFilters.tripType || 'one-way',
    }
  }

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
  }

  const handleSearch = (searchParams) => {
    // Update filters with new search parameters
    updateFilters({
      origin: searchParams.origin,
      destination: searchParams.destination,
      depart_date: searchParams.depart_date,
      return_date: searchParams.return_date,
    })
    
    // Update URL state to reflect new search
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
      replace: true
    })
  }

  const handleReset = () => {
    updateFilters({
      origin: '',
      destination: '',
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <CompactSearchForm
        onSearch={handleSearch}
        initialValues={getInitialSearchValues()}
        onReset={handleReset}
      />

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
            perPage={10}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  )
}

export default ResultsPage

