import { FaPlane } from 'react-icons/fa'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'

function ScenicAirTours() {
  const { formatCurrency } = useRegionalSettings()

  // Base prices in AUD (Australian Dollars)
  const tours = [
    {
      id: 1,
      title: 'Hutt Lagoon Pink Lake Scenic & Ground Tour',
      priceAUD: 1750,
      details: 'inc GST / Per Person.',
      image: '/images/6.jpg',
    },
    {
      id: 2,
      title: 'Monkey Mia Dolphins Tours',
      priceAUD: 2400,
      details: 'inc GST / Per Person.',
      image: '/images/7.jpg',
    },
    {
      id: 3,
      title: 'Wave Rock Half Day',
      priceAUD: 950,
      details: 'inc GST / Per Person.',
      image: '/images/9.jpg',
    },
    {
      id: 4,
      title: 'Wave Rock & Pinnacles Day Tour',
      priceAUD: 1600,
      details: 'inc GST / Per Person.',
      image: '/images/8.jpg',
    },
  ]

  // Convert AUD to INR (base currency), then format
  // 1 AUD ≈ 55 INR
  const convertAUDToBase = (audAmount) => {
    return Math.round(audAmount * 55)
  }

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with horizontal lines */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-800 text-center whitespace-nowrap">
            Perth, WA Scenic Air Tours
          </h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="relative rounded-lg sm:rounded-xl overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
                  }}
                />
                {/* Book Now Button Overlay */}
                <button className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors duration-200 shadow-lg z-10">
                  <FaPlane className="text-xs" />
                  <span>Book Now</span>
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {tour.title}
                </h3>
                <div className="flex flex-col gap-1">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {formatCurrency(convertAUDToBase(tour.priceAUD))}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {tour.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row items-center justify-center gap-6 flex-wrap">
          <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base transition-colors duration-200">
            View More Perth Scenic Flights
          </button>
          <p className="text-sm sm:text-base text-slate-800">
            Customer-Favourite Perth Scenic Flights Tours You'll Love Too
          </p>
        </div>
      </div>
    </section>
  )
}

export default ScenicAirTours

