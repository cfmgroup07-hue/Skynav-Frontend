import { FaApple, FaPlay } from 'react-icons/fa'

function MobileAppSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Get more out of skynav.com with our mobile app
              </h2>
              <p className="text-neutral-600 mb-6">
                Download the skynav.com mobile app for one-touch access to your next travel adventure. With the skynav.com mobile app you'll get access to hidden features and special offers.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-neutral-700">Download boarding passes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-neutral-700">Get exclusive offers and prices</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-neutral-700">One click bookings</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-neutral-700">Trip notifications</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                  <FaApple className="text-xl" />
                  Download on the App Store
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                  <FaPlay className="text-xl" />
                  Get it on Google Play
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-elevation-3">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=400&fit=crop&q=80"
                    alt="Mobile app"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <p className="text-center text-neutral-600 font-semibold mb-4">Scan to download</p>
                <div className="w-32 h-32 bg-white border-2 border-neutral-300 rounded-lg mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://skynav.com/app"
                    alt="QR Code"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 
export default MobileAppSection

