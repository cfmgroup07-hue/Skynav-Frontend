import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import TripPlanDetails from '../components/TripPlanDetails'
import SeatMap from '../components/SeatMap'
import flightsData from '../data/flights.json'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { useAuth } from '../contexts/AuthContext'

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { formatCurrency, currencyDisplay } = useRegionalSettings()
  const [flight, setFlight] = useState(null)
  const [formData, setFormData] = useState({
    gender: '',
    firstName: '',
    lastName: '',
    title: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    // Passport Details
    nationality: '',
    passportNumber: '',
    passportExpiryDay: '',
    passportExpiryMonth: '',
    passportExpiryYear: '',
    passportIssueDay: '',
    passportIssueMonth: '',
    passportIssueYear: '',
    passportIssueCountry: '',
    // Contact Details
    email: '',
    phone: '',
    countryCallCode: '',
    // Address Details
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    // Emergency Contact
    shareEmergencyContact: 'yes', // 'yes' or 'no'
    emergencyPhone: '',
    emergencyEmail: '',
    // Keep old fields for backward compatibility
    name: '',
    dateOfBirth: '',
    passportExpiry: '',
  })
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [showPayment, setShowPayment] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showSeatMap, setShowSeatMap] = useState(false)

  useEffect(() => {
    const foundFlight = flightsData.flights.find(f => f.id === id)
    if (foundFlight) {
      setFlight({ ...foundFlight, metadata: flightsData.metadata })
    }
  }, [id])

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (user && user.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email }))
    }
  }, [user])

  const validateForm = () => {
    const newErrors = {}
    // Personal Details
    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    // Passport Details
    if (!formData.nationality) {
      newErrors.nationality = 'Nationality is required'
    }
    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = 'Passport number is required'
    }
    if (!formData.passportExpiryDay || !formData.passportExpiryMonth || !formData.passportExpiryYear) {
      newErrors.passportExpiry = 'Passport expiry date is required'
    }
    if (!formData.passportIssueDay || !formData.passportIssueMonth || !formData.passportIssueYear) {
      newErrors.passportIssue = 'Passport issue date is required'
    }
    if (!formData.passportIssueCountry) {
      newErrors.passportIssueCountry = 'Passport issue country is required'
    }
    // Contact Details
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.countryCallCode) {
      newErrors.countryCallCode = 'Country call code is required'
    }
    // Address Details
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required'
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Postal code is required'
    }
    if (!formData.country) {
      newErrors.country = 'Country is required'
    }
    // Emergency Contact
    if (formData.shareEmergencyContact === 'yes') {
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = 'Emergency phone number is required'
      }
      if (!formData.emergencyEmail.trim()) {
        newErrors.emergencyEmail = 'Emergency email address is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emergencyEmail)) {
        newErrors.emergencyEmail = 'Invalid email format'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors = {}
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^[0-9]{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number (16 digits required)'
      }
      if (!cardDetails.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required'
      }
      if (!cardDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required'
      }
      if (!cardDetails.cvv) {
        newErrors.cvv = 'CVV is required'
      } else if (!/^[0-9]{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Invalid CVV'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setShowPayment(true)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    if (!validatePayment()) return

    try {
      // Prepare passenger details
      const passenger_details = {
        gender: formData.gender,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        dateOfBirth: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
        nationality: formData.nationality,
        passportNumber: formData.passportNumber,
        passportExpiry: `${formData.passportExpiryYear}-${formData.passportExpiryMonth}-${formData.passportExpiryDay}`,
        passportIssue: `${formData.passportIssueYear}-${formData.passportIssueMonth}-${formData.passportIssueDay}`,
        passportIssueCountry: formData.passportIssueCountry,
          email: formData.email,
          phone: formData.phone,
        countryCallCode: formData.countryCallCode,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        country: formData.country,
        emergencyContact: formData.shareEmergencyContact === 'yes' ? {
          phone: formData.emergencyPhone,
          email: formData.emergencyEmail,
        } : null,
      }

      // Prepare contact info
      const contact_info = {
        email: formData.email,
        phone: `${formData.countryCallCode}${formData.phone}`,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
      }

      // Prepare payment info
      const payment_info = {
          method: paymentMethod,
        cardDetails: paymentMethod === 'card' ? {
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          cardName: cardDetails.cardName,
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
        } : null,
          transactionId: `TXN-${Date.now()}`,
      }

      // Call backend API to book flight
      const response = await fetch('http://localhost:3001/api/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flight_id: flight.id,
          flight_data: flight,
          passenger_details,
          contact_info,
          payment_info,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Ensure user email is saved in booking if logged in
        const bookingToSave = { ...result.booking }
        if (user && user.email) {
          if (!bookingToSave.passenger) {
            bookingToSave.passenger = {}
          }
          if (!bookingToSave.passenger.email) {
            bookingToSave.passenger.email = user.email
          }
          if (!bookingToSave.contact_info) {
            bookingToSave.contact_info = {}
          }
          if (!bookingToSave.contact_info.email) {
            bookingToSave.contact_info.email = user.email
          }
        }
        
        // Save to localStorage as backup
        const bookings = JSON.parse(localStorage.getItem('skynav_bookings') || '[]')
        bookings.push(bookingToSave)
        localStorage.setItem('skynav_bookings', JSON.stringify(bookings))

      // Navigate to my bookings page after successful booking
      navigate('/my-bookings')
      } else {
        alert(`Booking failed: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('❌ [BookingPage] Error booking flight:', error)
      alert(`Booking failed: ${error.message}`)
    }
  }

  const formatTime = (isoString) => {
    return format(new Date(isoString), 'HH:mm')
  }

  const formatDate = (isoString) => {
    return format(new Date(isoString), 'MMM dd, yyyy')
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
            <p className="text-primary-600 text-lg">Flight not found</p>
          </div>
        </div>
      </div>
    )
  }

  const firstSegment = flight.segments[0]
  const lastSegment = flight.segments[flight.segments.length - 1]

  return (
    <div className="min-h-screen bg-sky-50">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Step 1: Search - Completed */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-neutral-900 font-medium">Search</span>
            </div>

            {/* Chevron Separator */}
            <div className="flex-shrink-0 mx-2">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 2: Pricelist - Completed */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-neutral-900 font-medium">Pricelist</span>
            </div>

            {/* Chevron Separator */}
            <div className="flex-shrink-0 mx-2">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 3: Booking - Active */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-shrink-0 w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] bg-clip-text text-transparent font-bold text-sm">03</span>
                  </div>
                </div>
              </div>
              <span className="bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] bg-clip-text text-transparent font-medium">Booking</span>
            </div>

            {/* Chevron Separator */}
            <div className="flex-shrink-0 mx-2">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 4: Confirmation - Pending */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-neutral-400 flex items-center justify-center bg-transparent">
                <span className="text-neutral-400 font-bold">04</span>
              </div>
              <span className="text-neutral-400 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Trip Plan Details */}
          <TripPlanDetails flight={flight} passengers={1} />

            {/* Price Summary */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 text-sm font-semibold text-neutral-700">Passengers</th>
                      <th className="text-right py-2 text-sm font-semibold text-neutral-700">Price</th>
                      <th className="text-right py-2 text-sm font-semibold text-neutral-700">Taxes</th>
                      <th className="text-right py-2 text-sm font-semibold text-neutral-700">Total price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Passenger rows - dynamic based on backend data */}
                    {(() => {
                      // Get passenger data from location state, URL params, or flight data
                      // Backend structure: { adults: 1, children: 0, infants: 0, prices: {...} }
                      const searchParams = new URLSearchParams(location.search)
                      const locationState = location.state || {}
                      
                      // Get passenger counts (from URL, location state, or default)
                      const adults = parseInt(searchParams.get('adults')) || 
                                    locationState.passengers?.adults || 
                                    (typeof locationState.passengers === 'number' ? locationState.passengers : 1) ||
                                    flight?.passengers?.adults || 1
                      const children = parseInt(searchParams.get('children')) || 
                                      locationState.passengers?.children || 
                                      flight?.passengers?.children || 0
                      const infants = parseInt(searchParams.get('infants')) || 
                                     locationState.passengers?.infants || 
                                     flight?.passengers?.infants || 0
                      
                      // Get pricing data from backend (flight.pricing or locationState.pricing)
                      // Backend structure: { basePrice: 340.00, taxes: 248.14, serviceFee: 17.50 }
                      const pricing = flight?.pricing || locationState.pricing || {}
                      const basePrice = pricing.basePrice || flight?.price || 340.00
                      const taxesPerPerson = pricing.taxes || 248.14
                      const serviceFeePerPerson = pricing.serviceFee || 17.50
                      
                      // Calculate per person prices
                      const pricePerPerson = basePrice / Math.max(1, adults + children)
                      
                      let rows = []
                      let subtotal = 0
                      
                      // Adults
                      if (adults > 0) {
                        const adultPrice = pricePerPerson * adults
                        const adultTaxes = taxesPerPerson * adults
                        const adultTotal = adultPrice + adultTaxes
                        subtotal += adultTotal
                        
                        rows.push(
                          <tr key="adult" className="border-b border-neutral-100">
                            <td className="py-3 text-sm text-neutral-700">{adults}× Adult</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(adultPrice)}</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(adultTaxes)}</td>
                            <td className="py-3 text-sm font-semibold text-neutral-900 text-right">{formatCurrency(adultTotal)}</td>
                          </tr>
                        )
                      }
                      
                      // Children
                      if (children > 0) {
                        const childPrice = pricePerPerson * children
                        const childTaxes = taxesPerPerson * children
                        const childTotal = childPrice + childTaxes
                        subtotal += childTotal
                        
                        rows.push(
                          <tr key="child" className="border-b border-neutral-100">
                            <td className="py-3 text-sm text-neutral-700">{children}× Child</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(childPrice)}</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(childTaxes)}</td>
                            <td className="py-3 text-sm font-semibold text-neutral-900 text-right">{formatCurrency(childTotal)}</td>
                          </tr>
                        )
                      }
                      
                      // Infants (usually free or minimal cost)
                      if (infants > 0) {
                        rows.push(
                          <tr key="infant" className="border-b border-neutral-100">
                            <td className="py-3 text-sm text-neutral-700">{infants}× Infant</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(0)}</td>
                            <td className="py-3 text-sm text-neutral-700 text-right">{formatCurrency(0)}</td>
                            <td className="py-3 text-sm font-semibold text-neutral-900 text-right">{formatCurrency(0)}</td>
                          </tr>
                        )
                      }
                      
                      // Subtotal row (empty cells, total in last column)
                      rows.push(
                        <tr key="subtotal" className="border-b border-neutral-200">
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td className="py-3 text-sm font-semibold text-neutral-900 text-right">{formatCurrency(subtotal)}</td>
                        </tr>
                      )
                      
                      // Service fee rows
                      if (adults > 0) {
                        const adultServiceFee = serviceFeePerPerson * adults
                        rows.push(
                          <tr key="service-fee-adult" className="border-b border-neutral-100">
                            <td className="py-2 text-sm text-neutral-700">Service fee {adults}. (Adult)</td>
                            <td className="py-2"></td>
                            <td className="py-2"></td>
                            <td className="py-2 text-sm text-neutral-700 text-right">{formatCurrency(adultServiceFee)}</td>
                          </tr>
                        )
                        subtotal += adultServiceFee
                      }
                      
                      if (children > 0) {
                        const childServiceFee = serviceFeePerPerson * children
                        rows.push(
                          <tr key="service-fee-child" className="border-b border-neutral-100">
                            <td className="py-2 text-sm text-neutral-700">Service fee {children}. (Child)</td>
                            <td className="py-2"></td>
                            <td className="py-2"></td>
                            <td className="py-2 text-sm text-neutral-700 text-right">{formatCurrency(childServiceFee)}</td>
                          </tr>
                        )
                        subtotal += childServiceFee
                      }
                      
                      // Total row
                      rows.push(
                        <tr key="total" className="border-t-2 border-neutral-300">
                          <td className="py-3 text-base font-bold text-neutral-900">Total price</td>
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td className="py-3 text-base font-bold text-neutral-900 text-right">{formatCurrency(subtotal)}</td>
                        </tr>
                      )
                      
                      return rows
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{firstSegment.from}</div>
                    <div className="text-sm text-neutral-500">
                      {formatDate(firstSegment.dep_time)} {formatTime(firstSegment.dep_time)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-500">
                      {formatDuration(flight.duration_total_min)}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{lastSegment.to}</div>
                    <div className="text-sm text-neutral-500">
                      {formatDate(lastSegment.arr_time)} {formatTime(lastSegment.arr_time)}
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {flight.airlines.map((airline, idx) => (
                      <span key={idx} className="chip">{airline}</span>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">{flight.baggage_info}</p>
                  {flight.refundable && (
                    <span className="badge mt-2">Refundable</span>
                  )}
                </div>
              </div>
            </div>

            {!showPayment ? (
              <>
                <div className="card">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 uppercase">PASSENGERS</h2>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Passenger Block Header */}
                  <div className="bg-neutral-100 rounded-lg p-4 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-900">1. Adult</h3>
                    <button
                      type="button"
                      className="w-5 h-5 rounded-full bg-neutral-600 text-white text-xs flex items-center justify-center hover:bg-neutral-700 transition-colors font-bold"
                      title="Passenger information"
                    >
                      i
                    </button>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Gender */}
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-1">
                        Gender<span className="text-accent-600">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                          required
                        >
                          <option value="">-</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.gender && <p className="text-sm text-accent-600 mt-1">{errors.gender}</p>}
                    </div>

                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First name:<span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="input"
                        required
                      />
                      {errors.firstName && <p className="text-sm text-accent-600 mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last name<span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="input"
                        required
                      />
                      {errors.lastName && <p className="text-sm text-accent-600 mt-1">{errors.lastName}</p>}
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                        Title
                      </label>
                      <div className="relative">
                        <select
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                        >
                          <option value="">-</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Miss">Miss</option>
                          <option value="Dr">Dr</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date of Birth - Three Dropdowns */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Date of birth<span className="text-accent-600">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-4 items-end">
                        <div className="relative">
                          <select
                            id="birthDay"
                            value={formData.birthDay}
                            onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">DD</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                              <option key={day} value={String(day).padStart(2, '0')}>{String(day).padStart(2, '0')}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            id="birthMonth"
                            value={formData.birthMonth}
                            onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <option key={month} value={String(month).padStart(2, '0')}>{String(month).padStart(2, '0')}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            id="birthYear"
                            value={formData.birthYear}
                            onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">YYYY</option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {errors.dateOfBirth && <p className="text-sm text-accent-600 mt-1">{errors.dateOfBirth}</p>}
                    </div>
                  </div>

                  {/* Passport Details Section */}
                  <div className="border-t border-neutral-200 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Passport Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nationality */}
                      <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-neutral-700 mb-1">
                          Nationality<span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="nationality"
                            value={formData.nationality}
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">-</option>
                            <option value="Indian">Indian</option>
                            <option value="American">American</option>
                            <option value="British">British</option>
                            <option value="Canadian">Canadian</option>
                            <option value="Australian">Australian</option>
                            <option value="German">German</option>
                            <option value="French">French</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.nationality && <p className="text-sm text-accent-600 mt-1">{errors.nationality}</p>}
                      </div>

                      {/* Passport Number */}
                      <div>
                        <label htmlFor="passportNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                          Passport Number<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="passportNumber"
                          type="text"
                          value={formData.passportNumber}
                          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value.toUpperCase() })}
                          className="input"
                          placeholder="A12345678"
                          required
                        />
                        {errors.passportNumber && <p className="text-sm text-accent-600 mt-1">{errors.passportNumber}</p>}
                      </div>

                      {/* Passport Expiry Date */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Passport Expiry Date<span className="text-accent-600">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative">
                            <select
                              id="passportExpiryDay"
                              value={formData.passportExpiryDay}
                              onChange={(e) => setFormData({ ...formData, passportExpiryDay: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">DD</option>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={String(day).padStart(2, '0')}>{String(day).padStart(2, '0')}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              id="passportExpiryMonth"
                              value={formData.passportExpiryMonth}
                              onChange={(e) => setFormData({ ...formData, passportExpiryMonth: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={String(month).padStart(2, '0')}>{String(month).padStart(2, '0')}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              id="passportExpiryYear"
                              value={formData.passportExpiryYear}
                              onChange={(e) => setFormData({ ...formData, passportExpiryYear: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">YYYY</option>
                              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        {errors.passportExpiry && <p className="text-sm text-accent-600 mt-1">{errors.passportExpiry}</p>}
                      </div>

                      {/* Passport Issue Date */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Passport Issue Date<span className="text-accent-600">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative">
                            <select
                              id="passportIssueDay"
                              value={formData.passportIssueDay}
                              onChange={(e) => setFormData({ ...formData, passportIssueDay: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">DD</option>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={String(day).padStart(2, '0')}>{String(day).padStart(2, '0')}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              id="passportIssueMonth"
                              value={formData.passportIssueMonth}
                              onChange={(e) => setFormData({ ...formData, passportIssueMonth: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={String(month).padStart(2, '0')}>{String(month).padStart(2, '0')}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              id="passportIssueYear"
                              value={formData.passportIssueYear}
                              onChange={(e) => setFormData({ ...formData, passportIssueYear: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">YYYY</option>
                              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        {errors.passportIssue && <p className="text-sm text-accent-600 mt-1">{errors.passportIssue}</p>}
                      </div>

                      {/* Passport Issue Country */}
                      <div>
                        <label htmlFor="passportIssueCountry" className="block text-sm font-medium text-neutral-700 mb-1">
                          Passport Issue Country<span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="passportIssueCountry"
                            value={formData.passportIssueCountry}
                            onChange={(e) => setFormData({ ...formData, passportIssueCountry: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">-</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.passportIssueCountry && <p className="text-sm text-accent-600 mt-1">{errors.passportIssueCountry}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Details Section */}
                  <div className="border-t border-neutral-200 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input"
                          placeholder="example@email.com"
                          required
                        />
                        {errors.email && <p className="text-sm text-accent-600 mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number<span className="text-accent-600">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="relative">
                            <select
                              id="phoneCountryCode"
                              value={formData.countryCallCode}
                              onChange={(e) => setFormData({ ...formData, countryCallCode: e.target.value })}
                              className="w-full px-3 py-2.5 pr-8 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="">Code</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+91">+91</option>
                              <option value="+61">+61</option>
                              <option value="+81">+81</option>
                              <option value="+86">+86</option>
                              <option value="+49">+49</option>
                              <option value="+33">+33</option>
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                            className="col-span-2 input"
                            placeholder="1234567890"
                            required
                          />
                        </div>
                        {errors.phone && <p className="text-sm text-accent-600 mt-1">{errors.phone}</p>}
                        {errors.countryCallCode && <p className="text-sm text-accent-600 mt-1">{errors.countryCallCode}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Address Details Section */}
                  <div className="border-t border-neutral-200 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Address Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Address */}
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                          Street Address<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="input"
                          placeholder="Street address, apartment, suite, etc."
                          required
                        />
                        {errors.address && <p className="text-sm text-accent-600 mt-1">{errors.address}</p>}
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                          City<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="input"
                          required
                        />
                        {errors.city && <p className="text-sm text-accent-600 mt-1">{errors.city}</p>}
                      </div>

                      {/* State/Province */}
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                          State/Province<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="state"
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="input"
                          required
                        />
                        {errors.state && <p className="text-sm text-accent-600 mt-1">{errors.state}</p>}
                      </div>

                      {/* Postal Code */}
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-neutral-700 mb-1">
                          Postal Code<span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="pincode"
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="input"
                          required
                        />
                        {errors.pincode && <p className="text-sm text-accent-600 mt-1">{errors.pincode}</p>}
                      </div>

                      {/* Country */}
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                          Country<span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                            required
                          >
                            <option value="">-</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.country && <p className="text-sm text-accent-600 mt-1">{errors.country}</p>}
                      </div>
                    </div>
                  </div>

                  {/* MORE OPTIONS Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowMoreOptions(!showMoreOptions)}
                      className="px-6 py-2.5 bg-white border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
                    >
                      MORE OPTIONS
                      <svg className={`w-4 h-4 transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Sharing of Emergency Contact Details - Show when MORE OPTIONS is clicked */}
                  {showMoreOptions && (
                    <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 space-y-4">
                    <h4 className="text-base font-bold text-neutral-900">Sharing of emergency contact details.</h4>
                    <p className="text-sm text-neutral-700">
                      Please confirm and provide your contact details (mobile number and/or email) if you wish the carriers operating your flights to be able to contact you due to operational disruption such as cancellations, delays and schedule changes etc.
                    </p>
                    
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shareEmergencyContact"
                          value="yes"
                          checked={formData.shareEmergencyContact === 'yes'}
                          onChange={(e) => setFormData({ ...formData, shareEmergencyContact: e.target.value })}
                          className="w-5 h-5 focus:ring-2 focus:ring-offset-2"
                          style={{ accentColor: '#0A1A2F' }}
                        />
                        <span className="text-sm font-medium text-neutral-700">I wish to share emergency contact details</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shareEmergencyContact"
                          value="no"
                          checked={formData.shareEmergencyContact === 'no'}
                          onChange={(e) => setFormData({ ...formData, shareEmergencyContact: e.target.value })}
                          className="w-5 h-5 focus:ring-2 focus:ring-offset-2"
                          style={{ accentColor: '#0A1A2F' }}
                        />
                        <span className="text-sm font-medium text-neutral-700">I don't wish to share my details</span>
                      </label>
                    </div>

                    {/* Emergency Contact Fields - Show if sharing */}
                    {formData.shareEmergencyContact === 'yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
                        <div>
                          <label htmlFor="countryCallCode" className="block text-sm font-medium text-neutral-700 mb-1">
                            Country call code<span className="text-accent-600">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="countryCallCode"
                              value={formData.countryCallCode}
                              onChange={(e) => setFormData({ ...formData, countryCallCode: e.target.value })}
                              className="w-full px-4 py-2.5 pr-10 border-2 border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700 bg-white focus:outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all duration-200 hover:border-neutral-300 shadow-sm appearance-none cursor-pointer"
                              required={formData.shareEmergencyContact === 'yes'}
                            >
                              <option value="">-</option>
                              <option value="+1">+1 (USA/Canada)</option>
                              <option value="+44">+44 (UK)</option>
                              <option value="+91">+91 (India)</option>
                              <option value="+61">+61 (Australia)</option>
                              <option value="+81">+81 (Japan)</option>
                              <option value="+86">+86 (China)</option>
                              <option value="+49">+49 (Germany)</option>
                              <option value="+33">+33 (France)</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          {errors.countryCallCode && <p className="text-sm text-accent-600 mt-1">{errors.countryCallCode}</p>}
                        </div>
                        <div>
                          <label htmlFor="emergencyPhone" className="block text-sm font-medium text-neutral-700 mb-1">
                            Phone number<span className="text-accent-600">*</span>
                          </label>
                          <input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value.replace(/\D/g, '') })}
                            className="input"
                            required={formData.shareEmergencyContact === 'yes'}
                          />
                          {errors.emergencyPhone && <p className="text-sm text-accent-600 mt-1">{errors.emergencyPhone}</p>}
                        </div>
                        <div>
                          <label htmlFor="emergencyEmail" className="block text-sm font-medium text-neutral-700 mb-1">
                            E-mail address<span className="text-accent-600">*</span>
                          </label>
                          <input
                            id="emergencyEmail"
                            type="email"
                            value={formData.emergencyEmail}
                            onChange={(e) => setFormData({ ...formData, emergencyEmail: e.target.value })}
                            className="input"
                            required={formData.shareEmergencyContact === 'yes'}
                          />
                          {errors.emergencyEmail && <p className="text-sm text-accent-600 mt-1">{errors.emergencyEmail}</p>}
                        </div>
                      </div>
                    )}
                    </div>
                  )}

                  {/* Required Field Note */}

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowSeatMap(!showSeatMap)}
                      className="button-secondary flex-1"
                    >
                      {showSeatMap ? 'Hide Seat Map' : 'Select Seats'}
                    </button>
                    <button type="submit" className="button-primary flex-1">
                      Continue to Payment
                    </button>
                  </div>
                </form>
                </div>

                {/* Seat Map Section */}
                {showSeatMap && flight && (
                  <div className="mt-6">
                    <SeatMap 
                      flight={flight}
                      selectedSeats={selectedSeats}
                      onSeatSelect={(seatId, row, col, status) => {
                        if (selectedSeats.includes(seatId)) {
                          setSelectedSeats(selectedSeats.filter(s => s !== seatId))
                        } else {
                          setSelectedSeats([...selectedSeats, seatId])
                        }
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-lg text-left transition-colors ${
                          paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">💳 Credit/Debit Card</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 border-2 rounded-lg text-left transition-colors ${
                          paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">📱 UPI</div>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                          Card Number <span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="cardNumber"
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                            const formatted = value.match(/.{1,4}/g)?.join(' ') || value
                            setCardDetails({ ...cardDetails, cardNumber: formatted })
                          }}
                          className="input"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                        {errors.cardNumber && <p className="text-sm text-accent-600 mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 mb-1">
                          Cardholder Name <span className="text-accent-600">*</span>
                        </label>
                        <input
                          id="cardName"
                          type="text"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          className="input"
                          placeholder="Name on card"
                          required
                        />
                        {errors.cardName && <p className="text-sm text-accent-600 mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                            Expiry Date <span className="text-accent-600">*</span>
                          </label>
                          <input
                            id="expiryDate"
                            type="month"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            className="input"
                            min={new Date().toISOString().slice(0, 7)}
                            required
                          />
                          {errors.expiryDate && <p className="text-sm text-accent-600 mt-1">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                            CVV <span className="text-accent-600">*</span>
                          </label>
                          <input
                            id="cvv"
                            type="text"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                            className="input"
                            placeholder="123"
                            maxLength="4"
                            required
                          />
                          {errors.cvv && <p className="text-sm text-accent-600 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <p className="text-neutral-700">UPI payment will be processed after booking confirmation.</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      className="button-secondary flex-1"
                    >
                      Back
                    </button>
                    <button type="submit" className="button-primary flex-1">
                      Pay {formatCurrency(flight.price)}
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage

