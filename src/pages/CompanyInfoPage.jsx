function CompanyInfoPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Company Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net is a leading online travel platform specializing in flight bookings. We connect millions of travelers with airlines worldwide, offering competitive prices and exceptional service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Legal Name</h3>
                <p className="text-gray-600">sky-nav.net Inc.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Founded</h3>
                <p className="text-gray-600">2020</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Headquarters</h3>
                <p className="text-gray-600">New York, NY, United States</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Registration Number</h3>
                <p className="text-gray-600">123456789</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Reach</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Operating in 50+ countries</li>
              <li>Partnerships with 200+ airlines</li>
              <li>Serving millions of customers worldwide</li>
              <li>24/7 customer support in multiple languages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Awards & Recognition</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net has been recognized for excellence in customer service, innovation, and business growth by leading industry organizations.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfoPage

