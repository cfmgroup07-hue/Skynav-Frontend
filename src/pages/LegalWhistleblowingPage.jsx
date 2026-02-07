function LegalWhistleblowingPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal and Whistleblowing Disclosures</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legal Information</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net operates in compliance with all applicable laws and regulations. Our legal framework ensures transparency and accountability in all business operations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Whistleblowing Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to maintaining the highest standards of ethical conduct. Our whistleblowing policy provides a safe and confidential channel for reporting concerns about:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Illegal activities or violations of law</li>
              <li>Fraud or financial misconduct</li>
              <li>Health and safety violations</li>
              <li>Discrimination or harassment</li>
              <li>Environmental violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Report</h2>
            <p className="text-gray-700 leading-relaxed">
              Reports can be made confidentially via email to: <a href="mailto:whistleblowing@sky-nav.net" className="text-blue-600 hover:underline">whistleblowing@sky-nav.net</a>
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              All reports will be investigated promptly and confidentially. We protect whistleblowers from retaliation.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LegalWhistleblowingPage

