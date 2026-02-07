import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'

const hotelDestinations = [
  {
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&q=80',
    hotels: 1250,
    avgPrice: 8500,
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
    hotels: 890,
    avgPrice: 12000,
  },
  {
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80',
    hotels: 2100,
    avgPrice: 18000,
  },
  {
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&q=80',
    hotels: 3400,
    avgPrice: 11000,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&q=80',
    hotels: 1560,
    avgPrice: 14000,
  },
  {
    city: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80',
    hotels: 1890,
    avgPrice: 13000,
  },
]

function HotelDestinations() {
  const navigate = useNavigate()
  const { formatCurrency } = useRegionalSettings()

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-4">
            Popular Hotel Destinations
          </h2>
          <p className="text-lg md:text-xl text-primary-700 max-w-2xl mx-auto">
            Explore amazing destinations and find the perfect hotel for your stay
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {hotelDestinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => navigate('/hotels/search')}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{destination.city}</h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-white to-primary-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-primary-600 font-medium">{destination.hotels} Hotels</p>
                    <p className="text-lg font-bold text-primary-900">From {formatCurrency(destination.avgPrice)}/night</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all group-hover:gap-3">
                  <span>Explore Hotels</span>
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HotelDestinations

