function AirlinesPage() {
  const airlines = [
    { name: 'American Airlines', code: 'AA', logo: '✈️' },
    { name: 'Delta Air Lines', code: 'DL', logo: '✈️' },
    { name: 'United Airlines', code: 'UA', logo: '✈️' },
    { name: 'British Airways', code: 'BA', logo: '✈️' },
    { name: 'Lufthansa', code: 'LH', logo: '✈️' },
    { name: 'Air France', code: 'AF', logo: '✈️' },
    { name: 'Emirates', code: 'EK', logo: '✈️' },
    { name: 'Qatar Airways', code: 'QR', logo: '✈️' },
    { name: 'Singapore Airlines', code: 'SQ', logo: '✈️' },
    { name: 'Japan Airlines', code: 'JL', logo: '✈️' },
    { name: 'Air Canada', code: 'AC', logo: '✈️' },
    { name: 'Qantas', code: 'QF', logo: '✈️' }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Airlines</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Partner Airlines</h2>
          <p className="text-gray-700 leading-relaxed">
            We partner with over 200 airlines worldwide to bring you the best flight options and competitive prices. Compare flights from all major carriers in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlines.map((airline, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{airline.logo}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{airline.name}</h3>
                  <p className="text-gray-600 text-sm">Code: {airline.code}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Flights
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Book with Multiple Airlines?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Compare prices across different carriers</li>
            <li>Find the best flight times and routes</li>
            <li>Access to exclusive deals and promotions</li>
            <li>Flexible booking options</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AirlinesPage

