import { useNavigate } from 'react-router-dom'

function HotelDealsSection() {
  const navigate = useNavigate()

  return (
    <section className="relative py-16 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=600&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/80 to-primary-900/75"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to stay for even less?</h2>
          <p className="text-xl mb-8 opacity-95">
            Search our best hotel deals, price drops, and exclusive offers.
          </p>
          <button
            onClick={() => navigate('/hotels/search')}
            className="bg-white text-primary-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all transform hover:scale-105 shadow-elevation-3"
          >
            Explore Hotel Deals
          </button>
        </div>
      </div>
    </section>
  )
}

export default HotelDealsSection

