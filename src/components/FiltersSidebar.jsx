import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'

function FiltersSidebar({ availableFacets = {}, onChange, currentFilters = {} }) {
  const [priceMax, setPriceMax] = useState(currentFilters.priceMax || availableFacets.priceMax || 100000)
  const [stops, setStops] = useState(currentFilters.stops || [])
  const [airlines, setAirlines] = useState(currentFilters.airlines || [])
  const [durationMax, setDurationMax] = useState(currentFilters.durationMax || availableFacets.durationMax || 1440)
  const [departureTimeMax, setDepartureTimeMax] = useState(currentFilters.departureTimeMax || 1435)
  const [returnTimeMax, setReturnTimeMax] = useState(currentFilters.returnTimeMax || 1435)
  const [baggages, setBaggages] = useState(currentFilters.baggages || ['no-bag', 'free-bag'])
  const [refundability, setRefundability] = useState(currentFilters.refundability || ['non-refundable', 'unknown', 'refundable'])
  const [fareTypes, setFareTypes] = useState(currentFilters.fareTypes || ['lowcost', 'regular'])
  const [classOfService, setClassOfService] = useState(currentFilters.classOfService || ['economy', 'premium-economy'])
  const [refundableOnly, setRefundableOnly] = useState(currentFilters.refundableOnly || false)
  const [sort, setSort] = useState(currentFilters.sort || 'best')
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [tempPriceMax, setTempPriceMax] = useState(priceMax)
  const [tempDepartureTimeMax, setTempDepartureTimeMax] = useState(departureTimeMax)
  const [tempReturnTimeMax, setTempReturnTimeMax] = useState(returnTimeMax)
  const [tempDurationMax, setTempDurationMax] = useState(durationMax)
  const customModalRef = useRef(null)
  const { formatCurrency } = useRegionalSettings()

  const debouncedPriceMax = useDebounce(priceMax, 300)
  const debouncedDurationMax = useDebounce(durationMax, 300)
  const debouncedDepartureTimeMax = useDebounce(departureTimeMax, 300)
  const debouncedReturnTimeMax = useDebounce(returnTimeMax, 300)

  const handleStopChange = (stopCount) => {
    setStops(prev => 
      prev.includes(stopCount) 
        ? prev.filter(s => s !== stopCount)
        : [...prev, stopCount]
    )
  }

  const handleAirlineChange = (airline) => {
    setAirlines(prev =>
      prev.includes(airline)
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    )
  }

  const handleBaggagesChange = (baggageType) => {
    setBaggages(prev =>
      prev.includes(baggageType)
        ? prev.filter(b => b !== baggageType)
        : [...prev, baggageType]
    )
  }

  const handleRefundabilityChange = (refundType) => {
    setRefundability(prev =>
      prev.includes(refundType)
        ? prev.filter(r => r !== refundType)
        : [...prev, refundType]
    )
  }

  const handleFareTypesChange = (fareType) => {
    setFareTypes(prev =>
      prev.includes(fareType)
        ? prev.filter(f => f !== fareType)
        : [...prev, fareType]
    )
  }

  const handleClassOfServiceChange = (classType) => {
    setClassOfService(prev =>
      prev.includes(classType)
        ? prev.filter(c => c !== classType)
        : [...prev, classType]
    )
  }

  const handleSelectAll = (category, allOptions) => {
    switch(category) {
      case 'baggages':
        setBaggages(baggages.length === allOptions.length ? [] : allOptions)
        break
      case 'refundability':
        setRefundability(refundability.length === allOptions.length ? [] : allOptions)
        break
      case 'fareTypes':
        setFareTypes(fareTypes.length === allOptions.length ? [] : allOptions)
        break
      case 'classOfService':
        setClassOfService(classOfService.length === allOptions.length ? [] : allOptions)
        break
      case 'airlines':
        setAirlines(airlines.length === availableFacets.airlines?.length ? [] : availableFacets.airlines || [])
        break
      default:
        break
    }
  }

  useEffect(() => {
    onChange({
      priceMin: availableFacets.priceMin || 0,
      priceMax: debouncedPriceMax,
      stops,
      airlines,
      durationMin: 0,
      durationMax: debouncedDurationMax,
      departureTimeMin: 0,
      departureTimeMax: debouncedDepartureTimeMax,
      returnTimeMin: 0,
      returnTimeMax: debouncedReturnTimeMax,
      baggages,
      refundability,
      fareTypes,
      classOfService,
      refundableOnly,
      sort,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceMax, stops, airlines, debouncedDurationMax, debouncedDepartureTimeMax, debouncedReturnTimeMax, baggages, refundability, fareTypes, classOfService, refundableOnly, sort])

  const handleReset = () => {
    setPriceMax(availableFacets.priceMax || 100000)
    setStops([])
    setAirlines([])
    setDurationMax(availableFacets.durationMax || 1440)
    setDepartureTimeMax(1435)
    setReturnTimeMax(1435)
    setBaggages(['no-bag', 'free-bag'])
    setRefundability(['non-refundable', 'unknown', 'refundable'])
    setFareTypes(['lowcost', 'regular'])
    setClassOfService(['economy', 'premium-economy'])
    setRefundableOnly(false)
    setSort('best')
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (customModalRef.current && !customModalRef.current.contains(event.target)) {
        setShowCustomModal(false)
      }
    }

    if (showCustomModal) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [showCustomModal])

  // Initialize temp values when modal opens
  useEffect(() => {
    if (showCustomModal) {
      setTempPriceMax(priceMax)
      setTempDepartureTimeMax(departureTimeMax)
      setTempReturnTimeMax(returnTimeMax)
      setTempDurationMax(durationMax)
    }
  }, [showCustomModal, priceMax, departureTimeMax, returnTimeMax, durationMax])

  const handleCustomSave = () => {
    setPriceMax(tempPriceMax)
    setDepartureTimeMax(tempDepartureTimeMax)
    setReturnTimeMax(tempReturnTimeMax)
    setDurationMax(tempDurationMax)
    setShowCustomModal(false)
  }

  const handleCustomCancel = () => {
    setTempPriceMax(priceMax)
    setTempDepartureTimeMax(departureTimeMax)
    setTempReturnTimeMax(returnTimeMax)
    setTempDurationMax(durationMax)
    setShowCustomModal(false)
  }

  // Parse time input (HH:mm format) to minutes
  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return (hours || 0) * 60 + (minutes || 0)
  }

  // Parse duration input (HH:mm format) to minutes
  const parseDurationToMinutes = (durationString) => {
    const [hours, minutes] = durationString.split(':').map(Number)
    return (hours || 0) * 60 + (minutes || 0)
  }

  return (
    <aside className="bg-white rounded-xl shadow-card p-6" aria-label="Flight filters">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-900">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Baggages */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">BAGGAGES:</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={baggages.length === 2}
                onChange={() => handleSelectAll('baggages', ['no-bag', 'free-bag'])}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-xs text-neutral-600">all</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={baggages.includes('no-bag')}
                onChange={() => handleBaggagesChange('no-bag')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">No free bag/only hand bag</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={baggages.includes('free-bag')}
                onChange={() => handleBaggagesChange('free-bag')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Free baggage included</span>
            </label>
          </div>
        </div>

        {/* Ticket Refundability */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">TICKET REFUNDABILITY:</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={refundability.length === 3}
                onChange={() => handleSelectAll('refundability', ['non-refundable', 'unknown', 'refundable'])}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-xs text-neutral-600">all</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={refundability.includes('non-refundable')}
                onChange={() => handleRefundabilityChange('non-refundable')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Non refundable</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={refundability.includes('unknown')}
                onChange={() => handleRefundabilityChange('unknown')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Refundable status unknown</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={refundability.includes('refundable')}
                onChange={() => handleRefundabilityChange('refundable')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Refundable</span>
            </label>
          </div>
        </div>

        {/* Fare Types */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">FARE TYPES:</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fareTypes.length === 2}
                onChange={() => handleSelectAll('fareTypes', ['lowcost', 'regular'])}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-xs text-neutral-600">all</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fareTypes.includes('lowcost')}
                onChange={() => handleFareTypesChange('lowcost')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">lowcost</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fareTypes.includes('regular')}
                onChange={() => handleFareTypesChange('regular')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">regular</span>
            </label>
          </div>
        </div>

        {/* Class of Service */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">CLASS OF SERVICE:</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={classOfService.length === 2}
                onChange={() => handleSelectAll('classOfService', ['economy', 'premium-economy'])}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-xs text-neutral-600">all</span>
            </label>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={classOfService.includes('economy')}
                onChange={() => handleClassOfServiceChange('economy')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Economy</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={classOfService.includes('premium-economy')}
                onChange={() => handleClassOfServiceChange('premium-economy')}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-sm text-neutral-700">Premium Economy</span>
            </label>
          </div>
        </div>

        {/* Flight Price */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="flightPrice" className="form-label text-sm font-semibold text-neutral-900 uppercase tracking-wide">
              FLIGHT PRICE
            </label>
            <button
              onClick={() => setShowCustomModal(true)}
              className="text-sm text-blue-900 underline hover:text-neutral-900 font-medium transition-colors"
              style={{ background: 'transparent', border: 'none' }}
            >
              Custom
            </button>
          </div>
          <div className="flex justify-between text-xs text-neutral-600 mb-2">
            <span>{formatCurrency(availableFacets.priceMin || 0)}</span>
            <span>{formatCurrency(priceMax)}</span>
          </div>
          <input 
            type="range" 
            className="form-range" 
            id="flightPrice"
            min={availableFacets.priceMin || 0}
            max={availableFacets.priceMax || 100000}
            value={priceMax}
            onChange={(e) => setPriceMax(parseInt(e.target.value))}
            style={{
              '--slider-progress': `${((priceMax - (availableFacets.priceMin || 0)) / ((availableFacets.priceMax || 100000) - (availableFacets.priceMin || 0))) * 100}%`
            }}
          />
        </div>

        {/* Departure Time Outbound */}
        <div>
          <label htmlFor="departureTimeOutbound" className="form-label block text-sm font-semibold text-neutral-900 mb-3 uppercase tracking-wide">
            DEPARTURE TIME (OUTBOUND):
          </label>
          <div className="flex justify-between text-xs text-neutral-600 mb-2">
            <span>{formatTime(0)}</span>
            <span>{formatTime(departureTimeMax)}</span>
          </div>
          <input 
            type="range" 
            className="form-range" 
            id="departureTimeOutbound"
            min={0}
            max={1435}
            step={5}
            value={departureTimeMax}
            onChange={(e) => setDepartureTimeMax(parseInt(e.target.value))}
            style={{
              '--slider-progress': `${(departureTimeMax / 1435) * 100}%`
            }}
          />
        </div>

        {/* Departure Time Return */}
        <div>
          <label htmlFor="departureTimeReturn" className="form-label block text-sm font-semibold text-neutral-900 mb-3 uppercase tracking-wide">
            DEPARTURE TIME (RETURN):
          </label>
          <div className="flex justify-between text-xs text-neutral-600 mb-2">
            <span>{formatTime(0)}</span>
            <span>{formatTime(returnTimeMax)}</span>
          </div>
          <input 
            type="range" 
            className="form-range" 
            id="departureTimeReturn"
            min={0}
            max={1435}
            step={5}
            value={returnTimeMax}
            onChange={(e) => setReturnTimeMax(parseInt(e.target.value))}
            style={{
              '--slider-progress': `${(returnTimeMax / 1435) * 100}%`
            }}
          />
        </div>

        {/* Travel Time */}
        <div>
          <label htmlFor="travelTime" className="form-label block text-sm font-semibold text-neutral-900 mb-3 uppercase tracking-wide">
            TRAVEL TIME (WITH STOPS):
          </label>
          <div className="flex justify-between text-xs text-neutral-600 mb-2">
            <span>{formatDuration(0)}</span>
            <span>{formatDuration(durationMax)}</span>
          </div>
          <input 
            type="range" 
            className="form-range" 
            id="travelTime"
            min={0}
            max={availableFacets.durationMax || 1440}
            step={5}
            value={durationMax}
            onChange={(e) => setDurationMax(parseInt(e.target.value))}
            style={{
              '--slider-progress': `${(durationMax / (availableFacets.durationMax || 1440)) * 100}%`
            }}
          />
        </div>

        {/* Airlines */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">AIRLINES:</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={airlines.length === availableFacets.airlines?.length && availableFacets.airlines?.length > 0}
                onChange={() => handleSelectAll('airlines', availableFacets.airlines || [])}
                className="w-4 h-4 rounded border-2 border-neutral-300"
                style={{
                  accentColor: '#04154f',
                }}
              />
              <span className="text-xs text-neutral-600">all</span>
            </label>
          </div>
          <div className="space-y-2">
            {(availableFacets.airlines || []).map(airline => (
              <label key={airline} className="flex items-center space-x-2 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  className="w-4 h-4 rounded border-2 border-neutral-300"
                  style={{
                    accentColor: '#04154f',
                  }}
                />
                <span className="text-sm text-neutral-700">{airline}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Filters Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={customModalRef}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900">Custom Filters</h3>
              <button
                onClick={handleCustomCancel}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Flight Price */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                  FLIGHT PRICE (Max)
                </label>
                <input
                  type="number"
                  value={tempPriceMax}
                  onChange={(e) => setTempPriceMax(parseInt(e.target.value) || 0)}
                  min={availableFacets.priceMin || 0}
                  max={availableFacets.priceMax || 100000}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Enter max price"
                />
                <div className="text-xs text-neutral-600 mt-1">
                  Range: {formatCurrency(availableFacets.priceMin || 0)} - {formatCurrency(availableFacets.priceMax || 100000)}
                </div>
              </div>

              {/* Departure Time Outbound */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                  DEPARTURE TIME (OUTBOUND) (Max)
                </label>
                <input
                  type="time"
                  value={formatTime(tempDepartureTimeMax)}
                  onChange={(e) => {
                    const minutes = parseTimeToMinutes(e.target.value)
                    if (minutes >= 0 && minutes <= 1435) {
                      setTempDepartureTimeMax(minutes)
                    }
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="text-xs text-neutral-600 mt-1">
                  Range: 0:00 - 23:55
                </div>
              </div>

              {/* Departure Time Return */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                  DEPARTURE TIME (RETURN) (Max)
                </label>
                <input
                  type="time"
                  value={formatTime(tempReturnTimeMax)}
                  onChange={(e) => {
                    const minutes = parseTimeToMinutes(e.target.value)
                    if (minutes >= 0 && minutes <= 1435) {
                      setTempReturnTimeMax(minutes)
                    }
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="text-xs text-neutral-600 mt-1">
                  Range: 0:00 - 23:55
                </div>
              </div>

              {/* Travel Time */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                  TRAVEL TIME (WITH STOPS) (Max)
                </label>
                <input
                  type="text"
                  value={formatDuration(tempDurationMax)}
                  onChange={(e) => {
                    const minutes = parseDurationToMinutes(e.target.value)
                    if (minutes >= 0 && minutes <= (availableFacets.durationMax || 1440)) {
                      setTempDurationMax(minutes)
                    }
                  }}
                  placeholder="HH:mm (e.g., 14:30)"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="text-xs text-neutral-600 mt-1">
                  Range: 00:00 - {formatDuration(availableFacets.durationMax || 1440)}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCustomCancel}
                className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSave}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2A6DA0] via-[#5FB6D6] to-[#7ED7F4] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default FiltersSidebar

