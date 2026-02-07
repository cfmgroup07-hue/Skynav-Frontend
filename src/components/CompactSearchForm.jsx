import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'

const AIRPORTS = [
  { code: 'DEL', name: 'Delhi', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bangalore', city: 'Bangalore', country: 'India' },
  { code: 'CCU', name: 'Kolkata', city: 'Kolkata', country: 'India' },
  { code: 'MAA', name: 'Chennai', city: 'Chennai', country: 'India' },
  { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad', country: 'India' },
  { code: 'PNQ', name: 'Pune', city: 'Pune/Poona', country: 'India' },
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'JFK', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'USA' },
  { code: 'DXB', name: 'Dubai', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey' },
  { code: 'BCN', name: 'Barcelona', city: 'Barcelona', country: 'Spain' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'MAD', name: 'Madrid', city: 'Madrid', country: 'Spain' },
  { code: 'TLV', name: 'Tel Aviv', city: 'Tel Aviv', country: 'Israel' },
  { code: 'CAI', name: 'Cairo', city: 'Cairo', country: 'Egypt' },
  { code: 'FCO', name: 'Rome', city: 'Rome', country: 'Italy' },
  { code: 'JED', name: 'Jeddah', city: 'Jeddah', country: 'Saudi Arabia' },
  { code: 'RUH', name: 'Riyadh', city: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'MXP', name: 'Milan', city: 'Milan', country: 'Italy' },
  { code: 'BUD', name: 'Budapest', city: 'Budapest', country: 'Hungary' },
  { code: 'LIS', name: 'Lisbon', city: 'Lisbon', country: 'Portugal' },
  { code: 'ATH', name: 'Athens', city: 'Athens', country: 'Greece' },
  { code: 'VIE', name: 'Vienna', city: 'Vienna', country: 'Austria' },
  { code: 'AUH', name: 'Abu Dhabi', city: 'Abu Dhabi', country: 'UAE' },
  { code: 'GOI', name: 'Goa', city: 'Goa', country: 'India' },
]

function CompactSearchForm({ onSearch, initialValues = {}, onReset }) {
  const getAirportDisplay = (code) => {
    if (!code) return ''
    const airport = AIRPORTS.find(a => a.code === code)
    return airport ? `${airport.city} (${airport.code})` : code
  }

  const [tripType, setTripType] = useState(initialValues.tripType || 'one-way')
  const [fromCode, setFromCode] = useState(initialValues.origin || '')
  const [from, setFrom] = useState(getAirportDisplay(initialValues.origin))
  const [toCode, setToCode] = useState(initialValues.destination || '')
  const [to, setTo] = useState(getAirportDisplay(initialValues.destination))
  const [departDate, setDepartDate] = useState(initialValues.depart_date || '')
  const [returnDate, setReturnDate] = useState(initialValues.return_date || '')
  const [adults, setAdults] = useState(
    typeof initialValues.passengers === 'number' 
      ? initialValues.passengers 
      : initialValues.passengers?.adults || 1
  )
  const [children, setChildren] = useState(initialValues.passengers?.children || 0)
  const [infants, setInfants] = useState(initialValues.passengers?.infants || 0)
  const [cabin, setCabin] = useState(initialValues.cabin || 'Economy')
  const [baggage, setBaggage] = useState(initialValues.baggage || 'Carry-on baggage only')
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [departureTimeEarliest, setDepartureTimeEarliest] = useState('Earliest')
  const [departureTimeLatest, setDepartureTimeLatest] = useState('No later than')
  const [returnTimeEarliest, setReturnTimeEarliest] = useState('Earliest')
  const [returnTimeLatest, setReturnTimeLatest] = useState('No later than')
  const [departureDateFlexibility, setDepartureDateFlexibility] = useState('-')
  const [returnDateFlexibility, setReturnDateFlexibility] = useState('-')
  const [selectedAirlines, setSelectedAirlines] = useState([])
  const [showAirlineModal, setShowAirlineModal] = useState(false)
  const [AirlineSearchQuery, setAirlineSearchQuery] = useState('')
  const [tempSelectedAirlines, setTempSelectedAirlines] = useState([])
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false)
  const [refundableTicketsOnly, setRefundableTicketsOnly] = useState(false)
  const [railAndFly, setRailAndFly] = useState(false)

  // Update form when initialValues change - only on mount or when key values actually change
  const prevInitialValuesRef = useRef(initialValues)
  useEffect(() => {
    const prev = prevInitialValuesRef.current
    let hasChanged = false

    if (initialValues.origin && initialValues.origin !== prev?.origin) {
      setFromCode(initialValues.origin)
      setFrom(getAirportDisplay(initialValues.origin))
      hasChanged = true
    }
    if (initialValues.destination && initialValues.destination !== prev?.destination) {
      setToCode(initialValues.destination)
      setTo(getAirportDisplay(initialValues.destination))
      hasChanged = true
    }
    if (initialValues.depart_date && initialValues.depart_date !== prev?.depart_date) {
      setDepartDate(initialValues.depart_date)
      hasChanged = true
    }
    if (initialValues.return_date && initialValues.return_date !== prev?.return_date) {
      setReturnDate(initialValues.return_date)
      hasChanged = true
    }
    if (initialValues.tripType && initialValues.tripType !== prev?.tripType) {
      setTripType(initialValues.tripType)
      hasChanged = true
    }
    if (initialValues.passengers) {
      const prevPassengers = prev?.passengers
      if (typeof initialValues.passengers === 'number') {
        if (initialValues.passengers !== prevPassengers) {
          setAdults(initialValues.passengers)
          hasChanged = true
        }
      } else {
        if (initialValues.passengers.adults !== prevPassengers?.adults) {
          setAdults(initialValues.passengers.adults || 1)
          hasChanged = true
        }
        if (initialValues.passengers.children !== prevPassengers?.children) {
          setChildren(initialValues.passengers.children || 0)
          hasChanged = true
        }
        if (initialValues.passengers.infants !== prevPassengers?.infants) {
          setInfants(initialValues.passengers.infants || 0)
          hasChanged = true
        }
      }
    }
    if (initialValues.baggage && initialValues.baggage !== prev?.baggage) {
      setBaggage(initialValues.baggage)
      hasChanged = true
    }
    if (initialValues.cabin && initialValues.cabin !== prev?.cabin) {
      setCabin(initialValues.cabin)
      hasChanged = true
    }

    if (hasChanged) {
      prevInitialValuesRef.current = initialValues
    }
  }, [initialValues])
  
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [showPassengerModal, setShowPassengerModal] = useState(false)
  
  const fromRef = useRef(null)
  const toRef = useRef(null)
  const passengerModalRef = useRef(null)
  const AirlineModalRef = useRef(null)
  const [showDepartureTimeEarliest, setShowDepartureTimeEarliest] = useState(false)
  const [showDepartureTimeLatest, setShowDepartureTimeLatest] = useState(false)
  const [showReturnTimeEarliest, setShowReturnTimeEarliest] = useState(false)
  const [showReturnTimeLatest, setShowReturnTimeLatest] = useState(false)
  const [showDepartureDateFlex, setShowDepartureDateFlex] = useState(false)
  const [showReturnDateFlex, setShowReturnDateFlex] = useState(false)
  const departureTimeEarliestRef = useRef(null)
  const departureTimeLatestRef = useRef(null)
  const returnTimeEarliestRef = useRef(null)
  const returnTimeLatestRef = useRef(null)
  const departureDateFlexRef = useRef(null)
  const returnDateFlexRef = useRef(null)

  useEffect(() => {
    if (from.length > 0 && showFromSuggestions) {
      const filtered = AIRPORTS.filter(airport =>
        airport.code.toLowerCase().includes(from.toLowerCase()) ||
        airport.name.toLowerCase().includes(from.toLowerCase()) ||
        airport.city.toLowerCase().includes(from.toLowerCase())
      ).slice(0, 5)
      setFromSuggestions(filtered)
    } else {
      setFromSuggestions([])
    }
  }, [from, showFromSuggestions])

  useEffect(() => {
    if (to.length > 0 && showToSuggestions) {
      const filtered = AIRPORTS.filter(airport =>
        airport.code.toLowerCase().includes(to.toLowerCase()) ||
        airport.name.toLowerCase().includes(to.toLowerCase()) ||
        airport.city.toLowerCase().includes(to.toLowerCase())
      ).slice(0, 5)
      setToSuggestions(filtered)
    } else {
      setToSuggestions([])
    }
  }, [to, showToSuggestions])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passengerModalRef.current && !passengerModalRef.current.contains(event.target)) {
        setShowPassengerModal(false)
      }
    }
    if (showPassengerModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPassengerModal])

  const handleFromSelect = (airport) => {
    setFrom(`${airport.city} (${airport.code})`)
    setFromCode(airport.code)
    setShowFromSuggestions(false)
  }

  const handleToSelect = (airport) => {
    setTo(`${airport.city} (${airport.code})`)
    setToCode(airport.code)
    setShowToSuggestions(false)
  }

  const handleFromChange = (e) => {
    const value = e.target.value
    setFrom(value)
    // Clear code when user types manually
    if (value && !value.match(/\([A-Z]{3}\)$/)) {
      setFromCode('')
    }
    // Show suggestions when typing
    if (value.length > 0) {
      setShowFromSuggestions(true)
    } else {
      setShowFromSuggestions(false)
    }
  }

  const handleToChange = (e) => {
    const value = e.target.value
    setTo(value)
    // Clear code when user types manually
    if (value && !value.match(/\([A-Z]{3}\)$/)) {
      setToCode('')
    }
    // Show suggestions when typing
    if (value.length > 0) {
      setShowToSuggestions(true)
    } else {
      setShowToSuggestions(false)
    }
  }

  const handleSwap = () => {
    const tempFrom = from
    const tempFromCode = fromCode
    setFrom(to)
    setFromCode(toCode)
    setTo(tempFrom)
    setToCode(tempFromCode)
  }

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return ''
    try {
      const date = new Date(dateStr)
      return format(date, 'yyyy-MM-dd')
    } catch {
      return dateStr
    }
  }

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return ''
    try {
      const date = new Date(dateStr)
      return format(date, 'dd.MM.yyyy')
    } catch {
      return dateStr
    }
  }

  const handleDateChange = (field, value) => {
    if (field === 'depart') {
      setDepartDate(value)
    } else {
      setReturnDate(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Extract airport code from input if available, otherwise use the typed value
    const extractCode = (value, code) => {
      if (code) return code
      const match = value.match(/\(([A-Z]{3})\)/)
      if (match) return match[1]
      // Try to find airport by city name
      const airport = AIRPORTS.find(a => 
        a.city.toLowerCase() === value.toLowerCase() ||
        a.name.toLowerCase().includes(value.toLowerCase())
      )
      return airport ? airport.code : value
    }
    
    const originCode = extractCode(from, fromCode)
    const destCode = extractCode(to, toCode)
    
    if (!from.trim() || !to.trim()) {
      alert('Please enter origin and destination')
      return
    }
    if (originCode === destCode) {
      alert('Origin and destination cannot be the same')
      return
    }
    onSearch({
      origin: originCode,
      destination: destCode,
      depart_date: departDate,
      return_date: tripType === 'round-trip' ? returnDate : null,
      passengers: { adults, children, infants },
      cabin,
      baggage,
      tripType,
    })
  }

  const handleReset = () => {
    setFrom('')
    setFromCode('')
    setTo('')
    setToCode('')
    setDepartDate('')
    setReturnDate('')
    setAdults(1)
    setChildren(0)
    setInfants(0)
    setCabin('Economy')
    setBaggage('Carry-on baggage only')
    setTripType('one-way')
    // Reset advanced search fields
    setShowAdvancedSearch(false)
    setDepartureTimeEarliest('Earliest')
    setDepartureTimeLatest('No later than')
    setReturnTimeEarliest('Earliest')
    setReturnTimeLatest('No later than')
    setDepartureDateFlexibility('-')
    setReturnDateFlexibility('-')
    setSelectedAirlines([])
    setShowAirlineModal(false)
    setAirlineSearchQuery('')
    setTempSelectedAirlines([])
    setDirectFlightsOnly(false)
    setRefundableTicketsOnly(false)
    setRailAndFly(false)
    if (onReset) {
      onReset()
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 6)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const timeOptions = ['Earliest', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', 'No later than']
  const flexibilityOptions = ['-', '+/- 1 day', '+/- 2 days', '+/- 3 days']

  const AirlineS = [
    { name: 'ATT Touristik', code: 'ATT' },
    { name: 'Access Rail', code: '9B' },
    { name: 'Advanced Air', code: 'AN' },
    { name: 'Aegean Airlines', code: 'A3' },
    { name: 'Aer Lingus', code: 'EI' },
    { name: 'Aer Lingus Web', code: 'EIW' },
    { name: 'Aeroflot', code: 'SU' },
    { name: 'Air Canada', code: 'AC' },
    { name: 'Air France', code: 'AF' },
    { name: 'Air India', code: 'AI' },
    { name: 'Air India Express', code: 'IX' },
    { name: 'Air New Zealand', code: 'NZ' },
    { name: 'AirAsia', code: 'AK' },
    { name: 'Alitalia', code: 'AZ' },
    { name: 'All Nippon Airways', code: 'NH' },
    { name: 'American Airlines', code: 'AA' },
    { name: 'Asiana Airlines', code: 'OZ' },
    { name: 'Austrian Airlines', code: 'OS' },
    { name: 'British Airways', code: 'BA' },
    { name: 'Brussels Airlines', code: 'SN' },
    { name: 'Cathay Pacific', code: 'CX' },
    { name: 'Czech Airlines', code: 'OK' },
    { name: 'Delta', code: 'DL' },
    { name: 'EgyptAir', code: 'MS' },
    { name: 'Emirates', code: 'EK' },
    { name: 'Ethiopian Airlines', code: 'ET' },
    { name: 'Etihad Airways', code: 'EY' },
    { name: 'Finnair', code: 'AY' },
    { name: 'GoAir', code: 'G8' },
    { name: 'Iberia', code: 'IB' },
    { name: 'Icelandair', code: 'FI' },
    { name: 'IndiGo', code: '6E' },
    { name: 'Japan Airlines', code: 'JL' },
    { name: 'JetBlue', code: 'B6' },
    { name: 'Kenya Airways', code: 'KQ' },
    { name: 'KLM', code: 'KL' },
    { name: 'Korean Air', code: 'KE' },
    { name: 'LOT Polish Airlines', code: 'LO' },
    { name: 'Lufthansa', code: 'LH' },
    { name: 'Malaysia Airlines', code: 'MH' },
    { name: 'Oman Air', code: 'WY' },
    { name: 'Qantas', code: 'QF' },
    { name: 'Qatar Airways', code: 'QR' },
    { name: 'Royal Air Maroc', code: 'AT' },
    { name: 'Royal Jordanian', code: 'RJ' },
    { name: 'Saudia', code: 'SV' },
    { name: 'Scandinavian Airlines', code: 'SK' },
    { name: 'Singapore Airlines', code: 'SQ' },
    { name: 'South African Airways', code: 'SA' },
    { name: 'Southwest', code: 'WN' },
    { name: 'SpiceJet', code: 'SG' },
    { name: 'Swiss International', code: 'LX' },
    { name: 'TAP Air Portugal', code: 'TP' },
    { name: 'TAROM', code: 'RO' },
    { name: 'Thai Airways', code: 'TG' },
    { name: 'Turkish Airlines', code: 'TK' },
    { name: 'United Airlines', code: 'UA' },
    { name: 'Virgin Atlantic', code: 'VS' },
    { name: 'Vistara', code: 'UK' },
    { name: 'flydubai', code: 'FZ' },
  ]

  useEffect(() => {
    if (showAirlineModal) {
      setTempSelectedAirlines([...selectedAirlines])
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAirlineModal, selectedAirlines])

  // Click outside handlers for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departureTimeEarliestRef.current && !departureTimeEarliestRef.current.contains(event.target)) {
        setShowDepartureTimeEarliest(false)
      }
      if (departureTimeLatestRef.current && !departureTimeLatestRef.current.contains(event.target)) {
        setShowDepartureTimeLatest(false)
      }
      if (returnTimeEarliestRef.current && !returnTimeEarliestRef.current.contains(event.target)) {
        setShowReturnTimeEarliest(false)
      }
      if (returnTimeLatestRef.current && !returnTimeLatestRef.current.contains(event.target)) {
        setShowReturnTimeLatest(false)
      }
      if (departureDateFlexRef.current && !departureDateFlexRef.current.contains(event.target)) {
        setShowDepartureDateFlex(false)
      }
      if (returnDateFlexRef.current && !returnDateFlexRef.current.contains(event.target)) {
        setShowReturnDateFlex(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredAirlines = AirlineS.filter(Airline =>
    Airline.name.toLowerCase().includes(AirlineSearchQuery.toLowerCase()) ||
    Airline.code.toLowerCase().includes(AirlineSearchQuery.toLowerCase())
  )

  const handleAirlineToggle = (AirlineCode) => {
    if (tempSelectedAirlines.includes(AirlineCode)) {
      setTempSelectedAirlines(tempSelectedAirlines.filter(code => code !== AirlineCode))
    } else {
      setTempSelectedAirlines([...tempSelectedAirlines, AirlineCode])
    }
  }

  const handleSaveAirlines = () => {
    setSelectedAirlines([...tempSelectedAirlines])
    setShowAirlineModal(false)
    setAirlineSearchQuery('')
  }

  const getSelectedAirlinesDisplay = () => {
    if (selectedAirlines.length === 0) return 'Select Airline'
    if (selectedAirlines.length === 1) {
      const Airline = AirlineS.find(a => a.code === selectedAirlines[0])
      return Airline ? Airline.name : selectedAirlines[0]
    }
    return `${selectedAirlines.length} Airlines selected`
  }


  return (
    <div className="bg-white rounded-md-xl shadow-lg border border-neutral-100 p-6 mb-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Trip Type Selection */}
        <div className="flex gap-6 mb-5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === 'round-trip'}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4 text-gray-900  hover:ring-gray-300"
            />
            <span className={`text-sm font-semibold transition-colors ${tripType === 'round-trip' ? 'text-gray-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>Round-trip</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4 text-gray-900  hover:ring-gray-300"
            />
            <span className={`text-sm font-semibold transition-colors ${tripType === 'one-way' ? 'text-gray-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>One-way</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="tripType"
              value="open-jaw"
              checked={tripType === 'open-jaw'}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4 text-gray-900  hover:ring-gray-300"
            />
            <span className={`text-sm font-semibold transition-colors ${tripType === 'open-jaw' ? 'text-gray-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>Open jaw</span>
          </label>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Origin */}
          <div className="relative">
            <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">Departure</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                value={from}
                onChange={handleFromChange}
                onFocus={() => {
                  if (from.length > 0) {
                    setShowFromSuggestions(true)
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow click on suggestion
                  setTimeout(() => setShowFromSuggestions(false), 200)
                }}
                placeholder="Choose location"
                className="w-full pl-11 pr-4 py-3 border-2 border-neutral-200 rounded-md-xl text-sm font-medium text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <ul className="absolute z-20 w-full mt-2 bg-white border-2 border-neutral-200 rounded-md-xl shadow-xl max-h-60 overflow-auto">
                  {fromSuggestions.map((airport) => (
                    <li
                      key={airport.code}
                      onClick={() => handleFromSelect(airport)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors duration-150 border-b border-neutral-100 last:border-b-0"
                    >
                      <div className="font-bold text-neutral-900">{airport.city} ({airport.code})</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{airport.name}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">Going To</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                value={to}
                onChange={handleToChange}
                onFocus={() => {
                  if (to.length > 0) {
                    setShowToSuggestions(true)
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow click on suggestion
                  setTimeout(() => setShowToSuggestions(false), 200)
                }}
                placeholder="Choose location"
                className="w-full pl-11 pr-12 py-3 border-2 border-neutral-200 rounded-md-xl text-sm font-medium text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm"
              />
              <button
                type="button"
                onClick={handleSwap}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-50 rounded-md-lg z-10 transition-all duration-200 hover:scale-110"
                title="Swap origin and destination"
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              {showToSuggestions && toSuggestions.length > 0 && (
                <ul className="absolute z-20 w-full mt-2 bg-white border-2 border-neutral-200 rounded-md-xl shadow-xl max-h-60 overflow-auto">
                  {toSuggestions.map((airport) => (
                    <li
                      key={airport.code}
                      onClick={() => handleToSelect(airport)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors duration-150 border-b border-neutral-100 last:border-b-0"
                    >
                      <div className="font-bold text-neutral-900">{airport.city} ({airport.code})</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{airport.name}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">Departure</label>
            <div className="relative">
              <input
                type="date"
                value={formatDateForInput(departDate)}
                onChange={(e) => handleDateChange('depart', e.target.value)}
                min={today}
                max={maxDateStr}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md-xl text-sm font-medium text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const date = new Date(departDate || today)
                    date.setDate(date.getDate() - 1)
                    handleDateChange('depart', format(date, 'yyyy-MM-dd'))
                  }}
                  className="p-1.5 hover:bg-blue-50 rounded-md-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const date = new Date(departDate || today)
                    date.setDate(date.getDate() + 1)
                    handleDateChange('depart', format(date, 'yyyy-MM-dd'))
                  }}
                  className="p-1.5 hover:bg-blue-50 rounded-md-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">Return</label>
            <div className="relative">
              <input
                type="date"
                value={formatDateForInput(returnDate)}
                onChange={(e) => handleDateChange('return', e.target.value)}
                min={departDate || today}
                max={maxDateStr}
                disabled={tripType === 'one-way'}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md-xl text-sm font-medium text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
              />
              {tripType !== 'one-way' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const date = new Date(returnDate || departDate || today)
                      date.setDate(date.getDate() - 1)
                      handleDateChange('return', format(date, 'yyyy-MM-dd'))
                    }}
                    className="p-1.5 hover:bg-blue-50 rounded-md-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const date = new Date(returnDate || departDate || today)
                      date.setDate(date.getDate() + 1)
                      handleDateChange('return', format(date, 'yyyy-MM-dd'))
                    }}
                    className="p-1.5 hover:bg-blue-50 rounded-md-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Passengers & Class */}
          <div className="relative" ref={passengerModalRef}>
            <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">Passengers</label>
            <button
              type="button"
              onClick={() => setShowPassengerModal(!showPassengerModal)}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-md-xl text-sm font-medium text-neutral-700 bg-white text-left flex items-center gap-2 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 shadow-sm whitespace-nowrap overflow-hidden"
            >
              <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="truncate">{adults + children + infants} {adults + children + infants === 1 ? 'person' : 'persons'}, {cabin} class</span>
            </button>
            {showPassengerModal && (
              <div className="absolute z-20 w-80 right-0 mt-2 bg-white border-2 border-neutral-200 rounded-md-xl shadow-2xl p-5">
                <div className="space-y-4">
                  {/* Cabin of service */}
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 mb-2">Cabin of service:</label>
                    <div className="relative">
                      <select
                        value={cabin}
                        onChange={(e) => setCabin(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-md-xl text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                        style={{
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="Economy" className="py-2 bg-gray-800 text-white">Economy class</option>
                        <option value="Premium Economy" className="py-2 bg-gray-800 text-white">Premium Economy class</option>
                        <option value="Business" className="py-2 bg-gray-800 text-white">Business class</option>
                        <option value="First" className="py-2 bg-gray-800 text-white">First class</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Baggage preference */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
                      Baggage preference:
                      <button
                        type="button"
                        className="w-5 h-5 rounded-md-full bg-blue-100 text-gray-900 text-xs flex items-center justify-center hover:bg-blue-200 transition-colors font-bold"
                        title="Baggage information"
                      >
                        i
                      </button>
                    </label>
                    <div className="relative">
                      <select
                        value={baggage}
                        onChange={(e) => setBaggage(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-md-xl text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-gray-500  hover:ring-gray-300 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                        style={{
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="Carry-on baggage only" className="py-2 bg-gray-800 text-white">Carry-on baggage only</option>
                        <option value="1 checked bag" className="py-2 bg-gray-800 text-white">1 checked bag</option>
                        <option value="2 checked bags" className="py-2 bg-gray-800 text-white">2 checked bags</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Passenger selection */}
                  <div className="space-y-3">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900">adults</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-neutral-900">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900">children</div>
                          <div className="text-xs text-neutral-600 flex items-center gap-1">
                            2-11 years
                            <button
                              type="button"
                              className="w-3 h-3 rounded-md-full bg-neutral-200 text-neutral-600 text-xs flex items-center justify-center hover:bg-neutral-300"
                              title="Children age information"
                            >
                              i
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-neutral-900">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900">infants</div>
                          <div className="text-xs text-neutral-600 flex items-center gap-1">
                            0-24 months
                            <button
                              type="button"
                              className="w-3 h-3 rounded-md-full bg-neutral-200 text-neutral-600 text-xs flex items-center justify-center hover:bg-neutral-300"
                              title="Infants age information"
                            >
                              i
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-neutral-900">{infants}</span>
                        <button
                          type="button"
                          onClick={() => setInfants(infants + 1)}
                          className="w-9 h-9 border-2 border-neutral-300 rounded-md-lg hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center font-bold text-gray-900 transition-all duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPassengerModal(false)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md-xl text-sm font-bold uppercase tracking-wide hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-neutral-600 font-bold uppercase tracking-wide flex items-center gap-2 px-4 py-2 rounded-md-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              RESET
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="text-xs text-gray-900 font-semibold flex items-center gap-1 transition-all duration-200"
            >
              Advanced Search
              <svg 
                className={`w-3 h-3 transition-all duration-300 ease-in-out transform ${showAdvancedSearch ? 'rotate-180' : ''} hover:scale-110`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white px-4 py-2 rounded-md-lg hover:opacity-90 transition-all text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Advanced Search Options */}
        {showAdvancedSearch && (
          <div className="space-y-4 pt-4 border-t-2 border-neutral-300 mt-4 transition-all duration-300">
            {/* Time Flexibility - Middle Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Departure Time */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">Departure time</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative" ref={departureTimeEarliestRef}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDepartureTimeEarliest(!showDepartureTimeEarliest)}
                      className="w-full pl-10 pr-8 py-2.5 text-sm font-medium text-neutral-700 border-2 border-neutral-300 rounded-md-lg focus:outline-none  hover:ring-gray-300 bg-white text-left"
                    >
                      {departureTimeEarliest}
                    </button>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showDepartureTimeEarliest && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl max-h-64 overflow-y-auto">
                        {timeOptions.map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setDepartureTimeEarliest(option)
                              setShowDepartureTimeEarliest(false)
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                              departureTimeEarliest === option ? 'bg-neutral-100' : ''
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative" ref={departureTimeLatestRef}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDepartureTimeLatest(!showDepartureTimeLatest)}
                      className="w-full pl-10 pr-8 py-2.5 text-sm font-medium text-neutral-700 border-2 border-neutral-300 rounded-md-lg focus:outline-none  hover:ring-gray-300 bg-white text-left"
                    >
                      {departureTimeLatest}
                    </button>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showDepartureTimeLatest && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl max-h-64 overflow-y-auto">
                        {timeOptions.map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setDepartureTimeLatest(option)
                              setShowDepartureTimeLatest(false)
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                              departureTimeLatest === option ? 'bg-neutral-100' : ''
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Return Time */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">Return time</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative" ref={returnTimeEarliestRef}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReturnTimeEarliest(!showReturnTimeEarliest)}
                      className="w-full pl-10 pr-8 py-2.5 text-sm font-medium text-neutral-700 border-2 border-neutral-300 rounded-md-lg focus:outline-none  hover:ring-gray-300 bg-white text-left"
                    >
                      {returnTimeEarliest}
                    </button>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showReturnTimeEarliest && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl max-h-64 overflow-y-auto">
                        {timeOptions.map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setReturnTimeEarliest(option)
                              setShowReturnTimeEarliest(false)
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                              returnTimeEarliest === option ? 'bg-neutral-100' : ''
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative" ref={returnTimeLatestRef}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReturnTimeLatest(!showReturnTimeLatest)}
                      className="w-full pl-10 pr-8 py-2.5 text-sm font-medium text-neutral-700 border-2 border-neutral-300 rounded-md-lg focus:outline-none  hover:ring-gray-300 bg-white text-left"
                    >
                      {returnTimeLatest}
                    </button>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showReturnTimeLatest && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl max-h-64 overflow-y-auto">
                        {timeOptions.map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setReturnTimeLatest(option)
                              setShowReturnTimeLatest(false)
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                              returnTimeLatest === option ? 'bg-neutral-100' : ''
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Date Flexibility - Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Departure Date Flexibility */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">I am flexible in dates</label>
                <div className="relative" ref={departureDateFlexRef}>
                  <button
                    type="button"
                    onClick={() => setShowDepartureDateFlex(!showDepartureDateFlex)}
                    className="w-full px-4 py-2.5 text-sm font-medium border-2 border-neutral-300 rounded-md-lg focus:outline-none bg-white text-left"
                  >
                    <span className={departureDateFlexibility === '-' ? 'text-neutral-400' : 'text-neutral-700'}>
                      {departureDateFlexibility === '-' ? 'mention in days' : departureDateFlexibility}
                    </span>
                  </button>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showDepartureDateFlex && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl">
                      {flexibilityOptions.map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setDepartureDateFlexibility(option)
                            setShowDepartureDateFlex(false)
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                            departureDateFlexibility === option ? 'bg-neutral-100' : ''
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Return Date Flexibility */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">I am flexible in dates</label>
                <div className="relative" ref={returnDateFlexRef}>
                  <button
                    type="button"
                    onClick={() => setShowReturnDateFlex(!showReturnDateFlex)}
                    className="w-full px-4 py-2.5 text-sm font-medium border-2 border-neutral-300 rounded-md-lg focus:outline-none bg-white text-left"
                  >
                    <span className={returnDateFlexibility === '-' ? 'text-neutral-400' : 'text-neutral-700'}>
                      {returnDateFlexibility === '-' ? 'mention in days' : returnDateFlexibility}
                    </span>
                  </button>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showReturnDateFlex && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-neutral-300 rounded-md-lg shadow-xl">
                      {flexibilityOptions.map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setReturnDateFlexibility(option)
                            setShowReturnDateFlex(false)
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors ${
                            returnDateFlexibility === option ? 'bg-neutral-100' : ''
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Airline */}
              <div className="relative" ref={AirlineModalRef}>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">Airline</label>
                <div className="relative border-2 border-neutral-300 rounded-md-lg">
                  <input
                    type="text"
                    value={getSelectedAirlinesDisplay()}
                    readOnly
                    onClick={() => setShowAirlineModal(true)}
                    placeholder="Select Airline"
                    className="w-full px-4 py-2.5 text-sm font-medium text-neutral-700 focus:outline-none rounded-md-lg cursor-pointer"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {selectedAirlines.length > 0 && (
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAirlines([])
                        }}
                        className="text-neutral-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Airline Selection Modal */}
                {showAirlineModal && (
                  <>
                    {/* Backdrop Overlay */}
                    <div 
                      className="fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity"
                      onClick={() => setShowAirlineModal(false)}
                    />
                    {/* Modal Popup */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                      <div 
                        ref={AirlineModalRef}
                        className="bg-white border-2 border-neutral-300 rounded-md-lg shadow-2xl w-full max-w-xl max-h-[70vh] flex flex-col pointer-events-auto transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-md-t-lg">
                          <h3 className="text-lg font-bold text-neutral-900 ">Choose Airline</h3>
                          <button
                            type="button"
                            onClick={() => setShowAirlineModal(false)}
                            className="text-neutral-500 hover:text-neutral-700 transition-colors p-1 hover:bg-neutral-200 rounded-md"
                            aria-label="Close modal"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Search Bar */}
                        <div className="px-4 pb-4 bg-white">
                          <div className="relative">
                            <input
                              type="text"
                              value={AirlineSearchQuery}
                              onChange={(e) => setAirlineSearchQuery(e.target.value)}
                              placeholder="Search for the Airline"
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-300 rounded-md-lg text-sm font-medium text-neutral-700 focus:outline-none bg-white"
                              autoFocus
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-neutral-700"
                              aria-label="Search"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Airline List */}
                        <div className="flex-1 overflow-y-auto max-h-[300px] min-h-[150px]">
                          {filteredAirlines.length > 0 ? (
                            filteredAirlines.map((Airline) => (
                              <label
                                key={Airline.code}
                                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 transition-colors active:bg-neutral-100"
                              >
                                <input
                                  type="checkbox"
                                  checked={tempSelectedAirlines.includes(Airline.code)}
                                  onChange={() => handleAirlineToggle(Airline.code)}
                                  className="w-4 h-4 rounded-md border-2 border-neutral-300 cursor-pointer"
                                  style={{ accentColor: '#04154f' }}
                                />
                                <span className="text-sm font-medium text-neutral-700 flex-1">
                                  {Airline.name} ({Airline.code})
                                </span>
                              </label>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-sm text-neutral-500">
                              No Airlines found
                            </div>
                          )}
                        </div>

                        {/* Save Button */}
                        <div className="p-4 bg-white rounded-md-b-lg">
                          <button
                            type="button"
                            onClick={handleSaveAirlines}
                            className="w-full py-2.5 px-4 border-2 border-neutral-300 rounded-md-lg text-sm font-semibold text-neutral-700 uppercase tracking-wide hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                          >
                            SAVE CHANGES
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col justify-end gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={directFlightsOnly}
                    onChange={(e) => setDirectFlightsOnly(e.target.checked)}
                    className="w-4 h-4 rounded-md border-2 border-neutral-300"
                    style={{ accentColor: '#04154f' }}
                  />
                  <span className="text-xs text-neutral-700">Direct/Nonstop flights only</span>
                  <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={refundableTicketsOnly}
                    onChange={(e) => setRefundableTicketsOnly(e.target.checked)}
                    className="w-4 h-4 rounded-md border-2 border-neutral-300"
                    style={{ accentColor: '#04154f' }}
                  />
                  <span className="text-xs text-neutral-700">Refundable tickets only</span>
                  <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={railAndFly}
                    onChange={(e) => setRailAndFly(e.target.checked)}
                    className="w-4 h-4 rounded-md border-2 border-neutral-300"
                    style={{ accentColor: '#04154f' }}
                  />
                  <span className="text-xs text-neutral-700">Rail&Fly</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default CompactSearchForm
