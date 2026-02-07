import { useState, useEffect, useRef } from 'react'
import { FaBed, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa'

const CITIES = [
  { code: 'PAR', name: 'Paris', city: 'Paris', country: 'France' },
  { code: 'NYC', name: 'New York', city: 'New York', country: 'USA' },
  { code: 'LON', name: 'London', city: 'London', country: 'UK' },
  { code: 'DXB', name: 'Dubai', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Bangkok', city: 'Bangkok', country: 'Thailand' },
  { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey' },
  { code: 'BCN', name: 'Barcelona', city: 'Barcelona', country: 'Spain' },
  { code: 'ROM', name: 'Rome', city: 'Rome', country: 'Italy' },
  { code: 'MAD', name: 'Madrid', city: 'Madrid', country: 'Spain' },
  { code: 'AMS', name: 'Amsterdam', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'BER', name: 'Berlin', city: 'Berlin', country: 'Germany' },
  { code: 'VIE', name: 'Vienna', city: 'Vienna', country: 'Austria' },
  { code: 'PRG', name: 'Prague', city: 'Prague', country: 'Czech Republic' },
  { code: 'ATH', name: 'Athens', city: 'Athens', country: 'Greece' },
  { code: 'LIS', name: 'Lisbon', city: 'Lisbon', country: 'Portugal' },
  { code: 'DUB', name: 'Dublin', city: 'Dublin', country: 'Ireland' },
  { code: 'STO', name: 'Stockholm', city: 'Stockholm', country: 'Sweden' },
  { code: 'OSL', name: 'Oslo', city: 'Oslo', country: 'Norway' },
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen', country: 'Denmark' },
  { code: 'DEL', name: 'Delhi', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bangalore', city: 'Bangalore', country: 'India' },
  { code: 'CCU', name: 'Kolkata', city: 'Kolkata', country: 'India' },
  { code: 'MAA', name: 'Chennai', city: 'Chennai', country: 'India' },
  { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad', country: 'India' },
  { code: 'GOI', name: 'Goa', city: 'Goa', country: 'India' },
  { code: 'BAL', name: 'Bali', city: 'Bali', country: 'Indonesia' },
  { code: 'TOK', name: 'Tokyo', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne', city: 'Melbourne', country: 'Australia' },
]

function HotelSearchBar({ onSearch, initialValues = {} }) {
  const [destination, setDestination] = useState(initialValues.destination || '')
  const [destinationCode, setDestinationCode] = useState(initialValues.destination || '')
  const [checkIn, setCheckIn] = useState(initialValues.check_in || '')
  const [checkOut, setCheckOut] = useState(initialValues.check_out || '')
  const [rooms, setRooms] = useState(initialValues.rooms || 1)
  const [adults, setAdults] = useState(initialValues.adults || 2)
  const [children, setChildren] = useState(initialValues.children || 0)
  const [isButtonAnimated, setIsButtonAnimated] = useState(false)
  const [showTravellerModal, setShowTravellerModal] = useState(false)
  const [priceRange, setPriceRange] = useState(initialValues.price_range || '')
  const [starRating, setStarRating] = useState(initialValues.star_rating || '')
  
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  
  const destinationRef = useRef(null)
  const travellerModalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (travellerModalRef.current && !travellerModalRef.current.contains(event.target)) {
        setShowTravellerModal(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationSuggestions(false)
      }
    }
    if (showTravellerModal || showDestinationSuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTravellerModal, showDestinationSuggestions])

  useEffect(() => {
    if (destination.length > 0) {
      const filtered = CITIES.filter(city =>
        city.code.toLowerCase().includes(destination.toLowerCase()) ||
        city.name.toLowerCase().includes(destination.toLowerCase()) ||
        city.city.toLowerCase().includes(destination.toLowerCase())
      ).slice(0, 5)
      setDestinationSuggestions(filtered)
      setShowDestinationSuggestions(true)
    } else {
      setShowDestinationSuggestions(false)
    }
  }, [destination])

  const handleDestinationSelect = (city) => {
    setDestination(`${city.city}, ${city.country}`)
    setDestinationCode(city.code)
    setShowDestinationSuggestions(false)
  }

  const handleRemoveDestination = () => {
    setDestination('')
    setDestinationCode('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!destination) {
      alert('Please select a destination')
      return
    }
    
    if (adults < 1) {
      alert('At least one adult is required')
      return
    }

    // Trigger animation
    setIsButtonAnimated(true)

    // Wait for animation to complete before submitting
    setTimeout(() => {
      onSearch({
        destination: destinationCode || destination,
        check_in: checkIn,
        check_out: checkOut,
        rooms,
        adults,
        children,
        price_range: priceRange,
        star_rating: starRating,
      })
    }, 2500)

    // Reset animation after full cycle completes
    setTimeout(() => {
      setIsButtonAnimated(false)
    }, 4000)
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 12)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const minCheckOut = checkIn || today

  return (
    <section className="relative w-full bg-gradient-to-br from-white via-primary-50/30 to-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Text */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-4">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-primary-700">Book Your Perfect Stay Today</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600">
                Find Your Perfect
              </span>
              <br />
              <span className="text-primary-800">Hotel Stay</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 leading-relaxed max-w-3xl mx-auto">
              Discover amazing hotels, compare prices from 1000+ properties, and book your perfect accommodation in minutes.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl shadow-2xl p-6 md:p-8 bg-gradient-to-r from-white via-primary-50 to-primary-100" role="search" aria-label="Hotel search form">
            {/* Quick Filters */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-primary-700">Quick Filters:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStarRating(starRating === '5' ? '' : '5')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    starRating === '5'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <FaStar className="inline mr-1 text-yellow-400" />
                  5 Star
                </button>
                <button
                  type="button"
                  onClick={() => setStarRating(starRating === '4' ? '' : '4')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    starRating === '4'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <FaStar className="inline mr-1 text-yellow-400" />
                  4 Star
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange(priceRange === 'budget' ? '' : 'budget')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    priceRange === 'budget'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  Budget
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange(priceRange === 'luxury' ? '' : 'luxury')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    priceRange === 'luxury'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  Luxury
                </button>
              </div>
            </div>

            {/* Main Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Destination */}
              <div className="relative">
                <label htmlFor="destination" className="block text-sm font-semibold text-primary-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-1" />
                  Destination
                </label>
                <div className="relative" ref={destinationRef}>
                  <input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => destination.length > 0 && setShowDestinationSuggestions(true)}
                    placeholder="City or hotel"
                    className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    autoComplete="off"
                    aria-label="Hotel destination"
                  />
                  {destination && (
                    <button
                      type="button"
                      onClick={handleRemoveDestination}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600"
                      aria-label="Clear destination"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-primary-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {destinationSuggestions.map((city) => (
                        <li
                          key={city.code}
                          onClick={() => handleDestinationSelect(city)}
                          className="px-4 py-2 hover:bg-primary-50 cursor-pointer"
                          role="option"
                        >
                          <div className="font-semibold text-primary-900">{city.city}</div>
                          <div className="text-sm text-primary-600">{city.country}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <label htmlFor="checkIn" className="block text-sm font-semibold text-primary-700 mb-2">
                  <FaCalendarAlt className="inline mr-1" />
                  Check-in
                </label>
                <input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  max={maxDateStr}
                  className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Check-in date"
                />
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <label htmlFor="checkOut" className="block text-sm font-semibold text-primary-700 mb-2">
                  <FaCalendarAlt className="inline mr-1" />
                  Check-out
                </label>
                <input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={minCheckOut}
                  max={maxDateStr}
                  className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Check-out date"
                />
              </div>

              {/* Guests & Rooms */}
              <div className="relative">
                <label htmlFor="guests" className="block text-sm font-semibold text-primary-700 mb-2">
                  <FaUsers className="inline mr-1" />
                  Guests & Rooms
                </label>
                <button
                  type="button"
                  id="guests"
                  onClick={() => setShowTravellerModal(!showTravellerModal)}
                  className="bg-white text-primary-900 border border-primary-300 rounded-lg px-4 py-3 w-full text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between"
                  aria-label="Select guests and rooms"
                >
                  <span>{rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}</span>
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Traveller Modal */}
                {showTravellerModal && (
                  <div
                    ref={travellerModalRef}
                    className="absolute z-20 mt-2 w-full min-w-[320px] max-w-sm bg-white border border-primary-300 rounded-lg shadow-xl p-5"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-primary-900 mb-1">Rooms</div>
                          <div className="text-xs text-primary-600 whitespace-nowrap">Maximum 9 rooms</div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            disabled={rooms <= 1}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              rooms <= 1
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Decrease rooms"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-10 text-center font-semibold text-primary-900 text-base">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRooms(Math.min(9, rooms + 1))}
                            disabled={rooms >= 9}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              rooms >= 9
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Increase rooms"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-primary-900 mb-1">Adults</div>
                          <div className="text-xs text-primary-600 whitespace-nowrap">Ages 18+</div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            disabled={adults <= 1}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              adults <= 1
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Decrease adults"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-10 text-center font-semibold text-primary-900 text-base">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(Math.min(30, adults + 1))}
                            disabled={adults >= 30}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              adults >= 30
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Increase adults"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-primary-900 mb-1">Children</div>
                          <div className="text-xs text-primary-600 whitespace-nowrap">Ages 0-17</div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              children <= 0
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Decrease children"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-10 text-center font-semibold text-primary-900 text-base">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(Math.min(10, children + 1))}
                            disabled={children >= 10}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                              children >= 10
                                ? 'border-primary-200 text-primary-300 cursor-not-allowed'
                                : 'border-primary-300 text-primary-700 hover:bg-primary-50 active:scale-95'
                            }`}
                            aria-label="Increase children"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowTravellerModal(false)}
                        className="w-full mt-4 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button - In Same Row */}
              <div className="relative flex items-end">
                <button
                  type="submit"
                  className={`group relative w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3 ${
                    isButtonAnimated ? 'airplane-submit-btn checked' : 'airplane-submit-btn'
                  }`}
                >
                  <FaSearch className="text-lg md:text-xl" />
                  <span className="whitespace-nowrap">Search Hotels</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default HotelSearchBar

