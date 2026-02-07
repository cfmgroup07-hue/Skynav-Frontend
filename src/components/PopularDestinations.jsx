import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'

const REGIONAL_DESTINATIONS = {
  IN: {
    origin: { city: 'Mumbai', code: 'BOM' },
    title: {
      'en-GB': 'Popular destinations from Mumbai',
      'en-US': 'Hottest getaways from Mumbai',
      hi: 'मुंबई से लोकप्रिय गंतव्य',
    },
    description: {
      'en-GB': 'Handpicked world cities that Indians love to visit.',
      'en-US': 'Curated global escapes just for you.',
      hi: 'विश्व भर के वह स्थान जिन्हें भारतीय पसंद करते हैं।',
    },
    destinations: [
      {
        to: 'New York',
        code: 'JFK',
        price: 81237,
        image: 'https://www.fodors.com/wp-content/uploads/2025/06/2_Shutterstock_2475434705_Andres-Garcia-Martin.jpg',
      },
      {
        to: 'Bangkok',
        code: 'BKK',
        price: 17206,
        image: '/images/Bangkok.jpg',
      },
      {
        to: 'Dubai',
        code: 'DXB',
        price: 25480,
        image: '/images/Dubai.jpg',
      },
      {
        to: 'London',
        code: 'LHR',
        price: 65120,
        image: '/images/London.jpg',
      },
      {
        to: 'Sydney',
        code: 'SYD',
        price: 92015,
        image: '/images/Sydney.jpg',
      },
    ],
  },
  GB: {
    origin: { city: 'London', code: 'LHR' },
    title: {
      'en-GB': 'Trending escapes from London',
      'en-US': 'Trending escapes from London',
      hi: 'लंदन से लोकप्रिय यात्रा स्थल',
    },
    description: {
      'en-GB': 'European charm and warm sunspots within easy reach.',
      'en-US': 'Quick escapes that Londoners love.',
      hi: 'यूरोपीय आकर्षण और हल्की धूप के स्थल आपके लिए।',
    },
    destinations: [
      {
        to: 'Lisbon',
        code: 'LIS',
        price: 45267,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Reykjavík',
        code: 'KEF',
        price: 57241,
        image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Dubai',
        code: 'DXB',
        price: 48910,
        image: '/images/Dubai.jpg',
      },
      {
        to: 'New York',
        code: 'JFK',
        price: 67980,
        image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Cape Town',
        code: 'CPT',
        price: 59800,
        image: 'https://t3.ftcdn.net/jpg/02/92/78/36/360_F_292783691_qYXzNyikvZmW95yP9WTtuCzaZy8mEK8v.jpg',
      },
    ],
  },
  US: {
    origin: { city: 'New York', code: 'JFK' },
    title: {
      'en-GB': 'Dream escapes from New York',
      'en-US': 'Dream escapes from New York',
      hi: 'न्यूयॉर्क से लोकप्रिय गंतव्य',
    },
    description: {
      'en-GB': 'Sun-drenched coasts and rooftop vibes.',
      'en-US': 'Iconic getaways across the Americas.',
      hi: 'धूप से भरे समुद्र तट और शहर के नज़ारे।',
    },
    destinations: [
      {
        to: 'Los Angeles',
        code: 'LAX',
        price: 41200,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Cancún',
        code: 'CUN',
        price: 32900,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Toronto',
        code: 'YYZ',
        price: 38550,
        image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Lima',
        code: 'LIM',
        price: 36240,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Reykjavík',
        code: 'KEF',
        price: 57880,
        image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=3840&q=80',
      },
    ],
  },
  AE: {
    origin: { city: 'Dubai', code: 'DXB' },
    title: {
      'en-GB': 'Sun-drenched escapes from Dubai',
      'en-US': 'Sun-drenched escapes from Dubai',
      hi: 'दुबई से लोकप्रिय गंतव्य',
    },
    description: {
      'en-GB': 'Ultra-modern hubs with desert and sea nearby.',
      'en-US': 'Gateway to the Middle East and beyond.',
      hi: 'मॉडर्न शहर और रेगिस्तान के पास।',
    },
    destinations: [
      {
        to: 'Malé',
        code: 'MLE',
        price: 29860,
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Mumbai',
        code: 'BOM',
        price: 24500,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Istanbul',
        code: 'IST',
        price: 26990,
        image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Paris',
        code: 'CDG',
        price: 48220,
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Seoul',
        code: 'ICN',
        price: 51260,
        image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f91474?auto=format&fit=crop&w=3840&q=80',
      },
    ],
  },
  default: {
    origin: { city: 'New Delhi', code: 'DEL' },
    title: {
      'en-GB': 'Popular destinations from New Delhi',
      'en-US': 'Popular destinations from New Delhi',
      hi: 'नई दिल्ली से लोकप्रिय गंतव्य',
    },
    description: {
      'en-GB': 'Wide-open air routes curated just for you.',
      'en-US': 'Comfortable departures heading worldwide.',
      hi: 'विश्व भर की यात्रा के लिए तैयार मार्ग।',
    },
    destinations: [
      {
        to: 'Singapore',
        code: 'SIN',
        price: 39750,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'Kathmandu',
        code: 'KTM',
        price: 15300,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3840&q=80',
      },
      {
        to: 'London',
        code: 'LHR',
        price: 66190,
        image: '/images/London.jpg',
      },
      {
        to: 'Dubai',
        code: 'DXB',
        price: 24800,
        image: '/images/Dubai.jpg',
      },
      {
        to: 'Sydney',
        code: 'SYD',
        price: 94500,
        image: '/images/Sydney.jpg',
      },
    ],
  },
}

