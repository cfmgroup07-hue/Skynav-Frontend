function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using sky-nav.net, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on sky-nav.net for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for any commercial purpose</li>
              <li>You may not remove any copyright or other proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Booking Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              All flight bookings are subject to airline terms and conditions. Prices are subject to change until payment is confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cancellation and Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Cancellation policies vary by airline and fare type. Please review your booking confirmation for specific terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>
        </div>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Last updated: December 2025
        </p>
      </div>
    </div>
  )
}

export default TermsConditionsPage

