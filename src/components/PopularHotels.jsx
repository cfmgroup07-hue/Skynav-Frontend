import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { FaBed, FaStar, FaArrowRight, FaWifi, FaSwimmingPool, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa'

const popularHotels = [
  {
    id: 1,
    name: 'Grand Luxury Hotel',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
    price: 8500,
    rating: 4.8,
    reviews: 1245,
    amenities: ['WiFi', 'Pool', 'Restaurant'],
    description: 'Luxurious hotel in the heart of Paris with stunning city views',
  },
  {
    id: 2,
    name: 'Beachfront Resort',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
    price: 12000,
    rating: 4.9,
    reviews: 892,
    amenities: ['WiFi', 'Pool', 'Beach Access'],
    description: 'Stunning beachfront resort with private beach access',
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80',
    price: 15000,
    rating: 4.7,
    reviews: 567,
    amenities: ['WiFi', 'Restaurant', 'Spa'],
    description: 'Cozy mountain lodge with breathtaking alpine views',
  },
  {
    id: 4,
    name: 'City Center Hotel',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&q=80',
    price: 11000,
    rating: 4.6,
    reviews: 2341,
    amenities: ['WiFi', 'Gym', 'Restaurant'],
    description: 'Modern hotel in the heart of Manhattan',
  },
  {
    id: 5,
    name: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f130a9f?w=800&h=600&fit=crop&q=80',
    price: 18000,
    rating: 4.9,
    reviews: 1456,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    description: 'Luxurious desert resort with world-class amenities',
  },
  {
    id: 6,
    name: 'Historic Boutique Hotel',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80',
    price: 9500,
    rating: 4.8,
    reviews: 678,
    amenities: ['WiFi', 'Restaurant'],
    description: 'Charming historic hotel near famous landmarks',
  },
]

function PopularHotels() {
  const navigate = useNavigate()
  const { formatCurrency } = useRegionalSettings()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    setCurrentIndex((prev) => (prev + 1) % popularHotels.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + popularHotels.length) % popularHotels.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const handleHotelClick = () => {
    navigate('/hotels/search')
  }

  const getVisibleCards = () => {
    const cards = []
    if (isMobile) {
      cards.push({
        hotel: popularHotels[currentIndex],
        position: 0,
        index: currentIndex,
      })
    } else {
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + popularHotels.length) % popularHotels.length
        cards.push({
          hotel: popularHotels[index],
          position: i,
          index,
        })
      }
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  const renderHotelCard = (hotel, idx, position = 0, extraClasses = '') => {
    const getCardStyles = () => {
      if (isMobile) {
        return {
          transform: 'translateX(0) scale(1) translateZ(0)',
          zIndex: 10,
          opacity: 1,
          animation: 'bounceInLeft 0.6s ease-out',
        }
      }

      if (position === -1) {
        return {
          transform: 'translateX(-80px) scale(0.8) translateZ(-100px)',
          zIndex: 1,
          opacity: 0.6,
        }
      } else if (position === 0) {
        return {
          transform: 'translateX(0) scale(1) translateZ(0)',
          zIndex: 10,
          opacity: 1,
        }
      } else {
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
        key={`${hotel.name}-${idx}`}
        onClick={handleHotelClick}
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
      >
        {/* Image Section */}
        <div className="relative h-40 md:h-44 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white rounded-xl px-4 py-2.5 shadow-2xl border-2 border-primary-200">
            <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
              {formatCurrency(hotel.price)}/night
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl border border-primary-400/30">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-white text-xs font-bold">{hotel.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-5 bg-gradient-to-b from-white to-primary-50/30">
          <h3 className="text-lg md:text-xl font-extrabold text-primary-900 mb-2">{hotel.name}</h3>
          <div className="flex items-center gap-2 text-primary-600 mb-3">
            <FaMapMarkerAlt className="text-xs" />
            <span className="text-sm font-medium">{hotel.location}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-full">
                {amenity === 'WiFi' && <FaWifi className="text-primary-600 text-xs" />}
                {amenity === 'Pool' && <FaSwimmingPool className="text-primary-600 text-xs" />}
                {amenity === 'Restaurant' && <FaUtensils className="text-primary-600 text-xs" />}
                <span className="text-xs text-primary-700 font-medium">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Reviews and View Details */}
          <div className="flex items-center justify-between pt-3 border-t border-primary-200">
            <div className="text-xs text-primary-600">
              <span className="font-semibold">{hotel.reviews}</span> reviews
            </div>
            <div className="flex items-center gap-1 text-primary-700 font-bold group-hover:gap-2 transition-all bg-primary-100 px-4 py-1.5 rounded-full group-hover:bg-primary-200">
              <span className="text-sm">View Details</span>
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>

        {position === 0 && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
        )}
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-white via-primary-50/20 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-2">
            Popular Hotels
          </h2>
          <p className="text-primary-700 text-base md:text-lg max-w-2xl mx-auto">
            Discover the most sought-after hotels and book your perfect stay with the best deals on skynav.com
          </p>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="relative h-[380px] md:h-[450px] flex items-center justify-center overflow-visible md:overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="md:hidden relative w-full h-full flex items-center justify-center px-4">
              {visibleCards.map(({ hotel, position, index }) =>
                renderHotelCard(hotel, index, position, 'w-full max-w-sm')
              )}
            </div>

            <div className="hidden md:flex relative w-full h-full items-center justify-center" style={{ perspective: '1000px' }}>
              {visibleCards.map(({ hotel, position, index }) =>
                renderHotelCard(hotel, index, position, 'absolute w-full max-w-md')
              )}
            </div>
          </div>

          {/* Slider Indicator */}
          <div className="flex justify-center mt-4 md:mt-6 mb-4 md:mb-0">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-xl border-2 border-primary-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="w-px h-4 bg-primary-300 mx-1"></div>
                  <div className="flex items-center gap-1 text-primary-700">
                    <span className="text-xs font-semibold">{currentIndex + 1}</span>
                    <span className="text-xs text-primary-500">/</span>
                    <span className="text-xs text-primary-500">{popularHotels.length}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-primary-600 font-medium md:hidden">Swipe to explore more hotels</p>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-4 md:mt-6">
            <button
              onClick={() => navigate('/hotels/search')}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base overflow-hidden"
            >
              <span className="relative z-10">View All Popular Hotels</span>
              <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
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
      `}</style>
    </section>
  )
}

export default PopularHotels

