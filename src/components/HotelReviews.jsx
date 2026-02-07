import { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

function HotelReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      id: 1,
      name: 'Emma Thompson',
      location: 'London, UK',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=12',
      review: 'Amazing hotel experience! Found the perfect accommodation for my trip. The booking process was smooth and the hotel exceeded expectations. Highly recommend!',
      date: '2 weeks ago',
      verified: true,
    },
    {
      id: 2,
      name: 'James Wilson',
      location: 'New York, USA',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=33',
      review: 'Great platform with competitive prices. Booked a luxury hotel and saved over 30% compared to other sites. The interface is user-friendly too.',
      date: '1 month ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Sophie Martin',
      location: 'Paris, France',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=47',
      review: 'Outstanding service! The hotel search is comprehensive and the booking confirmation was instant. Will definitely use again for my next trip.',
      date: '3 weeks ago',
      verified: true,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        } transition-colors duration-200`}
      />
    ))
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-white via-primary-50/30 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-4">
            <FaStar className="text-yellow-500" />
            <span className="text-sm font-semibold text-primary-700">Guest Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600">
              What Our Guests Say
            </span>
          </h2>
          <p className="text-lg md:text-xl text-primary-700 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have booked their perfect stay with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                index === currentIndex ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
              }`}
            >
              <div className="absolute top-4 right-4 text-primary-100 group-hover:text-primary-200 transition-colors">
                <FaQuoteLeft className="text-4xl" />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              <p className="text-primary-700 leading-relaxed mb-6 relative z-10">
                {review.review}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-primary-100">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                    onError={(e) => {
                      e.target.src = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
                    }}
                  />
                  {review.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white">
                      <FaStar className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-primary-900">{review.name}</h4>
                    {review.verified && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-600">{review.location}</p>
                  <p className="text-xs text-primary-500 mt-1">{review.date}</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/30 group-hover:to-primary-100/20 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-primary-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-extrabold text-primary-900">4.8</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {renderStars(5)}
                  </div>
                  <span className="text-sm text-primary-600 mt-1">Out of 5.0</span>
                </div>
              </div>
              <p className="text-lg text-primary-700 font-medium">
                Based on <span className="font-bold text-primary-900">10,000+</span> guest reviews
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">98%</div>
                <p className="text-sm text-primary-600">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">10K+</div>
                <p className="text-sm text-primary-600">Happy Guests</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">24/7</div>
                <p className="text-sm text-primary-600">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HotelReviews

