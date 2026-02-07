import { useNavigate } from 'react-router-dom'

const cities = [
  { name: 'New York', code: 'JFK' },
  { name: 'Los Angeles', code: 'LAX' },
  { name: 'Bangkok', code: 'BKK' },
  { name: 'London', code: 'LHR' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Barcelona', code: 'BCN' },
  { name: 'Paris', code: 'CDG' },
  { name: 'Madrid', code: 'MAD' },
  { name: 'Tel Aviv', code: 'TLV' },
  { name: 'Cairo', code: 'CAI' },
  { name: 'Dubai', code: 'DXB' },
  { name: 'Rome', code: 'FCO' },
  { name: 'New Delhi', code: 'DEL' },
  { name: 'Jeddah', code: 'JED' },
  { name: 'Riyadh', code: 'RUH' },
  { name: 'Milan', code: 'MXP' },
  { name: 'Budapest', code: 'BUD' },
  { name: 'Lisbon', code: 'LIS' },
  { name: 'Athens', code: 'ATH' },
  { name: 'Vienna', code: 'VIE' },
]

function FlightOffersSection() {
  const navigate = useNavigate()

  const handleCityClick = (city) => {
    navigate('/ibe')
  }

  return (
    <section className="py-12 bg-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Explore skynav.com flight offers</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Flights to cities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => handleCityClick(city)}
                className="text-left px-4 py-3 bg-white hover:bg-primary-50 rounded-lg transition-colors text-neutral-700 hover:text-primary-600 font-medium border border-gray-200"
              >
                Flights to {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlightOffersSection

