function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Use govern your access to and use of the sky-nav.net website and services. By using our platform, you agree to comply with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Registration</h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Activities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Using the service for any unlawful purpose</li>
              <li>Attempting to gain unauthorized access to the system</li>
              <li>Transmitting any viruses or malicious code</li>
              <li>Interfering with the service's operation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on sky-nav.net, including text, graphics, logos, and software, is the property of sky-nav.net and protected by copyright laws.
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

export default TermsOfUsePage

