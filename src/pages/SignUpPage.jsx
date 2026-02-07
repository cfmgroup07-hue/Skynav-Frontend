import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import skynavLogo from '../../images/Skynav.png'

function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { register, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await register(name, email, password)
    if (result.success) {
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } })
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row min-h-[540px] transition-all duration-700 animate-fade-in border border-white/50">
        {/* Left Side - Register Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-14 flex flex-col justify-center relative z-10 order-1 md:order-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-700 hover:text-primary-900 transition-colors mb-6 group w-fit"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-tight">Back to Home</span>
          </Link>

          <div className="mb-8 text-center md:text-left">
            <img src={skynavLogo} alt="Skynav" className="h-10 w-auto mb-6 mx-auto md:mx-0" />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium text-sm">Join the Skynav community today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-700 text-xs font-bold border border-red-100 animate-shake text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 group-focus-within:text-primary-600 transition-colors" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:border-primary-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-sm"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-focus-within:text-primary-600 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:border-primary-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-sm"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 group-focus-within:text-primary-600 transition-colors" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-14 pr-14 py-4 bg-gray-50/50 border border-transparent focus:border-primary-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-6 flex items-center text-gray-400 hover:text-primary-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="px-2 text-[10px] flex items-start gap-2 text-gray-400">
              <input type="checkbox" className="mt-0.5 accent-primary-600 w-4 h-4 rounded border-gray-200" required />
              <span>I read and agree to <Link to="#" className="text-primary-600 font-bold hover:underline">Terms & Conditions</Link></span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1e3a8a] text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 transform transition-all active:scale-[0.98] tracking-wide mt-2"
            >
              Get Started
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setIsGoogleLoading(true)
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
              }}
              disabled={isGoogleLoading}
              className="flex items-center justify-center gap-3 w-full py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-700 hover:bg-gray-50 transition-all font-bold text-sm"
            >
              <FaGoogle className="text-red-500 text-lg" />
              Sign up with Google
            </button>
            <p className="text-gray-400 text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:underline font-bold">Sign In</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration Section */}
        <div className="w-full md:w-1/2 bg-[#04154f] relative flex flex-col items-center justify-center p-12 text-center text-white overflow-hidden order-2 md:order-2">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10 flex flex-col items-center max-w-[320px]">
            {/* Travel Illustration SVG */}
            <div className="mb-12 w-28 h-28 flex items-center justify-center rounded-[32px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md animate-pulse">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-300" fill="currentColor">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold mb-5 tracking-tight">Fly High!</h2>
            <p className="text-lg text-blue-100/60 font-medium leading-relaxed">
              Start your journey with us and discover the easiest way to book your next flight.
            </p>
          </div>

          {/* Decorative Glowing Orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
