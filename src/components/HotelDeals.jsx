import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { FaBed, FaArrowRight, FaTag } from 'react-icons/fa'

const hotelDeals = [
  {
    id: 1,
    title: 'Summer Special',
    discount: '30% OFF',
    location: 'Beach Resorts',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
    description: 'Book now and save on beachfront properties',
  },
  {
    id: 2,
    title: 'City Break',
    discount: '25% OFF',
    location: 'City Hotels',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80',
    description: 'Perfect for weekend getaways',
  },
  {
    id: 3,
    title: 'Luxury Escape',
    discount: '40% OFF',
    location: '5-Star Hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
    description: 'Indulge in luxury at unbeatable prices',
  },
]

function HotelDeals() {
  const navigate = useNavigate()
  const { formatCurrency } = useRegionalSettings()

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-4">
            Special Hotel Deals
          </h2>
          <p className="text-lg md:text-xl text-primary-700 max-w-2xl mx-auto">
            Don't miss out on our limited-time offers for amazing hotels worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {hotelDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => navigate('/hotels/search')}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/80 to-primary-900/75"></div>
                
                <div className="absolute top-4 left-4">
                  <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <FaTag />
                    <span>{deal.discount}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{deal.title}</h3>
                  <p className="text-white/90 text-sm">{deal.location}</p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-white to-primary-50/30">
                <p className="text-primary-700 mb-4">{deal.description}</p>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all group-hover:gap-3">
                  <span>View Deal</span>
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

export default HotelDeals

