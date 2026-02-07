import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HotelSearchBar from '../components/HotelSearchBar'
import HotelPromotionalCards from '../components/HotelPromotionalCards'
import PopularHotels from '../components/PopularHotels'
import HotelPartners from '../components/HotelPartners'
import HotelDealsSection from '../components/HotelDealsSection'
import HotelReviews from '../components/HotelReviews'

function HotelsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (searchParams) => {
    // Navigate to hotel search results page
    navigate('/hotels/search', { state: { searchParams } })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Booking Form */}
      <section className="relative w-full">
        <HotelSearchBar onSearch={handleSearch} />
      </section>

      {/* Promotional Cards */}
      <HotelPromotionalCards />

      {/* Hotel Partners */}
      <HotelPartners />

      {/* Popular Hotels */}
      <PopularHotels />

      {/* Deals Section */}
      <HotelDealsSection />

      {/* Hotel Reviews */}
      <HotelReviews />
    </div>
  )
}

export default HotelsPage

