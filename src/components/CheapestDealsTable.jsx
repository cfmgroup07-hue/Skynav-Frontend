import { useState, useMemo, useEffect } from 'react'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'

// Airline logo component with actual images
const AirlineLogo = ({ airlineName }) => {
  const [imgError, setImgError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Airline logo URLs - using reliable image sources
  // In production, replace with your API: `https://api.example.com/airline-logo/${airlineName}`
  const getLogoUrl = (name) => {
    const logoMap = {
      'IndiGo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/IndiGo_logo.svg/200px-IndiGo_logo.svg.png',
      'Virgin Atlantic': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Virgin_Atlantic_logo.svg/200px-Virgin_Atlantic_logo.svg.png',
      'Air India': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Air_India_Logo.svg/200px-Air_India_Logo.svg.png',
      'Air France': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Air_France_Logo.svg/200px-Air_France_Logo.svg.png',
      'KLM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/KLM_logo.svg/200px-KLM_logo.svg.png',
      'Emirates': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
      'British Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png',
      'Lufthansa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Lufthansa_Logo.svg/200px-Lufthansa_Logo.svg.png',
      'Aer Lingus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Aer_Lingus_logo.svg/200px-Aer_Lingus_logo.svg.png',
      'Aeroflot': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Aeroflot_logo.svg/200px-Aeroflot_logo.svg.png',
      'Air Canada': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Air_Canada_logo.svg/200px-Air_Canada_logo.svg.png',
      'Qatar Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png',
      'Singapore Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Singapore_Airlines_Logo.svg/200px-Singapore_Airlines_Logo.svg.png',
      'Turkish Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Turkish_Airlines_logo.svg/200px-Turkish_Airlines_logo.svg.png',
      'United Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/United_Airlines_logo_2010.svg/200px-United_Airlines_logo_2010.svg.png',
      'American Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/American_Airlines_logo_2013.svg/200px-American_Airlines_logo_2013.svg.png',
      'Delta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Delta_logo.svg/200px-Delta_logo.svg.png',
      'JetBlue': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/JetBlue_Airways_logo.svg/200px-JetBlue_Airways_logo.svg.png',
      'Southwest': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Southwest_Airlines_logo.svg/200px-Southwest_Airlines_logo.svg.png',
      'GoAir': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/GoAir_logo.svg/200px-GoAir_logo.svg.png',
      'SpiceJet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SpiceJet_logo.svg/200px-SpiceJet_logo.svg.png',
      'Vistara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Vistara_logo.svg/200px-Vistara_logo.svg.png',
      'AirAsia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_logo.svg/200px-AirAsia_logo.svg.png',
      'Cathay Pacific': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cathay_Pacific_logo.svg/200px-Cathay_Pacific_logo.svg.png',
      'Japan Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Japan_Airlines_logo.svg/200px-Japan_Airlines_logo.svg.png',
      'All Nippon Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/All_Nippon_Airways_logo.svg/200px-All_Nippon_Airways_logo.svg.png',
      'Thai Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Thai_Airways_logo.svg/200px-Thai_Airways_logo.svg.png',
      'Malaysia Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Malaysia_Airlines_logo.svg/200px-Malaysia_Airlines_logo.svg.png',
      'Etihad Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Etihad_Airways_logo.svg/200px-Etihad_Airways_logo.svg.png',
      'Royal Jordanian': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Royal_Jordanian_logo.svg/200px-Royal_Jordanian_logo.svg.png',
      'Oman Air': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Oman_Air_logo.svg/200px-Oman_Air_logo.svg.png',
      'Saudia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Saudia_logo.svg/200px-Saudia_logo.svg.png',
      'EgyptAir': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/EgyptAir_logo.svg/200px-EgyptAir_logo.svg.png',
      'Ethiopian Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ethiopian_Airlines_logo.svg/200px-Ethiopian_Airlines_logo.svg.png',
      'Kenya Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kenya_Airways_logo.svg/200px-Kenya_Airways_logo.svg.png',
      'South African Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/South_African_Airways_logo.svg/200px-South_African_Airways_logo.svg.png',
      'Iberia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Iberia_logo.svg/200px-Iberia_logo.svg.png',
      'Alitalia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Alitalia_logo.svg/200px-Alitalia_logo.svg.png',
      'TAP Air Portugal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/TAP_Air_Portugal_logo.svg/200px-TAP_Air_Portugal_logo.svg.png',
      'Swiss International': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Swiss_International_Air_Lines_logo.svg/200px-Swiss_International_Air_Lines_logo.svg.png',
      'Austrian Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Austrian_Airlines_logo.svg/200px-Austrian_Airlines_logo.svg.png',
      'Scandinavian Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scandinavian_Airlines_logo.svg/200px-Scandinavian_Airlines_logo.svg.png',
      'Brussels Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Brussels_Airlines_logo.svg/200px-Brussels_Airlines_logo.svg.png',
      'Czech Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Czech_Airlines_logo.svg/200px-Czech_Airlines_logo.svg.png',
      'LOT Polish Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/LOT_Polish_Airlines_logo.svg/200px-LOT_Polish_Airlines_logo.svg.png',
      'TAROM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/TAROM_logo.svg/200px-TAROM_logo.svg.png',
      'flydubai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flydubai_logo.svg/200px-Flydubai_logo.svg.png',
    }
    return logoMap[name] || null
  }

  const logoUrl = getLogoUrl(airlineName)

  const handleError = () => {
    setImgError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Fallback to text badge if image fails or not available
  if (imgError || !logoUrl) {
    const shortName = airlineName.length > 10 ? airlineName.substring(0, 10) + '...' : airlineName
    return (
      <div className="px-3 py-1.5 bg-neutral-700 text-white rounded text-xs font-bold text-center min-w-[80px] max-w-[120px]">
        {shortName}
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center min-w-[80px] max-w-[120px] h-10">
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 rounded animate-pulse"></div>
      )}
      <img
        src={logoUrl}
        alt={airlineName}
        className="h-8 w-auto max-w-[100px] object-contain"
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  )
}

function CheapestDealsTable({ flights = [], origin = '', destination = '' }) {
  const { formatCurrency, currencyDisplay } = useRegionalSettings()
  const [airlineStartIndex, setAirlineStartIndex] = useState(0)
  const airlinesPerPage = 5

  // Filter flights by origin/destination if provided
  const filteredFlights = useMemo(() => {
    if (!origin && !destination) return flights
    return flights.filter(flight => {
      const firstSegment = flight.segments?.[0]
      const lastSegment = flight.segments?.[flight.segments.length - 1]
      const flightOrigin = flight.metadata?.origin || firstSegment?.from
      const flightDest = flight.metadata?.destination || lastSegment?.to
      
      if (origin && flightOrigin !== origin) return false
      if (destination && flightDest !== destination) return false
      return true
    })
  }, [flights, origin, destination])

  // Get unique airlines from flights
  const allAirlines = useMemo(() => {
    const airlineSet = new Set()
    filteredFlights.forEach(flight => {
      flight.airlines?.forEach(airline => airlineSet.add(airline))
    })
    return Array.from(airlineSet).sort()
  }, [filteredFlights])

  // Calculate cheapest prices by airline and stops
  const dealsByAirlineAndStops = useMemo(() => {
    const deals = {}
    
    allAirlines.forEach(airline => {
      deals[airline] = {
        direct: null,
        max1Stop: null,
        all: null
      }
      
      // Find cheapest for each stop category
      const airlineFlights = filteredFlights.filter(f => 
        f.airlines?.includes(airline)
      )
      
      if (airlineFlights.length === 0) return
      
      // Direct/Nonstop
      const directFlights = airlineFlights.filter(f => f.stops === 0)
      if (directFlights.length > 0) {
        deals[airline].direct = Math.min(...directFlights.map(f => f.price))
      }
      
      // Max 1 stop
      const max1StopFlights = airlineFlights.filter(f => f.stops <= 1)
      if (max1StopFlights.length > 0) {
        deals[airline].max1Stop = Math.min(...max1StopFlights.map(f => f.price))
      }
      
      // All options
      deals[airline].all = Math.min(...airlineFlights.map(f => f.price))
    })
    
    return deals
  }, [filteredFlights, allAirlines])

  const visibleAirlines = allAirlines.slice(airlineStartIndex, airlineStartIndex + airlinesPerPage)
  const canScrollLeft = airlineStartIndex > 0
  const canScrollRight = airlineStartIndex + airlinesPerPage < allAirlines.length

  const handleScrollLeft = () => {
    setAirlineStartIndex(Math.max(0, airlineStartIndex - airlinesPerPage))
  }

  const handleScrollRight = () => {
    setAirlineStartIndex(Math.min(
      allAirlines.length - airlinesPerPage,
      airlineStartIndex + airlinesPerPage
    ))
  }

  // Quick search routes
  const quickSearches = [
    { route: `${origin || 'AMR'}-${destination || 'PUN'}`, dates: '06.12-13.12' },
    { route: `${origin || 'AMR'}-PUQ`, dates: '06.12' },
    { route: `PNQ-${destination || 'MCO'}`, dates: '06.12' },
  ]

  if (allAirlines.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 mb-6">
      {/* Quick Search Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {quickSearches.map((search, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
          >
            {search.route} {search.dates}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-neutral-900">
          Cheapest deals by the number of stops and airlines
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-900">
                <span>Stops</span>
              </th>
              {visibleAirlines.map(airline => (
                <th key={airline} className="text-center py-3 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <AirlineLogo airlineName={airline} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-4 px-4 font-semibold text-neutral-900">Direct/Nonstop</td>
              {visibleAirlines.map(airline => (
                <td key={airline} className="py-4 px-4 text-center text-neutral-600">
                  {dealsByAirlineAndStops[airline]?.direct 
                    ? formatCurrency(dealsByAirlineAndStops[airline].direct)
                    : '-'
                  }
                </td>
              ))}
            </tr>
            <tr className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-4 px-4 font-semibold text-neutral-900">max 1 stop</td>
              {visibleAirlines.map(airline => (
                <td key={airline} className="py-4 px-4 text-center text-neutral-600">
                  {dealsByAirlineAndStops[airline]?.max1Stop 
                    ? formatCurrency(dealsByAirlineAndStops[airline].max1Stop)
                    : '-'
                  }
                </td>
              ))}
            </tr>
            <tr className="hover:bg-neutral-50">
              <td className="py-4 px-4 font-semibold text-neutral-900">all options</td>
              {visibleAirlines.map(airline => (
                <td key={airline} className="py-4 px-4 text-center font-semibold text-neutral-900">
                  {dealsByAirlineAndStops[airline]?.all 
                    ? formatCurrency(dealsByAirlineAndStops[airline].all)
                    : '-'
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheapestDealsTable

