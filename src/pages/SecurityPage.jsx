function SecurityPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Security</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Security Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              At sky-nav.net, we take security seriously. We implement industry-standard security measures to protect your personal and financial information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment processing with PCI DSS compliance</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure data storage with encryption at rest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Protect your account by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Using a strong, unique password</li>
              <li>Enabling two-factor authentication when available</li>
              <li>Never sharing your login credentials</li>
              <li>Logging out after each session</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reporting Security Issues</h2>
            <p className="text-gray-700 leading-relaxed">
              If you discover a security vulnerability, please report it to: <a href="mailto:security@sky-nav.net" className="text-blue-600 hover:underline">security@sky-nav.net</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SecurityPage

