import { useState, useEffect } from 'react'

const flightImages = [
  // Airplane images - 4K quality
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=3840&h=2160&fit=crop&q=100&auto=format', // Airplane in sky
  'https://images.unsplash.com/photo-1520250497591-112f2f130a9f?w=3840&h=2160&fit=crop&q=100&auto=format', // Airplane taking off
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=3840&h=2160&fit=crop&q=100&auto=format', // Airplane flying
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=3840&h=2160&fit=crop&q=100&auto=format', // Airplane window view
  // Airport images - 4K quality
  'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=3840&h=2160&fit=crop&q=100&auto=format', // Airport terminal
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=3840&h=2160&fit=crop&q=100&auto=format', // Airport runway
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=3840&h=2160&fit=crop&q=100&auto=format', // Airport at night
  'https://images.unsplash.com/photo-1569629743817-70d3db5ef514?w=3840&h=2160&fit=crop&q=100&auto=format', // Modern airport
]

function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % flightImages.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {flightImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
      ))}
    </>
  )
}

export default HeroBackground

