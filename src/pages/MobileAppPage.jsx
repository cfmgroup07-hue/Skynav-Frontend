function MobileAppPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mobile App</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Take sky-nav.net With You</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mobile app brings the full power of sky-nav.net to your smartphone. Book flights, manage reservations, and access exclusive mobile-only deals, all from the palm of your hand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">App Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Search and book flights on the go</li>
              <li>Real-time flight status updates</li>
              <li>Mobile boarding passes</li>
              <li>Push notifications for flight changes</li>
              <li>Exclusive mobile app discounts</li>
              <li>Easy booking management</li>
              <li>Secure payment options</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Download Now</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-1.41-.59-2.73-1.15-3.93-1.97C3.24 15.28 1 13.26 1 10.9c0-2.9 2.25-4.65 4.6-4.65 1.15 0 2.1.4 2.85 1.05.5.42.85.95 1.15 1.5.3-.55.65-1.08 1.15-1.5.75-.65 1.7-1.05 2.85-1.05C15.75 6.25 18 8 18 10.9c0 2.36-2.24 4.38-4.76 5.37-1.2.82-2.52 1.38-3.93 1.97-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08.4-2.02-.3-3.99-1.55-3.99-3.99 0-1.78 1.4-3.2 3.2-3.2.6 0 1.15.15 1.6.4.45.25.8.6 1.1 1 .3.4.5.85.65 1.3.15-.45.35-.9.65-1.3.3-.4.65-.75 1.1-1 .45-.25 1-.4 1.6-.4 1.8 0 3.2 1.42 3.2 3.2 0 2.44-1.97 3.69-3.99 3.99z"/>
                </svg>
                Download for iOS
              </button>
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download for Android
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">System Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">iOS</h3>
                <p className="text-gray-600">Requires iOS 13.0 or later</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Android</h3>
                <p className="text-gray-600">Requires Android 8.0 or later</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MobileAppPage

