function AirportsPage() {
  const majorAirports = [
    { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
    { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
    { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
    { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands' }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Airports</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Major Airports Worldwide</h2>
          <p className="text-gray-700 leading-relaxed">
            Search flights from and to major airports around the world. We connect you to over 500 airports globally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {majorAirports.map((airport, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg">{airport.code}</span>
                    <h3 className="text-xl font-semibold text-gray-800">{airport.name}</h3>
                  </div>
                  <p className="text-gray-600">{airport.city}, {airport.country}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Search Flights
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Can't find your airport?</p>
          <a href="/ibe" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
            Search all airports →
          </a>
        </div>
      </div>
    </div>
  )
}

export default AirportsPage

