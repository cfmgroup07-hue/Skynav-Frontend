function AirlinePartners() {
  const airlines = [
    {
      name: 'AirAsia',
      code: 'AK',
      tagline: 'Smart-value fares and high-comfort routes across Asia.',
      microCopy: 'Perfect for quick getaways, family visits, and weekend hops.',
    },
    {
      name: 'Qatar Airways',
      code: 'QR',
      tagline: 'Premium international connections across the globe.',
      microCopy: 'Award-winning cabins, fine dining, and seamless long-haul journeys.',
    },
    {
      name: 'Emirates',
      code: 'EK',
      tagline: 'Reliable long-haul flights linking every major hub.',
      microCopy: 'Spacious seats, inflight entertainment, and smooth global connectivity.',
    },
  ]

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(10,25,41,0.12)] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            {/* Left: 3D globe / map illustration */}
            <div className="relative w-full lg:w-[35%] xl:w-[30%] min-h-[260px] md:min-h-[320px] lg:min-h-[360px] flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-primary-200 via-primary-100 to-primary-300 shadow-[0_40px_80px_rgba(10,25,41,0.35)]">
                {/* Inner glow */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/70 via-primary-100/60 to-primary-300/40 blur-[1px]" />

                {/* Latitude / longitude arcs */}
                <div className="absolute inset-8 rounded-full border border-white/30" />
                <div className="absolute inset-y-10 left-1/2 -translate-x-1/2 w-[2px] bg-white/30 rounded-full" />
                <div className="absolute inset-y-10 left-1/3 w-[1px] bg-white/25 rounded-full" />
                <div className="absolute inset-y-10 right-1/4 w-[1px] bg-white/25 rounded-full" />

                {/* Curved flight routes */}
                <div className="absolute inset-4">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full opacity-70"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 120 C 80 60, 120 60, 180 120"
                      className="stroke-white/70"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M40 80 C 90 40, 130 40, 170 80"
                      className="stroke-white/60"
                      strokeWidth="1.3"
                      fill="none"
                      strokeDasharray="3 4"
                    />
                  </svg>
                </div>

                {/* Flying airplane icons - 5 planes flying towards center and staying */}
                <style>{`
                  @keyframes flyLeftToCenter {
                    0% { transform: translate(-30%, 50%) rotate(0deg); opacity: 1; }
                    80% { transform: translate(50%, 50%) rotate(0deg); opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(0deg); opacity: 0; }
                  }
                  @keyframes flyTopToCenter {
                    0% { transform: translate(50%, -30%) rotate(90deg); opacity: 1; }
                    80% { transform: translate(50%, 50%) rotate(90deg); opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(90deg); opacity: 0; }
                  }
                  @keyframes flyLeftBottomToCenter {
                    0% { transform: translate(-30%, 80%) rotate(-45deg); opacity: 1; }
                    80% { transform: translate(50%, 50%) rotate(-45deg); opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(-45deg); opacity: 0; }
                  }
                  @keyframes flyRightToCenter {
                    0% { transform: translate(130%, 50%) rotate(180deg); opacity: 1; }
                    80% { transform: translate(50%, 50%) rotate(180deg); opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(180deg); opacity: 0; }
                  }
                  @keyframes flyRightTopToCenter {
                    0% { transform: translate(130%, -30%) rotate(135deg); opacity: 1; }
                    80% { transform: translate(50%, 50%) rotate(135deg); opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(135deg); opacity: 0; }
                  }
                  .fly-1 {
                    animation: flyLeftToCenter 6s linear infinite;
                  }
                  .fly-2 {
                    animation: flyTopToCenter 8s linear infinite;
                    animation-delay: 1s;
                  }
                  .fly-3 {
                    animation: flyLeftBottomToCenter 7s linear infinite;
                    animation-delay: 2s;
                  }
                  .fly-4 {
                    animation: flyRightToCenter 7s linear infinite;
                    animation-delay: 1.5s;
                  }
                  .fly-5 {
                    animation: flyRightTopToCenter 9s linear infinite;
                    animation-delay: 0.5s;
                  }
                `}</style>
                
                {/* Plane 1 - Gray - Left to Center */}
                <div className="absolute top-1/2 left-0 fly-1 flex items-center gap-1">
                  <span className="text-xs text-gray-500">✈︎</span>
                  <span className="h-px w-6 bg-gray-400/70 rounded-full" />
                </div>
                
                {/* Plane 2 - Gray - Top to Center */}
                <div className="absolute top-0 left-1/2 fly-2 flex items-center gap-1">
                  <span className="text-xs text-gray-500">✈︎</span>
                  <span className="h-px w-5 bg-gray-400/70 rounded-full" />
                </div>
                
                {/* Plane 3 - Gray - Left Bottom to Center */}
                <div className="absolute bottom-0 left-0 fly-3 flex items-center gap-1">
                  <span className="text-xs text-gray-600">✈︎</span>
                  <span className="h-px w-7 bg-gray-400/70 rounded-full" />
                </div>
                
                {/* Plane 4 - Gray - Right to Center */}
                <div className="absolute top-1/2 right-0 fly-4 flex items-center gap-1">
                  <span className="h-px w-6 bg-gray-400/70 rounded-full" />
                  <span className="text-xs text-gray-500">✈︎</span>
                </div>
                
                {/* Plane 5 - Gray - Right Top to Center */}
                <div className="absolute top-0 right-0 fly-5 flex items-center gap-1">
                  <span className="h-px w-5 bg-gray-400/70 rounded-full" />
                  <span className="text-xs text-gray-500">✈︎</span>
                </div>

                {/* Soft highlight */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-8 bg-primary-900/40 blur-2xl opacity-70" />
              </div>

              {/* Supporting text overlay */}
              <div className="absolute -bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 lg:-bottom-6 lg:-ml-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-900 text-white/90 text-[10px] sm:text-xs px-3 py-1 shadow-[0_14px_35px_rgba(10,25,41,0.7)]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live routes mapped across global skies</span>
                </div>
              </div>
            </div>

            {/* Right: Airline cards */}
            <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col justify-center">
              <div className="mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary-500 mb-2">
                  Airline partners
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-900 leading-tight">
                  Trusted carriers for seamless global journeys.
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-primary-700 max-w-xl">
                  Fly with handpicked airlines known for reliability, comfort, and premium onboard
                  experiences—where every route feels carefully planned.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 items-stretch">
                {airlines.map((airline) => (
                  <article
                    key={airline.name}
                    className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-[0_18px_40px_rgba(10,25,41,0.08)] px-7 py-5 sm:px-8 sm:py-5 md:px-9 h-full"
                  >
                    <div className="flex flex-col gap-5 h-full">
                      {/* Top row: circle + airline name */}
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-white via-primary-100 to-primary-300 border border-primary-100 shadow-[0_10px_25px_rgba(46,80,144,0.5)] flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-bold tracking-wide text-primary-900">
                              {airline.code}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-900 flex-1 min-w-0">
                          {airline.name}
                        </h3>
                      </div>

                      {/* Middle description text */}
                      <p className="text-sm text-primary-700 leading-relaxed">
                        {airline.tagline}
                      </p>

                      {/* Bottom: Fly with confidence + extra copy */}
                      <div className="pt-2 border-t border-primary-100">
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 mb-1">
                          Fly with confidence
                        </p>
                        <p className="text-[11px] sm:text-xs text-primary-600 leading-relaxed">
                          {airline.microCopy}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AirlinePartners

