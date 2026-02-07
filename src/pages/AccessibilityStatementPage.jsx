function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessibility Standards</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards. Our efforts include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Providing alternative text for images</li>
              <li>Ensuring keyboard navigation support</li>
              <li>Maintaining sufficient color contrast</li>
              <li>Supporting screen reader compatibility</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
            <p className="text-gray-700 leading-relaxed">
              We welcome your feedback on the accessibility of sky-nav.net. If you encounter accessibility barriers, please contact us at accessibility@sky-nav.net
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

export default AccessibilityStatementPage

