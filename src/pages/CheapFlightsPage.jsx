function CheapFlightsPage() {
  const deals = [
    { from: 'New York', to: 'London', price: '$450', savings: 'Save 30%' },
    { from: 'Los Angeles', to: 'Tokyo', price: '$680', savings: 'Save 25%' },
    { from: 'Chicago', to: 'Paris', price: '$520', savings: 'Save 35%' },
    { from: 'Miami', to: 'Barcelona', price: '$480', savings: 'Save 28%' },
    { from: 'San Francisco', to: 'Sydney', price: '$750', savings: 'Save 20%' },
    { from: 'Boston', to: 'Rome', price: '$540', savings: 'Save 32%' }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cheap Flights</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find the Best Deals</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Discover amazing flight deals to destinations around the world. Our smart search engine compares prices from hundreds of airlines to find you the best deals.
          </p>
          <a href="/ibe" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Search Flights Now
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm">{deal.from}</p>
                  <p className="text-2xl font-bold text-gray-900">→ {deal.to}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">{deal.savings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-600">{deal.price}</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Tips for Finding Cheap Flights</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Book in advance - typically 2-3 months before travel</li>
            <li>Be flexible with your travel dates</li>
            <li>Consider nearby airports for better deals</li>
            <li>Sign up for price alerts</li>
            <li>Travel during off-peak seasons</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CheapFlightsPage

