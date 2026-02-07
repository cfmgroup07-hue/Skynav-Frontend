function SiteMapPage() {
  const siteMap = {
    'Main Pages': [
      { name: 'Home', path: '/' },
      { name: 'Book Flights', path: '/ibe' },
      { name: 'Search Flights', path: '/search' },
      { name: 'Sign In', path: '/login' },
      { name: 'Register', path: '/signup' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Company Info', path: '/company-info' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Jobs', path: '/jobs' },
      { name: 'Media Room', path: '/media-room' }
    ],
    'Legal': [
      { name: 'Terms & Conditions', path: '/terms-conditions' },
      { name: 'Terms of Use', path: '/terms-of-use' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Security', path: '/security' },
      { name: 'Legal Disclosures', path: '/legal-whistleblowing' }
    ],
    'Support': [
      { name: 'FAQ', path: '/faq' },
      { name: 'Accessibility', path: '/accessibility' },
      { name: 'Disruption Protection', path: '/disruption-protection' },
      { name: 'Guarantee', path: '/guarantee' }
    ],
    'Discover': [
      { name: 'Cheap Flights', path: '/cheap-flights' },
      { name: 'Countries', path: '/countries' },
      { name: 'Airports', path: '/airports' },
      { name: 'Airlines', path: '/airlines' }
    ],
    'Products': [
      { name: 'Product Overview', path: '/product' },
      { name: 'Mobile App', path: '/mobile-app' },
      { name: 'People', path: '/people' }
    ]
  }

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Site Map</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(siteMap).map(([category, links]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.path} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SiteMapPage

