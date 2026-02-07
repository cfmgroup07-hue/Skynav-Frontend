function DisruptionProtectionPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Disruption Protection</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">Protection for Your Journey</h2>
            <p className="text-primary-700 leading-relaxed">
              Travel disruptions can happen. Our Disruption Protection program ensures you're covered when unexpected events affect your travel plans.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">What's Covered</h2>
            <ul className="list-disc list-inside text-primary-700 space-y-2 ml-4">
              <li>Flight cancellations and delays</li>
              <li>Weather-related disruptions</li>
              <li>Airline schedule changes</li>
              <li>Medical emergencies</li>
              <li>Natural disasters</li>
              <li>Government travel restrictions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">How It Works</h2>
            <p className="text-primary-700 leading-relaxed mb-4">
              When you book with Disruption Protection:
            </p>
            <ol className="list-decimal list-inside text-primary-700 space-y-2 ml-4">
              <li>You'll receive automatic notifications about any changes to your flight</li>
              <li>We'll help you find alternative flights at no extra cost</li>
              <li>You'll get priority rebooking assistance</li>
              <li>Refunds or credits are processed quickly if needed</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">24/7 Support</h2>
            <p className="text-primary-700 leading-relaxed">
              Our dedicated disruption support team is available 24/7 to help you navigate any travel disruptions and get you to your destination as smoothly as possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DisruptionProtectionPage

