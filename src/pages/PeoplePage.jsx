function PeoplePage() {
  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Our People</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">Our Team</h2>
            <p className="text-primary-700 leading-relaxed">
              At sky-nav.net, our people are our greatest asset. We're a diverse team of passionate professionals dedicated to making travel accessible and enjoyable for everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">Leadership Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-primary-800">CEO</h3>
                <p className="text-primary-600">Leading our vision and strategic direction</p>
              </div>
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-primary-800">CTO</h3>
                <p className="text-primary-600">Driving innovation and technology excellence</p>
              </div>
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-primary-800">COO</h3>
                <p className="text-primary-600">Ensuring operational excellence</p>
              </div>
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-semibold text-primary-800">CFO</h3>
                <p className="text-primary-600">Managing financial strategy and growth</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">Our Culture</h2>
            <p className="text-primary-700 leading-relaxed">
              We foster a culture of innovation, collaboration, and continuous learning. Our team members are encouraged to think creatively, take initiative, and contribute to our shared success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">Join Our Team</h2>
            <p className="text-primary-700 leading-relaxed">
              Interested in joining sky-nav.net? Visit our <a href="/jobs" className="text-primary-600 hover:text-primary-700 hover:underline">Jobs</a> page to see current openings and learn more about working with us.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PeoplePage

