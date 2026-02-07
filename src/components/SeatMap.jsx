import { useState } from 'react'

const SeatMap = ({ flight, onSeatSelect, selectedSeats = [] }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null)

  // Sample seat configuration for Boeing 767-300 (2-4-2 layout)
  const seatRows = Array.from({ length: 30 }, (_, i) => i + 1)
  const seatColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  
  // Sample seat data - in real app, this would come from API
  const getSeatStatus = (row, col) => {
    // Premium seats (rows 1-3)
    if (row <= 3) {
      if (col === 'A' || col === 'H') return 'premium'
      return 'occupied'
    }
    // Exit rows (row 10, 20)
    if (row === 10 || row === 20) {
      if (col === 'A' || col === 'B') return 'exit-row'
      if (col === 'E' || col === 'F') return 'available'
      return 'occupied'
    }
    // Wing area (rows 15-18)
    if (row >= 15 && row <= 18) {
      if (col === 'C' || col === 'D') return 'wing'
      if (col === 'E' || col === 'F') return 'available'
      return Math.random() > 0.5 ? 'occupied' : 'available'
    }
    // Handicap accessible (row 5, seats C, D)
    if (row === 5 && (col === 'C' || col === 'D')) {
      return 'handicap'
    }
    // Lavatory (row 30, seat H)
    if (row === 30 && col === 'H') {
      return 'lavatory'
    }
    // Blocked seats (row 1, seat A)
    if (row === 1 && col === 'A') {
      return 'blocked'
    }
    // Random availability
    return Math.random() > 0.4 ? 'available' : 'occupied'
  }

  const getSeatReview = (row, col) => {
    // Some seats have reviews
    if (row === 3 && col === 'A') return 'good'
    if (row === 3 && (col === 'D' || col === 'E')) return 'poor'
    if (row === 4 && col === 'A') return 'good'
    if (row === 4 && (col === 'B' || col === 'C' || col === 'D')) return 'poor'
    if (row === 5 && col === 'A') return 'good'
    if (row === 5 && (col === 'B' || col === 'C' || col === 'D')) return 'poor'
    if (row === 7 && col === 'A') return 'good'
    if (row === 8 && col === 'A') return 'good'
    return null
  }

  const handleSeatClick = (row, col) => {
    const seatId = `${row}${col}`
    const status = getSeatStatus(row, col)
    
    if (status === 'available' || status === 'premium' || status === 'handicap' || status === 'exit-row' || status === 'wing') {
      onSeatSelect(seatId, row, col, status)
    }
  }

  const isSeatSelected = (row, col) => {
    return selectedSeats.includes(`${row}${col}`)
  }

  const renderSeat = (row, col) => {
    const status = getSeatStatus(row, col)
    const review = getSeatReview(row, col)
    const seatId = `${row}${col}`
    const isSelected = isSeatSelected(row, col)
    const isHovered = hoveredSeat === seatId

    const seatClasses = `
      w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-semibold cursor-pointer transition-all relative
      ${status === 'available' ? 'bg-white border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50' : ''}
      ${status === 'premium' ? 'bg-white border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50' : ''}
      ${status === 'handicap' ? 'bg-white border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50' : ''}
      ${status === 'exit-row' ? 'bg-white border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50' : ''}
      ${status === 'wing' ? 'bg-white border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50' : ''}
      ${status === 'occupied' ? 'bg-neutral-800 border-neutral-800 text-white cursor-not-allowed' : ''}
      ${status === 'blocked' ? 'bg-white border-neutral-300 cursor-not-allowed opacity-50' : ''}
      ${status === 'lavatory' ? 'bg-neutral-800 border-neutral-800 text-white cursor-not-allowed' : ''}
      ${isSelected ? 'bg-[#0A1A2F] border-[#0A1A2F] text-white' : ''}
      ${isHovered && status !== 'occupied' && status !== 'blocked' && status !== 'lavatory' ? 'scale-110' : ''}
    `

    return (
      <div
        key={seatId}
        className={seatClasses}
        onClick={() => handleSeatClick(row, col)}
        onMouseEnter={() => setHoveredSeat(seatId)}
        onMouseLeave={() => setHoveredSeat(null)}
        title={`Seat ${seatId} - ${status}`}
      >
        {status === 'premium' && <span className="text-[8px] font-bold">P</span>}
        {status === 'handicap' && <span className="text-[10px]">♿</span>}
        {status === 'blocked' && <span className="text-red-600 font-bold">✕</span>}
        {status === 'lavatory' && <span className="text-white font-bold">L</span>}
        {status === 'occupied' && <span className="text-white">●</span>}
        {review === 'good' && status !== 'occupied' && status !== 'blocked' && status !== 'lavatory' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
        {review === 'poor' && status !== 'occupied' && status !== 'blocked' && status !== 'lavatory' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
        )}
        {review === 'mixed' && status !== 'occupied' && status !== 'blocked' && status !== 'lavatory' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Flight Info and Legends */}
        <div className="lg:col-span-1 space-y-6">
          {/* Flight Details */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Flight Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Flight:</span>
                <span className="font-semibold text-neutral-900">{flight?.airlines?.[0] || 'AA'} {flight?.id || '1201'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Date:</span>
                <span className="font-semibold text-neutral-900">
                  {flight?.segments?.[0]?.dep_time ? new Date(flight.segments[0].dep_time).toLocaleDateString() : '11-26-2019'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Destination:</span>
                <span className="font-semibold text-neutral-900">{flight?.segments?.[0]?.to || 'Istanbul'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Departure:</span>
                <span className="font-semibold text-neutral-900">
                  {flight?.segments?.[0]?.dep_time ? new Date(flight.segments[0].dep_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '03:19 AM'}
                </span>
              </div>
            </div>
          </div>

          {/* Plane Details */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Plane Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Aircraft Type:</span>
                <span className="font-semibold text-neutral-900">Boeing 767-300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Capacity:</span>
                <span className="font-semibold text-neutral-900">240</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Seats Reserved:</span>
                <span className="font-semibold text-neutral-900">120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Seats Available:</span>
                <span className="font-semibold text-green-600">120</span>
              </div>
            </div>
          </div>

          {/* Seats Legend */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Seats Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center"></div>
                <span className="text-neutral-700">Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center">
                  <span className="text-[8px] font-bold">P</span>
                </div>
                <span className="text-neutral-700">Premium Only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center">
                  <span className="text-[10px]">♿</span>
                </div>
                <span className="text-neutral-700">Handicap Accessible</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-800 bg-neutral-800 flex items-center justify-center">
                  <span className="text-white text-xs">●</span>
                </div>
                <span className="text-neutral-700">Occupied</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center opacity-50">
                  <span className="text-red-600 font-bold text-xs">✕</span>
                </div>
                <span className="text-neutral-700">Blocked</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-800 bg-neutral-800 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">L</span>
                </div>
                <span className="text-neutral-700">Lavatory</span>
              </div>
            </div>
          </div>

          {/* Location Legend */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Location Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-neutral-700">Exit Row</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-300 rounded"></div>
                <span className="text-neutral-700">Upper Deck</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-neutral-400 rounded"></div>
                <span className="text-neutral-700">Wing</span>
              </div>
            </div>
          </div>

          {/* SeatGuru Legend */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">SeatGuru Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-neutral-700">Good Review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
                </div>
                <span className="text-neutral-700">Poor Review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-neutral-300 bg-white flex items-center justify-center relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <span className="text-neutral-700">Mixed Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Seat Map */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-neutral-900">Boeing 767-300</h2>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-6 overflow-x-auto">
            {/* Seat Map */}
            <div className="space-y-2">
              {/* Column Headers */}
              <div className="flex gap-2 mb-4">
                <div className="w-10"></div>
                {seatColumns.map(col => (
                  <div key={col} className="w-10 text-center text-sm font-semibold text-neutral-700">
                    {col}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {seatRows.map(row => (
                <div key={row} className="flex items-center gap-2">
                  <div className="w-10 text-sm font-semibold text-neutral-700 text-right pr-2">
                    {row}
                  </div>
                  <div className="flex gap-2">
                    {/* Left side (A, B) */}
                    <div className="flex gap-1">
                      {seatColumns.slice(0, 2).map(col => (
                        <div key={`${row}${col}`} className="relative">
                          {renderSeat(row, col)}
                        </div>
                      ))}
                    </div>
                    
                    {/* Aisle */}
                    <div className="w-4"></div>
                    
                    {/* Middle (C, D, E, F) */}
                    <div className="flex gap-1">
                      {seatColumns.slice(2, 6).map(col => (
                        <div key={`${row}${col}`} className="relative">
                          {renderSeat(row, col)}
                        </div>
                      ))}
                    </div>
                    
                    {/* Aisle */}
                    <div className="w-4"></div>
                    
                    {/* Right side (G, H) */}
                    <div className="flex gap-1">
                      {seatColumns.slice(6, 8).map(col => (
                        <div key={`${row}${col}`} className="relative">
                          {renderSeat(row, col)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <div className="mt-4 bg-neutral-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Selected Seats</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <span key={seat} className="px-3 py-1 bg-[#0A1A2F] text-white rounded-lg text-sm font-semibold">
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SeatMap

