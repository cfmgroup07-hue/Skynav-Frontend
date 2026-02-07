function JobsPage() {
  const jobOpenings = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time'
    }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Careers at sky-nav.net</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Team</h2>
            <p className="text-gray-700 leading-relaxed">
              We're always looking for talented individuals to join our growing team. If you're passionate about travel and technology, we'd love to hear from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Open Positions</h2>
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                  <div className="flex gap-4 text-gray-600 text-sm">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    Apply Now →
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Work With Us</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Competitive salary and benefits package</li>
              <li>Flexible work arrangements</li>
              <li>Professional development opportunities</li>
              <li>Collaborative and inclusive work environment</li>
              <li>Travel perks and discounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Apply</h2>
            <p className="text-gray-700 leading-relaxed">
              To apply for any position, please send your resume and cover letter to: <a href="mailto:careers@sky-nav.net" className="text-blue-600 hover:underline">careers@sky-nav.net</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default JobsPage

