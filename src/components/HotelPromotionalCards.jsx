import { FaBed, FaCalendarAlt, FaTag, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function HotelPromotionalCards() {
  return (
    <section className="py-12 bg-gradient-to-br from-white via-primary-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-primary-700">
            <Link to="/" className="hover:text-primary-600 underline">
              Home
            </Link>
            <span className="text-primary-400">&gt;</span>
            <span className="text-primary-900">Hotels</span>
          </nav>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Explore Hotel Deals */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaBed className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Explore the best hotel deals from anywhere, to everywhere, then book with no fees
            </p>
          </div>

          {/* Card 2: Compare Hotel Prices */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaMapMarkerAlt className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Compare hotel prices from over 1000+ properties, and choose the best location, amenities, or lowest prices
            </p>
          </div>

          {/* Card 3: Find Best Hotel Deals */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaTag className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Find the cheapest dates to book, and set up Price Alerts to book when the price is right for your perfect stay
            </p>
          </div>
        </div>
      </div>
    </section>
  ) 
}

export default HotelPromotionalCards

