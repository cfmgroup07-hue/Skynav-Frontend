function GuaranteePage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">sky-nav.net Guarantee</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Promise to You</h2>
            <p className="text-gray-700 leading-relaxed">
              At sky-nav.net, we stand behind every booking. Our guarantee ensures that you receive the best service, the most competitive prices, and complete peace of mind when you book with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Guarantee</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Best Price Guarantee</h3>
                <p className="text-gray-700">If you find the same flight for less elsewhere, we'll match it or refund the difference.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Secure Booking</h3>
                <p className="text-gray-700">Your personal and payment information is protected with industry-leading security measures.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-700">Our customer service team is available around the clock to assist you with any questions or issues.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Accurate Information</h3>
                <p className="text-gray-700">We ensure all flight details, prices, and availability are accurate and up-to-date.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Satisfaction Guarantee</h2>
            <p className="text-gray-700 leading-relaxed">
              Your satisfaction is our priority. If you're not completely satisfied with your booking experience, we'll work with you to make it right.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default GuaranteePage

