import { FaBed, FaStar } from 'react-icons/fa'

const hotelPartners = [
  { name: 'Marriott', logo: 'M' },
  { name: 'Hilton', logo: 'H' },
  { name: 'Hyatt', logo: 'H' },
  { name: 'InterContinental', logo: 'I' },
  { name: 'Radisson', logo: 'R' },
  { name: 'Sheraton', logo: 'S' },
]

function HotelPartners() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-4">
            Trusted Hotel Partners
          </h2>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            We partner with the world's leading hotel chains to bring you the best accommodation options
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {hotelPartners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-primary-300 hover:-translate-y-1 flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">{partner.logo}</span>
              </div>
              <h3 className="text-primary-900 font-semibold text-center text-sm md:text-base">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HotelPartners

