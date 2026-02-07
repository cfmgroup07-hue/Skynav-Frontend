import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlane, FaArrowRight, FaStar, FaShieldAlt, FaHeadset, FaBolt } from 'react-icons/fa'

function HeroSection() {
  const navigate = useNavigate()

  // Random traveler images
  const travelerImages = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=33',
    'https://i.pravatar.cc/150?img=47',
    'https://i.pravatar.cc/150?img=51',
  ]

  const [displayedImages, setDisplayedImages] = useState([])

  useEffect(() => {
    const getRandomImages = () => {
      const shuffled = [...travelerImages].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 3)
    }
    setDisplayedImages(getRandomImages())
    const interval = setInterval(() => {
      setDisplayedImages(getRandomImages())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full min-h-screen lg:min-h-[600px] lg:h-[calc(100vh-80px)] flex items-center bg-[#f8fafc] overflow-hidden pt-28 lg:pt-0 pb-10 lg:pb-0">
      {/* Decorative Background Mesh */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] h-[300px] bg-blue-100/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Side - Content Area */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm transition-transform hover:scale-105 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600">Premium Flight Booking</span>
            </div>

            {/* Premium Typography Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Travel the World <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
                  with Confidence
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Explore thousands of destinations with the web's most reliable booking engine.
                Compare prices, track status, and fly with ease.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: <FaShieldAlt />, label: "Secure" },
                { icon: <FaHeadset />, label: "24/7 Support" },
                { icon: <FaBolt />, label: "Instant" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-white border border-slate-50 shadow-sm text-slate-600 font-semibold text-xs transition-all hover:border-primary-100">
                  <span className="text-primary-500 text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Refined CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => navigate('/ibe')}
                className="group px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary-600/20 flex items-center justify-center gap-3"
              >
                <span>Book Now</span>
                <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/ibe')}
                className="px-8 py-3.5 bg-white border border-slate-100 text-slate-700 hover:bg-slate-50 rounded-2xl font-bold text-base transition-all shadow-sm flex items-center justify-center gap-3"
              >
                Explore Deals
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {displayedImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Traveler"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:scale-110"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Trusted by <span className="text-slate-900">10k+</span> Travelers
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Area */}
          <div className="relative order-first lg:order-last group">
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
              {/* Main Visual Image */}
              <div className="relative overflow-hidden rounded-[32px] shadow-2xl bg-gradient-to-br from-white to-slate-50 p-1.5 border border-white">
                <img
                  src="/images/MainImage.png"
                  alt="Travel Experience"
                  className="w-full h-auto object-contain rounded-[28px]"
                  style={{ maxHeight: '450px' }}
                />
              </div>

              {/* Dynamic Floating Badges */}
              <div className="absolute -top-4 -right-4 lg:-right-6 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 border border-white animate-bounce-slow max-w-[150px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                    <FaPlane size={20} />
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Top Rated</div>
                    <div className="text-xs font-black text-slate-900 leading-tight">Elite Airlines</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-3 lg:-left-6 bg-primary-900 text-white rounded-2xl shadow-xl p-5 animate-bounce-slow-delay border border-primary-800">
                <div className="flex flex-col">
                  <div className="text-[8px] font-bold opacity-60 uppercase tracking-tighter">SkyNav Network</div>
                  <div className="text-lg font-black tracking-tighter">GLOBAL REACH</div>
                  <div className="text-[9px] font-medium opacity-80">140+ Countries</div>
                </div>
              </div>
            </div>

            {/* Decorative Blurs Behind Image */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-tr from-primary-500/10 to-blue-500/5 blur-[60px] rounded-full" />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow-delay {
          animation: bounce-slow 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