function PopularDestinations() {
  const navigate = useNavigate()
  const { settings, formatCurrency } = useRegionalSettings()

  const [carouselIndex, setCarouselIndex] = useState(0)
  const [selectedDestination, setSelectedDestination] = useState(null)

  // Ensure we have valid settings with defaults
  const safeSettings = settings || { country: 'India', language: 'en-GB' }

  // Map full country names to codes used in REGIONAL_DESTINATIONS
  const getCountryCode = (name) => {
    const map = {
      'India': 'IN',
      'United Kingdom': 'GB',
      'United States': 'US',
      'UAE': 'AE',
      'United Arab Emirates': 'AE'
    }
    return map[name] || 'default'
  }

  const countryCode = getCountryCode(safeSettings.country)
  const currentContent = REGIONAL_DESTINATIONS[countryCode] || REGIONAL_DESTINATIONS.default

  // Handle language safely
  const currentLang = safeSettings.language || 'en-GB'
  const title = currentContent.title[currentLang] || currentContent.title['en-GB'] || currentContent.title['en-US']
  const description = currentContent.description[currentLang] || currentContent.description['en-GB'] || currentContent.description['en-US']

  const originCity = currentContent.origin?.city || 'New Delhi'
  const originCode = currentContent.origin?.code || 'DEL'
  const destinations = currentContent.destinations || []
  const countryDisplay = safeSettings.country || 'India'

  const goToPrevious = () => {
    setCarouselIndex((prev) => (prev - 1 + destinations.length) % destinations.length)
  }

  const goToNext = () => {
    setCarouselIndex((prev) => (prev + 1) % destinations.length)
  }

  const handleDestinationClick = (dest) => {
    setSelectedDestination({ ...dest, origin: originCity, originCode })
  }

  const handleCloseDetails = () => {
    setSelectedDestination(null)
  }

  const handleSearchFlights = () => {
    navigate('/ibe')
  }

  useEffect(() => {
    if (destinations.length <= 1) return
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % destinations.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [destinations.length])

  return (
    <section className="py-12 bg-sky-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-3 leading-tight">
            Popular destinations
          </h2>
          <p className="text-lg md:text-xl text-primary-800/80 font-medium italic">
            Wide-open air routes curated just for you.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              {(() => {
                const heroImage = destinations[carouselIndex].image
                  .replace(/w=\\d+/, 'w=3840')
                  .replace(/h=\\d+/, 'h=2160')
                const fallbackImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3840&q=80'
                return (
                  <img
                    src={heroImage}
                    alt={destinations[carouselIndex].to}
                    className="w-full h-96 object-cover"
                    loading="eager"
                    onError={(event) => {
                      if (event.target.src !== fallbackImage) {
                        event.target.src = fallbackImage
                      }
                    }}
                  />
                )
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-1 text-left">
                <p className="text-xs tracking-[0.7em] text-white/70 uppercase">
                  {originCity}
                </p>
                <p className="text-xs tracking-[0.7em] text-white/70 uppercase">
                  Popular destinations
                </p>
                <h3 className="text-5xl font-semibold text-white leading-tight drop-shadow">
                  {destinations[carouselIndex].to}
                </h3>
                <p className="text-xl text-white/80 font-medium">
                  From {formatCurrency(destinations[carouselIndex].price)} · {destinations[carouselIndex].code}
                </p>
                <div className="text-sm text-white/70 flex flex-col gap-1">
                  <span>{destinations[(carouselIndex + 1) % destinations.length].to}</span>
                  <span>{destinations[(carouselIndex + 2) % destinations.length].to}</span>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleDestinationClick(destinations[carouselIndex])}
                    className="inline-flex items-center px-8 py-3 bg-white text-primary-900 font-semibold rounded-full shadow-lg transition hover:scale-[1.02]"
                  >
                    Search flights
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${idx === carouselIndex ? 'bg-primary-900' : 'bg-primary-300'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleCloseDetails}>
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-primary-100 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.to}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {selectedDestination.to}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {selectedDestination.origin} ({selectedDestination.originCode}) → {selectedDestination.to} ({selectedDestination.code})
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Price and Flight Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 mb-1">Starting from</div>
                    <div className="text-2xl font-bold text-primary-600">{formatCurrency(selectedDestination.price)}</div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 mb-1">Airport Code</div>
                    <div className="text-xl font-semibold text-primary-900">{selectedDestination.code}</div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 mb-1">Origin</div>
                    <div className="text-sm font-semibold text-primary-900">
                      {selectedDestination.origin} ({selectedDestination.originCode})
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">About {selectedDestination.to}</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Discover amazing flights from {selectedDestination.origin} to {selectedDestination.to}.
                    Book your journey today and explore this beautiful destination starting from {formatCurrency(selectedDestination.price)}.
                  </p>
                </div>

                {/* Flight Route Info */}
                <div className="bg-primary-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Flight Route</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-900">{selectedDestination.originCode}</div>
                      <div className="text-sm text-primary-700">{selectedDestination.origin}</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="border-t-2 border-dashed border-primary-300"></div>
                      <div className="text-center text-xs text-primary-600 mt-1">Direct Flight</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-900">{selectedDestination.code}</div>
                      <div className="text-sm text-primary-700">{selectedDestination.to}</div>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="pt-4 border-t border-primary-200">
                  <button
                    onClick={handleSearchFlights}
                    className="w-full bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Search Flights to {selectedDestination.to}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PopularDestinations

