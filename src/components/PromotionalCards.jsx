import { FaPlane, FaCalendarAlt, FaTag } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function PromotionalCards() {
  return (
    <section className="py-12 bg-sky-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-primary-700">
            <Link to="/" className="hover:text-primary-600 underline">
              Home
            </Link>
            <span className="text-primary-400">&gt;</span>
            <span className="text-primary-900">Flights</span>
          </nav>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Explore Flight Deals */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaPlane className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Explore the best flight deals from anywhere, to everywhere, then book with no fees
            </p>
          </div>

          {/* Card 2: Compare Flight Deals */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaCalendarAlt className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Compare flight deals from over 1000 providers, and choose the cheapest, fastest or lowest-emission tickets
            </p>
          </div>

          {/* Card 3: Find Cheapest Flights */}
          <div className="rounded-lg border border-primary-200 p-6 hover:shadow-elevation-2 transition-all duration-300 bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <div className="mb-4">
              <FaTag className="text-4xl text-primary-900" />
            </div>
            <p className="text-primary-800 leading-relaxed">
              Find the cheapest month – or even day - to fly, and set up Price Alerts to book when the price is right
            </p>
          </div>
        </div>
      </div>
    </section>
  ) 
}

export default PromotionalCards

