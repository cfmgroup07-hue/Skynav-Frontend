import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useRegionalSettings } from '../contexts/RegionalSettingsContext'
import { FaBars, FaTimes, FaUserCircle, FaSuitcase, FaPlane, FaHotel, FaPassport, FaChevronDown, FaHome, FaHeart, FaQuestionCircle, FaShip } from 'react-icons/fa'
import skynavLogo from '../../images/Skynav.png'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { user, logout } = useAuth()
  const { i18n } = useTranslation()
  const { settings, updateRegion, regions } = useRegionalSettings()
  const [isOpen, setIsOpen] = useState(false)
  const [showRegionalMenu, setShowRegionalMenu] = useState(false)
  const [showVisaSubmenu, setShowVisaSubmenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  // Updated Nav Links based on user request ("Home", "Book Flights", "Hotels", "Visas")
  // "My Bookings" removed. "Visas" next to "Hotels".
  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Book Flights', path: '/ibe', icon: <FaPlane /> }, // directing to IBE for booking focus
    { name: 'Hotels', path: '/hotels', icon: <FaHotel /> },
    { name: 'Visas', path: '/visas', icon: <FaPassport /> },
  ]

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 font-sans shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* 1. Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img src={skynavLogo} alt="SkyNav" className="h-9 w-auto" />
          </Link>

          {/* 2. Center Navigation (Desktop) - Updated Style */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              if (link.name === 'Visas') {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isActive(link.path)
                        ? 'bg-[#00205b] text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#00205b]'
                        }`}
                    >
                      <span className={`text-lg ${isActive(link.path) ? 'text-white' : 'text-slate-500'}`}>
                        {link.icon}
                      </span>
                      {link.name}
                      <FaChevronDown size={10} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Visa Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                      <Link
                        to="/visas?type=tourist"
                        className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00205b] font-medium transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#00205b]/10 flex items-center justify-center text-[#00205b]">
                          <FaPassport size={14} />
                        </div>
                        <div>
                          <p className="font-bold">Global Tourist Visa</p>
                          <p className="text-[10px] text-slate-400 font-normal">For all travelers</p>
                        </div>
                      </Link>
                      <Link
                        to="/visas?type=marine"
                        className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00205b] font-medium transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#00205b]/10 flex items-center justify-center text-[#00205b]">
                          <FaShip size={14} />
                        </div>
                        <div>
                          <p className="font-bold">Marine Crew Visa</p>
                          <p className="text-[10px] text-slate-400 font-normal">For seafarers only</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isActive(link.path)
                    ? 'bg-[#00205b] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#00205b]'
                    }`}
                >
                  <span className={`text-lg ${isActive(link.path) ? 'text-white' : 'text-slate-500'}`}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* 3. Right Action Section */}
          <div className="hidden md:flex items-center gap-5">

            {/* Help Text */}
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900">
              Help
            </a>

            {/* Regional Settings - Expanded Style */}
            <div className="relative">
              <button
                onClick={() => setShowRegionalMenu(!showRegionalMenu)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all text-slate-700 bg-white"
              >
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Region</div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{settings?.language || 'English'}</span>
                    <span className="text-slate-300">|</span>
                    <span>{settings?.country || 'India'}</span>
                    <span className="text-slate-300">|</span>
                    <span>{settings?.currency || 'INR'}</span>
                  </div>
                </div>
                <FaChevronDown size={10} className={`text-slate-400 transform transition-transform ${showRegionalMenu ? 'rotate-180' : ''}`} />
              </button>

              {showRegionalMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowRegionalMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100/50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Region</p>
                    </div>
                    {Object.keys(regions).map((regionName) => (
                      <button
                        key={regionName}
                        onClick={() => {
                          updateRegion(regionName)
                          setShowRegionalMenu(false)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-sky-50 transition-colors flex items-center justify-between group ${settings?.country === regionName ? 'bg-sky-50/50 text-primary-700' : 'text-slate-700'
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">{regions[regionName].flag}</span>
                          {regionName}
                        </span>
                        {settings?.country === regionName && <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Favorites / Heart Icon */}
            <button className="text-slate-400 hover:text-red-500 transition-colors p-2">
              <FaHeart size={20} />
            </button>

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 bg-white"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 bg-[#00205b] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#001540] transition-all shadow-md">
                  <FaUserCircle size={18} />
                  <span className="max-w-[100px] truncate">{user.fullName?.split(' ')[0] || 'Account'}</span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="px-5 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.fullName || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <Link to="/my-bookings" className="flex items-center gap-3 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00205b] font-medium transition-colors">
                      <FaSuitcase className="text-slate-400" /> My Bookings
                    </Link>
                    <Link to="/visa-status" className="flex items-center gap-3 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00205b] font-medium transition-colors">
                      <FaPassport className="text-slate-400" /> Visa Status
                    </Link>
                    <Link to="/profile" className="flex items-center gap-3 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00205b] font-medium transition-colors">
                      <FaUserCircle className="text-slate-400" /> My Profile
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-5 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                    <span className="text-lg">➔</span> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#00205b] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#001540] transition-all shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button className="text-slate-400 hover:text-red-500 p-1">
              <FaHeart size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-[#00205b] focus:outline-none p-2 rounded-lg hover:bg-slate-50 transition-all"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto animate-in slide-in-from-right-10 duration-200">
          <div className="p-4 space-y-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                if (link.name === 'Visas') {
                  return (
                    <div key={link.name}>
                      <button
                        onClick={() => setShowVisaSubmenu(!showVisaSubmenu)}
                        className={`w-full flex items-center justify-between gap-4 px-4 py-4 rounded-xl text-lg font-bold transition-all ${isActive(link.path)
                          ? 'bg-[#00205b] text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-xl ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`}>{link.icon}</span>
                          {link.name}
                        </div>
                        <FaChevronDown 
                          size={14} 
                          className={`transition-transform ${showVisaSubmenu ? 'rotate-180' : ''} ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`} 
                        />
                      </button>
                      
                      {/* Visa Submenu */}
                      {showVisaSubmenu && (
                        <div className="ml-4 mt-2 space-y-2 border-l-2 border-slate-200 pl-4">
                          <Link
                            to="/visas?type=tourist"
                            onClick={() => {
                              setIsOpen(false)
                              setShowVisaSubmenu(false)
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all bg-slate-50 hover:bg-slate-100 text-slate-700"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#00205b]/10 flex items-center justify-center text-[#00205b]">
                              <FaPassport size={14} />
                            </div>
                            <div>
                              <p className="font-bold">Global Tourist Visa</p>
                              <p className="text-[10px] text-slate-400 font-normal">For all travelers</p>
                            </div>
                          </Link>
                          <Link
                            to="/visas?type=marine"
                            onClick={() => {
                              setIsOpen(false)
                              setShowVisaSubmenu(false)
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all bg-slate-50 hover:bg-slate-100 text-slate-700"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#00205b]/10 flex items-center justify-center text-[#00205b]">
                              <FaShip size={14} />
                            </div>
                            <div>
                              <p className="font-bold">Marine Crew Visa</p>
                              <p className="text-[10px] text-slate-400 font-normal">For seafarers only</p>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-bold transition-all ${isActive(link.path)
                      ? 'bg-[#00205b] text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <span className={`text-xl ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`}>{link.icon}</span>
                    {link.name}
                  </Link>
                )
              })}
              <div className="px-4 py-4 flex items-center gap-4 text-slate-600 font-bold border-t border-slate-100 mt-2">
                <FaQuestionCircle className="text-xl text-slate-400" /> Help
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Regional Settings</p>
              <div className="grid grid-cols-2 gap-3 px-2">
                {Object.keys(regions).map((regionName) => (
                  <button
                    key={regionName}
                    onClick={() => {
                      updateRegion(regionName)
                      setIsOpen(false)
                    }}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-semibold border ${settings?.country === regionName
                      ? 'bg-sky-50 border-sky-100 text-primary-700'
                      : 'bg-white border-slate-100 text-slate-600'
                      }`}
                  >
                    <span className="text-lg mr-2">{regions[regionName].flag}</span>
                    {regionName}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 pb-8">
              {user ? (
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-3 px-2 pb-2">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                      {user.fullName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{user.fullName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-700 bg-white"
                  >
                    Manage Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 px-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl text-slate-700 font-bold border-2 border-slate-100 transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl bg-[#00205b] text-white font-bold shadow-lg transition-all"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
