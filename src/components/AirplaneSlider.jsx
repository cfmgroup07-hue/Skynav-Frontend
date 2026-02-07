import { useEffect, useState } from 'react'

const sliderImages = [
  'https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1517999349371-c43520457b23?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpcnBsYW5lfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1679830513873-5f9163fcc04a?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFpcnBsYW5lfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1519666336592-e225a99dcd2f?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFpcnBsYW5lfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1661963446458-274e8810cf59?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
  'https://plus.unsplash.com/premium_photo-1661962352925-9c7c81c9c637?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
  'https://plus.unsplash.com/premium_photo-1661963090269-dcb0d1929cda?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
  'https://plus.unsplash.com/premium_photo-1661499625487-2b69cb67d3dd?w=3840&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY3fHx8ZW58MHx8fHx8',
]

function AirplaneSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative pointer-events-none h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${sliderImages[currentIndex]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 z-10 pointer-events-auto">
        {sliderImages.map((_, dotIndex) => (
          <button
            type="button"
            key={dotIndex}
            onClick={() => setCurrentIndex(dotIndex)}
            className={`h-2 w-8 rounded-full transition-all ${
              dotIndex === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-white/20 text-[10px] uppercase tracking-[0.4em] text-white">
          Airlines
        </div>
      </div>
    </div>
  )
}

export default AirplaneSlider

