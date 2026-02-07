function MediaRoomPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Media Room</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Press Resources</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the sky-nav.net media room. Here you'll find press releases, company information, and media assets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Press Releases</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">December 2025 - New Partnership Announcement</h3>
                <p className="text-gray-600 text-sm">sky-nav.net partners with leading airlines to expand route network</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">November 2025 - Platform Launch</h3>
                <p className="text-gray-600 text-sm">sky-nav.net launches new booking platform with enhanced features</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For media inquiries, please contact us at: <a href="mailto:media@sky-nav.net" className="text-blue-600 hover:underline">media@sky-nav.net</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Brand Assets</h2>
            <p className="text-gray-700 leading-relaxed">
              Download our logo and brand guidelines for media use. Please contact us for high-resolution assets.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MediaRoomPage

