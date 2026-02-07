import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { FaPlane, FaClock, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const popularRoutes = [
  { 
    from: 'London', 
    to: 'Istanbul', 
    fromCode: 'LHR', 
    toCode: 'IST', 
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&q=80',
    price: 45000,
    duration: '3h 45m',
    airlines: ['Turkish Airlines', 'British Airways'],
    stops: 0,
    bestTime: 'March - May, September - November',
    description: 'Istanbul, a city spanning two continents, offers a unique blend of European and Asian cultures.',
    attractions: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus Cruise'],
    weather: 'Mediterranean climate with mild winters and warm summers'
  },
  { 
    from: 'London', 
    to: 'Tirana', 
    fromCode: 'LHR', 
    toCode: 'TIA', 
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400&h=300&fit=crop&q=80',
    price: 32000,
    duration: '2h 55m',
    airlines: ['British Airways', 'Wizz Air'],
    stops: 0,
    bestTime: 'April - June, September - October',
    description: 'Tirana, Albania\'s vibrant capital, is known for its colorful buildings and rich history.',
    attractions: ['Skanderbeg Square', 'Bunk\'Art', 'Dajti Mountain', 'National History Museum'],
    weather: 'Mediterranean climate with hot summers and mild winters'
  },
  { 
    from: 'London', 
    to: 'Barcelona', 
    fromCode: 'LHR', 
    toCode: 'BCN', 
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop&q=80',
    price: 38000,
    duration: '2h 15m',
    airlines: ['Vueling', 'British Airways', 'Iberia'],
    stops: 0,
    bestTime: 'May - June, September - October',
    description: 'Barcelona, the capital of Catalonia, is famous for its art, architecture, and beautiful beaches.',
    attractions: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter'],
    weather: 'Mediterranean climate with mild winters and warm summers'
  },
  { 
    from: 'London', 
    to: 'Jeddah', 
    fromCode: 'LHR', 
    toCode: 'JED', 
    image: 'https://images.unsplash.com/photo-1455587734955-c10ec63771d2?w=400&h=300&fit=crop&q=80',
    price: 52000,
    duration: '6h 20m',
    airlines: ['Saudia', 'British Airways'],
    stops: 0,
    bestTime: 'November - March',
    description: 'Jeddah, the gateway to Mecca, is a vibrant port city with beautiful corniche and historic old town.',
    attractions: ['Al-Balad', 'King Fahd\'s Fountain', 'Red Sea Mall', 'Fakieh Aquarium'],
    weather: 'Desert climate with hot summers and mild winters'
  },
  { 
    from: 'London', 
    to: 'Tel Aviv', 
    fromCode: 'LHR', 
    toCode: 'TLV', 
    image: 'https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=400&h=300&fit=crop&q=80',
    price: 48000,
    duration: '5h 10m',
    airlines: ['El Al', 'British Airways'],
    stops: 0,
    bestTime: 'March - May, September - November',
    description: 'Tel Aviv, Israel\'s cultural capital, offers beautiful beaches, vibrant nightlife, and rich history.',
    attractions: ['Old Jaffa', 'Tel Aviv Beaches', 'Carmel Market', 'Tel Aviv Museum'],
    weather: 'Mediterranean climate with hot summers and mild winters'
  },
  { 
    from: 'Istanbul', 
    to: 'London', 
    fromCode: 'IST', 
    toCode: 'LHR', 
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=80',
    price: 45000,
    duration: '3h 45m',
    airlines: ['Turkish Airlines', 'British Airways'],
    stops: 0,
    bestTime: 'March - May, September - November',
    description: 'London, the capital of England, is a global city with rich history and modern attractions.',
    attractions: ['Big Ben', 'Tower Bridge', 'British Museum', 'London Eye'],
    weather: 'Temperate oceanic climate with mild temperatures year-round'
  },
  { 
    from: 'Tel Aviv', 
    to: 'London', 
    fromCode: 'TLV', 
    toCode: 'LHR', 
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&q=80',
    price: 48000,
    duration: '5h 10m',
    airlines: ['El Al', 'British Airways'],
    stops: 0,
    bestTime: 'March - May, September - November',
    description: 'London offers world-class museums, theaters, and diverse culinary scene.',
    attractions: ['Westminster Abbey', 'Buckingham Palace', 'Hyde Park', 'Covent Garden'],
    weather: 'Temperate oceanic climate'
  },
  { 
    from: 'London', 
    to: 'Prague', 
    fromCode: 'LHR', 
    toCode: 'PRG', 
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop&q=80',
    price: 28000,
    duration: '2h 5m',
    airlines: ['Czech Airlines', 'British Airways'],
    stops: 0,
    bestTime: 'April - May, September - October',
    description: 'Prague, the City of a Hundred Spires, is famous for its stunning architecture and rich history.',
    attractions: ['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Astronomical Clock'],
    weather: 'Oceanic climate with warm summers and cold winters'
  },
  { 
    from: 'Tirana', 
    to: 'London', 
    fromCode: 'TIA', 
    toCode: 'LHR', 
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop&q=80',
    price: 32000,
    duration: '2h 55m',
    airlines: ['British Airways', 'Wizz Air'],
    stops: 0,
    bestTime: 'April - June, September - October',
    description: 'London is a perfect destination for culture, shopping, and entertainment.',
    attractions: ['Tower of London', 'St. Paul\'s Cathedral', 'Shakespeare\'s Globe', 'Camden Market'],
    weather: 'Temperate oceanic climate'
  },
  { 
    from: 'London', 
    to: 'Paris', 
    fromCode: 'LHR', 
    toCode: 'CDG', 
    image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=400&h=300&fit=crop&q=80',
    price: 35000,
    duration: '1h 25m',
    airlines: ['Air France', 'British Airways', 'EasyJet'],
    stops: 0,
    bestTime: 'April - June, September - October',
    description: 'Paris, the City of Light, is renowned for its art, fashion, and iconic landmarks.',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
    weather: 'Oceanic climate with mild temperatures'
  },
  { 
    from: 'London', 
    to: 'Athens', 
    fromCode: 'LHR', 
    toCode: 'ATH', 
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=300&fit=crop&q=80',
    price: 42000,
    duration: '3h 30m',
    airlines: ['Aegean Airlines', 'British Airways'],
    stops: 0,
    bestTime: 'April - June, September - October',
    description: 'Athens, the cradle of Western civilization, offers ancient history and modern culture.',
    attractions: ['Acropolis', 'Parthenon', 'Plaka', 'National Archaeological Museum'],
    weather: 'Mediterranean climate with hot summers'
  },
  { 
    from: 'London', 
    to: 'Bucharest', 
    fromCode: 'LHR', 
    toCode: 'OTP', 
    image: 'https://images.unsplash.com/photo-1477426801460-798eb33e3f2c?w=400&h=300&fit=crop&q=80&auto=format',
    price: 30000,
    duration: '3h 10m',
    airlines: ['TAROM', 'British Airways'],
    stops: 0,
    bestTime: 'May - September',
    description: 'Bucharest, Romania\'s capital, is known for its grand architecture and vibrant nightlife.',
    attractions: ['Palace of Parliament', 'Old Town', 'Herăstrău Park', 'Village Museum'],
    weather: 'Continental climate with hot summers and cold winters'
  },
]

function PopularFlights() {
  const navigate = useNavigate()
  const { formatCurrency } = useRegionalSettings()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Minimum swipe distance
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrev()
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % popularRoutes.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + popularRoutes.length) % popularRoutes.length)
  }

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const handleRouteClick = () => {
    navigate('/ibe')
  }

  // Get visible cards (3 cards on desktop, 1 on mobile)
  const getVisibleCards = useCallback(() => {
    const cards = []
    if (isMobile) {
      // On mobile, show only current card
      cards.push({
        route: popularRoutes[currentIndex],
        position: 0, // center/main card
        index: currentIndex,
      })
    } else {
      // On desktop, show 3 cards
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + popularRoutes.length) % popularRoutes.length
        cards.push({
          route: popularRoutes[index],
          position: i, // -1: behind, 0: center, 1: front
          index,
        })
      }
    }
    return cards
  }, [isMobile, currentIndex])

  const visibleCards = getVisibleCards()

  const renderRouteCard = (route, idx, position = 0, extraClasses = '') => {
    // 3D positioning based on position (-1: behind left, 0: center, 1: behind right)
    const getCardStyles = () => {
      // Mobile: main card with bounce animation
      if (isMobile) {
        // Main card - fully visible with bounce from left
        return {
          transform: 'translateX(0) scale(1) translateZ(0)',
          zIndex: 10,
          opacity: 1,
          animation: 'bounceInLeft 0.6s ease-out',
        }
      }
      
      // Desktop: 3D effect
      if (position === -1) {
        // Left card - behind, smaller, shifted left
        return {
          transform: 'translateX(-80px) scale(0.8) translateZ(-100px)',
          zIndex: 1,
          opacity: 0.6,
        }
      } else if (position === 0) {
        // Center card - normal size, highest z-index, fully visible
        return {
          transform: 'translateX(0) scale(1) translateZ(0)',
          zIndex: 10,
          opacity: 1,
        }
      } else {
        // Right card - behind, smaller, shifted right
        return {
          transform: 'translateX(80px) scale(0.8) translateZ(-100px)',
          zIndex: 1,
          opacity: 0.6,
        }
      }
    }

    const cardStyles = getCardStyles()

    return (
      <div
        key={`${route.from}-${route.to}-${idx}`}
        onClick={handleRouteClick}
        className={`group relative bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 cursor-pointer ${extraClasses} ${
          position === 0 ? 'ring-4 ring-primary-200 ring-opacity-50' : ''
        }`}
        style={{
          transform: cardStyles.transform,
          zIndex: cardStyles.zIndex,
          opacity: cardStyles.opacity,
          pointerEvents: (position === 0 || isMobile) ? 'auto' : 'none',
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          animation: cardStyles.animation || 'none',
        }}
        role="button"
        tabIndex={position === 0 ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleRouteClick()
          }
        }}
      >
      {/* Image Section with Overlay */}
      <div className="relative h-40 md:h-44 overflow-hidden">
        <img
          src={route.image}
          alt={route.to}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop&q=80'
          }}
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Price Badge - Enhanced */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-2xl border border-white/20 transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
            {formatCurrency(route.price)}
          </span>
        </div>

        {/* Duration Badge - Enhanced */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-500 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl border border-primary-400/30">
          <FaClock className="text-white text-xs" />
          <span className="text-white text-xs font-bold">{route.duration}</span>
        </div>

        {/* Airline Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
            <p className="text-white text-xs font-medium truncate">{route.airlines[0]}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 bg-gradient-to-b from-white to-primary-50/30">
        {/* Route Info */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="text-xs text-primary-500 uppercase tracking-wider mb-1 font-semibold">{route.fromCode}</div>
              <div className="text-lg md:text-xl font-extrabold text-primary-900">{route.from}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 rounded-full p-2.5 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <FaPlane className="text-white text-sm transform rotate-90" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="text-xs text-primary-500 uppercase tracking-wider mb-1 font-semibold">{route.toCode}</div>
              <div className="text-lg md:text-xl font-extrabold text-primary-900">{route.to}</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between pt-4 border-t border-primary-200">
          <div className="flex items-center gap-2 text-sm text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-semibold">Direct Flight</span>
          </div>
          <div className="flex items-center gap-1 text-primary-700 font-bold group-hover:gap-2 transition-all bg-primary-100 px-4 py-1.5 rounded-full group-hover:bg-primary-200">
            <span className="text-sm">View Details</span>
            <FaArrowRight className="text-xs" />
          </div>
        </div>
      </div>

      {/* Enhanced Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
      
      {/* Glow Effect on Center Card */}
      {position === 0 && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
      )}
    </div>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-sky-50 via-primary-50 to-sky-50">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-2">
            Popular Flights
          </h2>
          <p className="text-primary-700 text-base md:text-lg max-w-2xl mx-auto">
            Discover the most sought-after routes and book your next adventure with the best deals on skynav.com
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative">

          {/* 3D Carousel - Mobile: 1 card, Desktop: 3 cards */}
          <div
            ref={sliderRef}
            className="relative h-[380px] md:h-[450px] flex items-center justify-center overflow-visible md:overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile View - Single Card with Bounce Animation */}
            <div className="md:hidden relative w-full h-full flex items-center justify-center px-4">
              {visibleCards.map(({ route, position, index }) =>
                renderRouteCard(route, index, position, 'w-full max-w-sm')
              )}
            </div>

            {/* Desktop View - 3D Carousel with 3 Cards */}
            <div className="hidden md:flex relative w-full h-full items-center justify-center" style={{ perspective: '1000px' }}>
              {visibleCards.map(({ route, position, index }) =>
                renderRouteCard(route, index, position, 'absolute w-full max-w-md')
              )}
            </div>
          </div>

          {/* Attractive Slider Indicator - Both Mobile and Desktop */}
          <div className="flex justify-center mt-4 md:mt-6 mb-4 md:mb-0">
            <div className="flex flex-col items-center gap-3">
              {/* Animated Swipe Icon */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-primary-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="w-px h-4 bg-primary-300 mx-1"></div>
                  <div className="flex items-center gap-1 text-primary-700">
                    <span className="text-xs font-semibold">{currentIndex + 1}</span>
                    <span className="text-xs text-primary-500">/</span>
                    <span className="text-xs text-primary-500">{popularRoutes.length}</span>
                  </div>
                </div>
                {/* Swipe Arrows Animation - Mobile Only */}
                <div className="md:hidden absolute -left-8 top-1/2 -translate-y-1/2 animate-bounce-x">
                  <FaChevronLeft className="text-primary-400 text-sm" />
                </div>
                <div className="md:hidden absolute -right-8 top-1/2 -translate-y-1/2 animate-bounce-x-reverse">
                  <FaChevronRight className="text-primary-400 text-sm" />
                </div>
              </div>
              <p className="text-xs text-primary-600 font-medium md:hidden">Swipe to explore more flights</p>
            </div>
          </div>

          {/* View All Button - Enhanced */}
          <div className="text-center mt-4 md:mt-6">
            <button
              onClick={() => navigate('/ibe')}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base overflow-hidden"
            >
              <span className="relative z-10">View All Popular Flights</span>
              <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
          }
          50% {
            transform: translateX(10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-5px);
          }
        }
        @keyframes bounce-x-reverse {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s ease-in-out infinite;
        }
        .animate-bounce-x-reverse {
          animation: bounce-x-reverse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default PopularFlights

