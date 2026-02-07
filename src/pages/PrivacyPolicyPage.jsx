function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Payment information for booking transactions</li>
              <li>Travel preferences and booking history</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use the information we collect to process bookings, send confirmations, improve our services, and communicate with you about your travel plans.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. Contact us to exercise these rights.
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

export default PrivacyPolicyPage

