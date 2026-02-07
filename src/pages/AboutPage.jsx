function AboutPage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              sky-nav.net is dedicated to making air travel accessible, affordable, and enjoyable for everyone. We connect travelers with the best flight deals and provide exceptional service throughout their journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a vision to revolutionize the travel booking experience, sky-nav.net combines cutting-edge technology with personalized customer service. We partner with leading airlines worldwide to offer you the best options for your travel needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Compare flights from hundreds of airlines</li>
              <li>Provide real-time pricing and availability</li>
              <li>Offer 24/7 customer support</li>
              <li>Ensure secure and seamless booking experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-700 leading-relaxed">
              Integrity, transparency, and customer satisfaction are at the heart of everything we do. We believe in building lasting relationships with our customers through trust and exceptional service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

