import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import PromotionalCards from '../components/PromotionalCards'
import PopularDestinations from '../components/PopularDestinations'
import DealsSection from '../components/DealsSection'
import PopularFlights from '../components/PopularFlights'
import ReviewsSection from '../components/ReviewsSection'
import AirlinePartners from '../components/AirlinePartners'
import ScenicAirTours from '../components/ScenicAirTours'

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Hero Section */}
      <section className="relative w-full">
        <HeroSection />
      </section>

      {/* Scenic Air Tours Section */}
      <ScenicAirTours />

      {/* Promotional Cards */}
      <PromotionalCards />

      {/* Airline Partners */}
      <AirlinePartners />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Deals Section */}
      <DealsSection />

      {/* Popular Flights */}
      <PopularFlights />

      {/* Reviews Section */}
      <ReviewsSection />
    </div>
  )
}

export default HomePage

