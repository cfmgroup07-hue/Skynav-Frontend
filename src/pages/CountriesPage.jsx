function CountriesPage() {
  const popularCountries = [
    { name: 'United States', flag: '🇺🇸', cities: 50 },
    { name: 'United Kingdom', flag: '🇬🇧', cities: 15 },
    { name: 'France', flag: '🇫🇷', cities: 12 },
    { name: 'Japan', flag: '🇯🇵', cities: 8 },
    { name: 'Australia', flag: '🇦🇺', cities: 10 },
    { name: 'Germany', flag: '🇩🇪', cities: 14 },
    { name: 'Italy', flag: '🇮🇹', cities: 11 },
    { name: 'Spain', flag: '🇪🇸', cities: 9 },
    { name: 'Canada', flag: '🇨🇦', cities: 12 },
    { name: 'India', flag: '🇮🇳', cities: 20 }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Countries</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Destinations Worldwide</h2>
          <p className="text-gray-700 leading-relaxed">
            Discover flights to countries around the globe. Whether you're planning a business trip or a vacation, we have you covered with flights to over 100 countries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCountries.map((country, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{country.name}</h3>
                  <p className="text-gray-600 text-sm">{country.cities} cities available</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Flights
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Looking for a specific country?</p>
          <a href="/ibe" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
            Search all destinations →
          </a>
        </div>
      </div>
    </div>
  )
}

export default CountriesPage

