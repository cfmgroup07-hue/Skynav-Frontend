import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'

const sliderItems = [
  {
    type: 'image',
    src: '/images/1.jpg',
    title: 'Explore the World',
    subtitle: 'Discover amazing destinations',
  },
  {
    type: 'image',
    src: '/images/2.jpg',
    title: 'Adventure Awaits',
    subtitle: 'Book your dream vacation today',
  },
  {
    type: 'image',
    src: '/images/3.jpg',
    title: 'Travel in Style',
    subtitle: 'Premium flights at affordable prices',
  },
  {
    type: 'image',
    src: '/images/4.jpg',
    title: 'Unforgettable Journeys',
    subtitle: 'Create memories that last forever',
  },
]

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()
  const { t } = useRegionalSettings()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderItems.length)
        setIsTransitioning(false)
      }, 500) // Fade out duration
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleButtonClick = () => {
    navigate('/ibe')
  }

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 500)
    }
  }

  const currentItem = sliderItems[currentSlide]

  return (
    <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background Image - Only One Image at a Time */}
      <div className="absolute inset-0">
        <img
          key={currentSlide}
          src={currentItem.src}
          alt={currentItem.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Overlay Gradient - Darker on right, lighter on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
      </div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-2xl">
          <h1 
            key={`title-${currentSlide}`}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 text-left transition-opacity duration-500 leading-tight ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentItem.title}
          </h1>
          <p 
            key={`subtitle-${currentSlide}`}
            className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 text-left transition-opacity duration-500 delay-100 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentItem.subtitle}
          </p>
          
          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className={`bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-2xl delay-200 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {t('searchFlights')}
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + sliderItems.length) % sliderItems.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % sliderItems.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  )
}

export default HeroSlider

