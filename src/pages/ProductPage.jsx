function ProductPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flight Booking Platform</h2>
            <p className="text-gray-700 leading-relaxed">
              Our comprehensive flight booking platform allows you to search, compare, and book flights from hundreds of airlines worldwide. With real-time pricing and instant confirmations, booking your next trip has never been easier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Advanced search filters and sorting options</li>
              <li>Price comparison across multiple airlines</li>
              <li>Flexible date and destination search</li>
              <li>Mobile-responsive design</li>
              <li>Secure payment processing</li>
              <li>Booking management and modifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mobile App</h2>
            <p className="text-gray-700 leading-relaxed">
              Take sky-nav.net with you wherever you go. Our mobile app provides all the features of our web platform in a convenient, on-the-go format. Available for iOS and Android devices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Future Products</h2>
            <p className="text-gray-700 leading-relaxed">
              We're constantly working on new features and products to enhance your travel experience. Stay tuned for hotel bookings, car rentals, travel insurance, and more.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

