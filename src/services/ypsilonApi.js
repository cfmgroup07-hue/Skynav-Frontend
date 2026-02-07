/**
 * Ypsilon.Net XML API Service
 * Handles fetching flight data from Ypsilon.Net XML API
 * 
 * API Credentials:
 * - XML User: crtfleetxml
 * - Access Mode: agency (for B2C)
 * - Access ID: crtfleet crtfleetxml (conso ID + agency ID)
 * - API Version: 3.92
 */

// XML API Configuration
const XML_USER = import.meta.env.VITE_YPSILON_XML_USER || 'crtfleetxml'
const XML_PASSWORD = import.meta.env.VITE_YPSILON_XML_PASSWORD || '5b3a4361dfc22f760d56a63e31f9aa9c'
const ACCESS_MODE = 'agency' // B2C mode
const CONSO_ID = 'crtfleet'
const AGENCY_ID = 'crtfleetxml'
const ACCESS_ID = `${CONSO_ID} ${AGENCY_ID}`
const API_VERSION = '3.92'

// API Endpoints
const STANDARD_API_URL = 'http://stagingxml.infosys.de:10816'
const BOOKING_API_URL = 'https://norristest.ypsilon.net:11024' // or 11025

// Use backend proxy if available (bypasses CORS)
const USE_PROXY = true // Set to false to try direct API access
const PROXY_URL = 'http://localhost:3001/api/ypsilon/flights'

// Log configuration on load
console.log('⚙️ [Ypsilon API] Configuration:', {
  XML_USER: XML_USER ? '✓ Set' : '✗ Missing',
  XML_PASSWORD: XML_PASSWORD ? '✓ Set' : '✗ Missing',
  ACCESS_MODE,
  ACCESS_ID,
  API_VERSION,
  STANDARD_API_URL,
})

/**
 * Fetch flights data from Ypsilon.Net XML API
 * This function uses the XML API with proper authentication
 */
export async function fetchFlightsFromYpsilon(searchParams = {}) {
  console.log('🔍 [Ypsilon API] fetchFlightsFromYpsilon called with:', searchParams)
  return fetchAllFlights(searchParams)
}

/**
 * Create XML request for flight search
 */
