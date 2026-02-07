import { useState, useEffect, useRef } from 'react'

const AIRPORTS = [
  { code: 'DEL', name: 'Delhi', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bangalore', city: 'Bangalore', country: 'India' },
  { code: 'CCU', name: 'Kolkata', city: 'Kolkata', country: 'India' },
  { code: 'MAA', name: 'Chennai', city: 'Chennai', country: 'India' }, 
  { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad', country: 'India' },
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'JFK', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA' },
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
  { code: 'PNQ', name: 'Pune', city: 'Pune/Poona', country: 'India' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'USA' },
]

function SearchBar({ onSearch, initialValues = {} }) {
  const [from, setFrom] = useState(initialValues.origin || '')
  const [fromCode, setFromCode] = useState(initialValues.origin || '')
  const [to, setTo] = useState(initialValues.destination || '')
  const [toCode, setToCode] = useState(initialValues.destination || '')
  const [departDate, setDepartDate] = useState(initialValues.depart_date || '')
  const [returnDate, setReturnDate] = useState(initialValues.return_date || '')
  const [tripType, setTripType] = useState('one-way') // one-way, round-trip, multi-city
  const [adults, setAdults] = useState(initialValues.passengers?.adults || 1)
  const [children, setChildren] = useState(initialValues.passengers?.children || 0)
  const [infants, setInfants] = useState(0)
  const [cabin, setCabin] = useState(initialValues.cabin || 'Economy')
  const [fareType, setFareType] = useState('Regular')
  const [nonStopFlights, setNonStopFlights] = useState(false)
  const [activeTab, setActiveTab] = useState('Flights')
  
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [isButtonAnimated, setIsButtonAnimated] = useState(false)
  const [showTravellerModal, setShowTravellerModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  const fromRef = useRef(null)
  const toRef = useRef(null)
  const travellerModalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (travellerModalRef.current && !travellerModalRef.current.contains(event.target)) {
        setShowTravellerModal(false)
      }
    }
    if (showTravellerModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTravellerModal])

  useEffect(() => {
    if (from.length > 0) {
      const filtered = AIRPORTS.filter(airport =>
        airport.code.toLowerCase().includes(from.toLowerCase()) ||
        airport.name.toLowerCase().includes(from.toLowerCase()) ||
        airport.city.toLowerCase().includes(from.toLowerCase())
      ).slice(0, 5)
      setFromSuggestions(filtered)
      setShowFromSuggestions(true)
    } else {
      setShowFromSuggestions(false)
    }
  }, [from])

  useEffect(() => {
    if (to.length > 0) {
      const filtered = AIRPORTS.filter(airport =>
        airport.code.toLowerCase().includes(to.toLowerCase()) ||
        airport.name.toLowerCase().includes(to.toLowerCase()) ||
        airport.city.toLowerCase().includes(to.toLowerCase())
      ).slice(0, 5)
      setToSuggestions(filtered)
      setShowToSuggestions(true)
    } else {
      setShowToSuggestions(false)
    }
  }, [to])

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

  const handleRemoveFrom = () => {
    setFrom('')
    setFromCode('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!from || !to) {
      alert('Please select origin and destination')
      return
    }
    
    if (from === to) {
      alert('Origin and destination cannot be the same')
      return
    }
    
    // Dates are optional - can search with "Anytime"
    
    if (adults + children < 1) {
      alert('At least one passenger is required')
      return
    }

    // Trigger animation
    setIsButtonAnimated(true)

    // Wait for animation to complete before submitting (1s delay + 1.5s into animation)
    setTimeout(() => {
      const destinationCode = toCode || to.match(/\(([A-Z]{3})\)/)?.[1] || to

      onSearch({
        origin: fromCode || 'DEL',
        destination: destinationCode,
        depart_date: departDate,
        return_date: tripType === 'round-trip' ? returnDate : null,
        passengers: { adults, children, infants },
        cabin,
      })
    }, 2500) // Start submission after 2.5s (during animation)

    // Reset animation after full cycle completes (1s delay + 3s animation = 4s total)
    setTimeout(() => {
      setIsButtonAnimated(false)
    }, 4000)
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 6)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl shadow-2xl p-6 md:p-8 bg-gradient-to-r from-white via-sky-50 to-primary-100" role="search" aria-label="Flight search form">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 md:gap-6 mb-6 pb-4 border-b border-primary-200">
        <button
          type="button"
          onClick={() => setActiveTab('Flights')}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'Flights' 
              ? 'bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white' 
              : 'text-primary-700 hover:text-primary-900'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Flights
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Hotels')}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'Hotels' 
              ? 'bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white' 
              : 'text-primary-700 hover:text-primary-900'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Hotels
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Holidays')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'Holidays' 
              ? 'bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white' 
              : 'text-primary-700 hover:text-primary-900'
          }`}
        >
          Holidays
        </button>
      </div>

      {/* Trip Type Radio Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={(e) => {
              setTripType(e.target.value)
              setReturnDate('')
            }}
            className="w-4 h-4 text-red-600 focus:ring-gray-500"
          />
          <span className="font-semibold text-primary-700">One Way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-red-600 focus:ring-gray-500"
          />
          <span className="font-semibold text-gray-700">Round Trip</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="multi-city"
            checked={tripType === 'multi-city'}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-red-600 focus:ring-gray-500"
          />
          <span className="font-semibold text-gray-700">Multi City</span>
        </label>
      </div>

      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-semibold text-primary-700 mb-2">
            Departure From
          </label>
          <div className="relative">
            <input
              id="from"
              ref={fromRef}
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => from.length > 0 && setShowFromSuggestions(true)}
              placeholder="City or airport"
              className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              autoComplete="off"
              aria-label="Origin airport"
            />
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-primary-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {fromSuggestions.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleFromSelect(airport)}
                    className="px-4 py-2 hover:bg-white cursor-pointer"
                    role="option"
                  >
                    <div className="font-semibold">{airport.city} ({airport.code})</div>
                    <div className="text-sm text-primary-600">{airport.name} - {airport.country}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-2">
            Going To
          </label>
          <div className="relative">
            <input
              id="to"
              ref={toRef}
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => to.length > 0 && setShowToSuggestions(true)}
              placeholder="City or airport"
              className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              autoComplete="off"
              aria-label="Destination airport"
            />
            <button
              type="button"
              onClick={() => {
                const temp = from
                const tempCode = fromCode
                setFrom(to)
                setTo(temp)
                setFromCode(toCode)
                setToCode(tempCode)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white p-2 rounded-lg hover:opacity-90 transition-all"
              aria-label="Swap destinations"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            {showToSuggestions && toSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-primary-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {toSuggestions.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleToSelect(airport)}
                    className="px-4 py-2 hover:bg-white cursor-pointer"
                    role="option"
                  >
                    <div className="font-semibold">{airport.city} ({airport.code})</div>
                    <div className="text-sm text-primary-600">{airport.name} - {airport.country}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="departDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Departure Date
          </label>
          <div className="relative">
            <input
              id="departDate"
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              min={today}
              max={maxDateStr}
              className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Departure date"
            />
          </div>
        </div>

        <div>
          <label htmlFor="returnDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Return Date
          </label>
          <div className="relative">
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departDate || today}
              max={maxDateStr}
              disabled={tripType !== 'round-trip'}
              className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 disabled:bg-primary-50 disabled:text-primary-400"
              aria-label="Return date"
            />
          </div>
        </div>

        <div>
          <label htmlFor="travellers" className="block text-sm font-semibold text-gray-700 mb-2">
            Travellers & Class
          </label>
          <button
            type="button"
            onClick={() => setShowTravellerModal(!showTravellerModal)}
            className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm text-left focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            {adults} Traveller{adults > 1 ? 's' : ''} ({cabin})
          </button>
          {showTravellerModal && (
            <div ref={travellerModalRef} className="absolute z-50 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-6 min-w-[320px] max-w-[400px] right-0">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-800">Adult (on the day of travel)</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900 text-base">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(9, adults + 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-800">Child (2-12 YRS)</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900 text-base">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(9, children + 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">Infant (Below 2 YRS)</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900 text-base">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants(Math.min(9, infants + 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-colors text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-200 pt-4 mb-4">
                <div className="mb-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="cabin"
                      value="Economy"
                      checked={cabin === 'Economy'}
                      onChange={(e) => setCabin(e.target.value)}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="text-sm font-semibold text-gray-800">Economy</span>
                  </label>
                </div>
                <div className="mb-3">
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="cabin"
                      value="Premium Economy"
                      checked={cabin === 'Premium Economy'}
                      onChange={(e) => setCabin(e.target.value)}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="text-sm font-semibold text-gray-800">Premium Economy</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="cabin"
                      value="Business"
                      checked={cabin === 'Business'}
                      onChange={(e) => setCabin(e.target.value)}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="text-sm font-semibold text-gray-800">Business</span>
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTravellerModal(false)}
                className="w-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row - Fare Type and Search Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fareType"
              value="Regular"
              checked={fareType === 'Regular'}
              onChange={(e) => setFareType(e.target.value)}
              className="w-4 h-4 text-red-600 focus:ring-gray-500"
            />
            <span className="text-sm font-semibold text-gray-700">Regular</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fareType"
              value="Student"
              checked={fareType === 'Student'}
              onChange={(e) => setFareType(e.target.value)}
              className="w-4 h-4 text-red-600 focus:ring-gray-500"
            />
            <span className="text-sm font-semibold text-gray-700">Student</span>
            <span className="text-xs text-gray-500">(Extra Baggage)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fareType"
              value="Armed Forces"
              checked={fareType === 'Armed Forces'}
              onChange={(e) => setFareType(e.target.value)}
              className="w-4 h-4 text-red-600 focus:ring-gray-500"
            />
            <span className="text-sm font-semibold text-gray-700">Armed Forces</span>
            <span className="text-xs text-gray-500">(Extra Discount)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fareType"
              value="Senior Citizen"
              checked={fareType === 'Senior Citizen'}
              onChange={(e) => setFareType(e.target.value)}
              className="w-4 h-4 text-red-600 focus:ring-gray-500"
            />
            <span className="text-sm font-semibold text-gray-700">Senior Citizen</span>
            <span className="text-xs text-gray-500">(Extra Discount)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="nonStopFlights"
              checked={nonStopFlights}
              onChange={(e) => setNonStopFlights(e.target.checked)}
              className="w-4 h-4 gradient-checkbox focus:ring-gray-500 rounded border-gray-300"
            />
            <label htmlFor="nonStopFlights" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Non-Stop Flights
            </label>
          </div>
        </div>
        <button 
          type="submit" 
          className={`airplane-submit-btn ${isButtonAnimated ? 'checked' : ''} self-center md:self-auto`}
          aria-label="Search flights"
        >
          <div className="rotate">
            <div className="move">
              <div className="part left"></div>
              <div className="part right"></div>
            </div>
          </div>
          {/* Small airplane icon */}
          <svg 
            className="airplane-icon" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar

