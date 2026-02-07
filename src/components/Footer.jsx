import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaApple, FaPlay } from 'react-icons/fa'
import skynavLogo from '../../images/Skynav.png'

function Footer() {
  return (
    <footer className="bg-white text-primary-800 py-12 mt-auto border-t border-primary-200">
      <div className="container mx-auto px-4">
        {/* Logo and Social Media */}
        <div className="mb-8 pb-8 border-b border-primary-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
                  <img
                    src={skynavLogo}
                    alt="Skynav logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-600 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-primary-600 hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-primary-600 hover:text-[#0077B5] transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#" className="text-primary-600 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                <FaFacebook className="text-2xl" />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors" aria-label="Download iOS app">
                <FaApple className="text-white text-xl" />
              </button>
              <button className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors" aria-label="Download Android app">
                <FaPlay className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-primary-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms-conditions" className="text-primary-700 hover:text-primary-900 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/terms-of-use" className="text-primary-700 hover:text-primary-900 transition-colors">Terms of Use</Link></li>
              <li><Link to="/privacy-policy" className="text-primary-700 hover:text-primary-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/accessibility" className="text-primary-700 hover:text-primary-900 transition-colors">Accessibility Statement</Link></li>
              <li><Link to="/media-room" className="text-primary-700 hover:text-primary-900 transition-colors">Media Room</Link></li>
              <li><Link to="/security" className="text-primary-700 hover:text-primary-900 transition-colors">Security</Link></li>
              <li><Link to="/legal-whistleblowing" className="text-primary-700 hover:text-primary-900 transition-colors">Legal and whistleblowing disclosures</Link></li>
              <li><Link to="/contact" className="text-primary-700 hover:text-primary-900 transition-colors">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-900 font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-primary-700 hover:text-primary-900 transition-colors">About</Link></li>
              <li><Link to="/product" className="text-primary-700 hover:text-primary-900 transition-colors">Product</Link></li>
              <li><Link to="/people" className="text-primary-700 hover:text-primary-900 transition-colors">People</Link></li>
              <li><Link to="/company-info" className="text-primary-700 hover:text-primary-900 transition-colors">Company info</Link></li>
              <li><Link to="/jobs" className="text-primary-700 hover:text-primary-900 transition-colors">Jobs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-900 font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-primary-700 hover:text-primary-900 transition-colors">Sign in / Register</Link></li>
              <li><Link to="/guarantee" className="text-primary-700 hover:text-primary-900 transition-colors"> sky-nav.net  Guarantee</Link></li>
              <li><Link to="/disruption-protection" className="text-primary-700 hover:text-primary-900 transition-colors">Disruption protection</Link></li>
              <li><Link to="/mobile-app" className="text-primary-700 hover:text-primary-900 transition-colors">Mobile app</Link></li>
              <li><Link to="/sitemap" className="text-primary-700 hover:text-primary-900 transition-colors">Site map</Link></li>
              <li><Link to="/faq" className="text-primary-700 hover:text-primary-900 transition-colors">Frequently asked questions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-900 font-semibold mb-4">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cheap-flights" className="text-primary-700 hover:text-primary-900 transition-colors">Cheap flights</Link></li>
              <li><Link to="/countries" className="text-primary-700 hover:text-primary-900 transition-colors">Countries</Link></li>
              <li><Link to="/airports" className="text-primary-700 hover:text-primary-900 transition-colors">Airports</Link></li>
              <li><Link to="/airlines" className="text-primary-700 hover:text-primary-900 transition-colors">Airlines</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-200 pt-8 text-center text-sm text-primary-700">
          <p>&copy; 2025 sky-nav.net | all rights reserved | designed by CFMGROUP</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