function createFlightSearchXML(searchParams = {}) {
  const {
    origin = '',
    destination = '',
    depart_date = '',
    return_date = '',
    adults = 1,
    children = 0,
    infants = 0,
    cabin = 'Economy',
  } = searchParams

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Request>
  <Header>
    <accessmode>${ACCESS_MODE}</accessmode>
    <accessid>${ACCESS_ID}</accessid>
    <apiversion>${API_VERSION}</apiversion>
    <username>${XML_USER}</username>
    <password>${XML_PASSWORD}</password>
  </Header>
  <Body>
    <FlightSearchRequest>
      <Origin>${origin}</Origin>
      <Destination>${destination}</Destination>
      <DepartureDate>${depart_date}</DepartureDate>
      ${return_date ? `<ReturnDate>${return_date}</ReturnDate>` : ''}
      <Adults>${adults}</Adults>
      <Children>${children}</Children>
      <Infants>${infants}</Infants>
      <CabinClass>${cabin}</CabinClass>
    </FlightSearchRequest>
  </Body>
</Request>`

  return xml
}

/**
 * Parse XML response to JSON
 */
function parseXMLResponse(xmlText) {
  console.log('🔧 [Ypsilon API] Parsing XML response...')
  console.log('📄 [Ypsilon API] XML Text Length:', xmlText.length)
  
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    console.log('📋 [Ypsilon API] XML Document Root:', xmlDoc.documentElement?.tagName)
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror')
    if (parserError) {
      const errorText = parserError.textContent
      console.error('❌ [Ypsilon API] XML Parsing Error:', errorText)
      throw new Error('XML parsing error: ' + errorText)
    }

    // Extract flights from XML - try different possible node names
    const flights = []
    const possibleSelectors = [
      'Flight',
      'flight', 
      'FlightOffer',
      'Offer',
      'FlightResult',
      'Result',
      'Item',
      'FlightItem'
    ]
    
    let flightNodes = []
    for (const selector of possibleSelectors) {
      flightNodes = xmlDoc.querySelectorAll(selector)
      if (flightNodes.length > 0) {
        console.log(`✅ [Ypsilon API] Found ${flightNodes.length} flights using selector: ${selector}`)
        break
      }
    }
    
    if (flightNodes.length === 0) {
      console.warn('⚠️ [Ypsilon API] No flight nodes found. XML structure:', xmlDoc.documentElement?.outerHTML?.substring(0, 500))
    }
    
    flightNodes.forEach((node, index) => {
      const flight = {
        id: node.getAttribute('id') || node.querySelector('Id, id')?.textContent || `FL-${index + 1}`,
        price: parseFloat(node.querySelector('Price, price, Amount, amount')?.textContent || '0'),
        currency: node.querySelector('Currency, currency')?.textContent || 'INR',
        airlines: [],
        segments: [],
        stops: 0,
        duration_total_min: 0,
        refundable: node.querySelector('Refundable, refundable')?.textContent === 'true',
        seats_left: parseInt(node.querySelector('SeatsLeft, seatsLeft, AvailableSeats')?.textContent || '0'),
      }

      // Extract airline
      const airlineNode = node.querySelector('Airline, airline, Carrier, carrier')
      if (airlineNode) {
        flight.airlines = [airlineNode.textContent]
      }

      // Extract segments
      const segmentNodes = node.querySelectorAll('Segment, segment, Leg, leg')
      segmentNodes.forEach(seg => {
        flight.segments.push({
          from: seg.querySelector('Origin, origin, From, from')?.textContent || '',
          to: seg.querySelector('Destination, destination, To, to')?.textContent || '',
          dep_time: seg.querySelector('DepartureTime, departureTime, DepTime')?.textContent || '',
          arr_time: seg.querySelector('ArrivalTime, arrivalTime, ArrTime')?.textContent || '',
          duration_min: parseInt(seg.querySelector('Duration, duration')?.textContent || '0'),
          airline: seg.querySelector('Airline, airline, Carrier')?.textContent || '',
        })
      })

      flight.stops = Math.max(0, flight.segments.length - 1)
      flight.duration_total_min = flight.segments.reduce((sum, seg) => sum + seg.duration_min, 0)

      flights.push(flight)
    })

    console.log(`✅ [Ypsilon API] Successfully parsed ${flights.length} flights`)
    return flights
  } catch (error) {
    console.error('❌ [Ypsilon API] Error parsing XML response:', error)
    console.error('❌ [Ypsilon API] Error Details:', {
      message: error.message,
      stack: error.stack,
    })
    return []
  }
}

/**
 * Fetch flights for multiple popular routes to get comprehensive flight data
 */
export async function fetchFlightsForMultipleRoutes() {
  console.log('🌍 [Ypsilon API] Fetching flights for multiple popular routes...')
  
  // Popular routes to search
  const popularRoutes = [
    { origin: 'LHR', destination: 'JED', name: 'London to Jeddah' },
    { origin: 'LHR', destination: 'DXB', name: 'London to Dubai' },
    { origin: 'LHR', destination: 'IST', name: 'London to Istanbul' },
    { origin: 'JFK', destination: 'LHR', name: 'New York to London' },
    { origin: 'DXB', destination: 'BOM', name: 'Dubai to Mumbai' },
    { origin: 'DEL', destination: 'DXB', name: 'Delhi to Dubai' },
    { origin: 'BOM', destination: 'DXB', name: 'Mumbai to Dubai' },
    { origin: 'LHR', destination: 'CDG', name: 'London to Paris' },
  ]

  const allFlights = []
  const errors = []

  // Get tomorrow's date for search
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const departDate = tomorrow.toISOString().split('T')[0]

  for (let i = 0; i < popularRoutes.length; i++) {
    const route = popularRoutes[i]
    try {
      console.log(`🔍 [Ypsilon API] Searching route ${i + 1}/${popularRoutes.length}: ${route.name} (${route.origin} → ${route.destination})`)
      
      const result = await fetchFlightsForRoute({
        origin: route.origin,
        destination: route.destination,
        depart_date: departDate,
        adults: 1,
        children: 0,
        infants: 0,
        cabin: 'Economy',
      })

      if (result.success && result.flights.length > 0) {
        console.log(`✅ [Ypsilon API] Found ${result.flights.length} flights for ${route.name}`)
        allFlights.push(...result.flights)
      } else {
        console.warn(`⚠️ [Ypsilon API] No flights found for ${route.name}`)
        errors.push(`${route.name}: ${result.error || 'No flights'}`)
      }
      
      // Add small delay between requests to avoid overwhelming the API
      if (i < popularRoutes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.error(`❌ [Ypsilon API] Error fetching ${route.name}:`, error)
      errors.push(`${route.name}: ${error.message}`)
    }
  }

  console.log(`📊 [Ypsilon API] Total flights collected: ${allFlights.length}`)
  console.log(`⚠️ [Ypsilon API] Routes with errors: ${errors.length}`)

  return {
    success: allFlights.length > 0,
    flights: allFlights,
    errors: errors,
    routesSearched: popularRoutes.length,
    routesWithFlights: allFlights.length > 0 ? popularRoutes.length - errors.length : 0,
  }
}

/**
 * Fetch flights for a specific route from Ypsilon.Net XML API
 * Internal function - use fetchAllFlights() or fetchFlightsForMultipleRoutes()
 */
async function fetchFlightsForRoute(searchParams) {
  console.log('🚀 [Ypsilon API] Starting flight fetch for route...', {
    timestamp: new Date().toISOString(),
    searchParams,
  })

  try {
    // Create XML request
    const xmlRequest = createFlightSearchXML(searchParams)
    console.log('📤 [Ypsilon API] XML Request:', xmlRequest)

    // Prepare headers
    const headers = {
      'Content-Type': 'application/xml',
      'Accept': 'application/xml',
      'Accept-Encoding': 'gzip',
      'accessmode': ACCESS_MODE,
      'accessid': ACCESS_ID,
      'apiversion': API_VERSION,
    }

    console.log('📋 [Ypsilon API] Request Headers:', headers)
    
    // Try backend proxy first (bypasses CORS), then direct API
    const apiUrl = USE_PROXY ? PROXY_URL : STANDARD_API_URL
    const requestHeaders = USE_PROXY 
      ? {
          'Content-Type': 'application/json',
          'Accept': 'application/xml',
        }
      : headers

    console.log('🌐 [Ypsilon API] Request URL:', apiUrl)
    console.log('🔧 [Ypsilon API] Using Proxy:', USE_PROXY)

    // Make XML API request
    let response
    try {
      if (USE_PROXY) {
        // Send JSON to proxy, proxy will convert to XML
        const proxyBody = {
          origin: searchParams.origin,
          destination: searchParams.destination,
          depart_date: searchParams.depart_date,
          return_date: searchParams.return_date,
          adults: searchParams.adults || 1,
          children: searchParams.children || 0,
          infants: searchParams.infants || 0,
          cabin: searchParams.cabin || 'Economy',
        }
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(proxyBody),
        })
      } else {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: requestHeaders,
          body: xmlRequest,
          mode: 'cors',
        })
      }
    } catch (fetchError) {
      // Handle CORS or network errors
      console.error('❌ [Ypsilon API] Fetch Error:', fetchError)
      console.error('❌ [Ypsilon API] Error Type:', fetchError.name)
      console.error('❌ [Ypsilon API] Error Message:', fetchError.message)
      
      // Check if it's a connection refused error (server not running)
      if (fetchError.message.includes('Failed to fetch') || fetchError.name === 'TypeError') {
        if (USE_PROXY && apiUrl.includes('localhost:3001')) {
          const errorMsg = `Backend Server Not Running: The proxy server at http://localhost:3001 is not running.

Please start the backend server:
1. Open a new terminal
2. Run: npm run server
3. Wait for "Server running on http://localhost:3001"
4. Then try searching again

If server is running, check:
- Port 3001 is not blocked by firewall
- No other application is using port 3001`
          console.error('❌ [Ypsilon API]', errorMsg)
          throw new Error(errorMsg)
        }
        
        const errorMsg = `CORS/Network Error: Ypsilon.Net XML API (${STANDARD_API_URL}) cannot be accessed directly from browser. 
        
Possible Solutions:
1. Use a backend proxy server to make API calls (npm run server)
2. Contact Ypsilon.Net to enable CORS for your domain
3. Use the iframe integration (https://flr.ypsilon.net/?agent=crtfleetb2c) instead

Error Details: ${fetchError.message}`
        console.error('❌ [Ypsilon API]', errorMsg)
        throw new Error(errorMsg)
      }
      throw fetchError
    }

    console.log('📥 [Ypsilon API] Response Status:', response.status, response.statusText)
    console.log('📥 [Ypsilon API] Response Headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [Ypsilon API] Response Error:', errorText)
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText.substring(0, 200)}`)
    }

    const xmlText = await response.text()
    console.log('📄 [Ypsilon API] XML Response:', xmlText)

    // Parse XML to extract flights
    const flights = parseXMLResponse(xmlText)
    console.log('✅ [Ypsilon API] Parsed Flights:', flights)
    console.log('📊 [Ypsilon API] Total Flights Found:', flights.length)

    return {
      success: true,
      flights: flights,
      metadata: {
        origin: searchParams.origin || '',
        destination: searchParams.destination || '',
        depart_date: searchParams.depart_date || '',
        return_date: searchParams.return_date || '',
      },
    }
  } catch (error) {
    console.error('❌ [Ypsilon API] Error fetching flights:', error)
    console.error('❌ [Ypsilon API] Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return {
      success: false,
      flights: [],
      metadata: {},
      error: error.message || 'Failed to fetch flights from Ypsilon.Net API',
    }
  }
}

