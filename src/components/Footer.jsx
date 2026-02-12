import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import skynavLogo from '../../images/Skynav.png'

function Footer() {
  return (
    <footer className="bg-white text-primary-800 py-6 mt-auto border-t border-primary-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={skynavLogo} alt="Skynav logo" className="h-10 w-auto object-contain" />
            <span className="text-sm text-primary-700 hidden md:inline">© 2025 sky-nav.net</span>
            <Link to="/support" className="ml-4 text-sm text-primary-600 hover:underline">Support</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-600 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-primary-600 hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-primary-600 hover:text-[#0077B5] transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="#" className="text-primary-600 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
              <FaFacebook className="text-xl" />
            </a>
          </div>
        </div>

        <div className="pt-4 text-center text-sm text-primary-700 md:hidden">
          <p>© 2025 sky-nav.net</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