/**
 * Fetch all available flights from Ypsilon.Net XML API
 * If no search params provided, fetches flights for multiple popular routes
 */
export async function fetchAllFlights(searchParams = {}) {
  // If no search parameters, fetch from multiple routes
  if (!searchParams.origin || !searchParams.destination) {
    console.log('📋 [Ypsilon API] No specific route provided, fetching from multiple popular routes...')
    return fetchFlightsForMultipleRoutes()
  }
  
  // If specific route provided, fetch for that route
  return fetchFlightsForRoute(searchParams)
}

/**
 * Search flights with specific criteria
 */
export async function searchFlights(searchParams) {
  console.log('🔍 [Ypsilon API] searchFlights called with:', searchParams)
  
  const {
    origin,
    destination,
    depart_date,
    return_date,
    passengers = { adults: 1, children: 0, infants: 0 },
    cabin = 'Economy',
  } = searchParams

  return fetchAllFlights({
    origin,
    destination,
    depart_date,
    return_date,
    adults: passengers.adults,
    children: passengers.children,
    infants: passengers.infants,
    cabin,
  })
}

/**
 * Get IBE iframe URL with search parameters
 */
export function getIBEIframeUrl(searchParams = {}) {
  const API_BASE_URL = import.meta.env.VITE_YPSILON_IBE_URL || 'https://flr.ypsilon.net'
  const AGENT_ID = import.meta.env.VITE_YPSILON_AGENT_ID || 'crtfleetb2c'
  const params = new URLSearchParams({
    agent: AGENT_ID,
    ...searchParams,
  })
  return `${API_BASE_URL}?${params.toString()}`
}

export default {
  fetchFlightsFromYpsilon,
  fetchAllFlights,
  searchFlights,
  getIBEIframeUrl,
}

