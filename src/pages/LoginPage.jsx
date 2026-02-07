import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import skynavLogo from '../../images/Skynav.png'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
    }
    if (user) {
      if (['admin', 'superadmin'].includes(user.role)) {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }, [user, navigate, location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    const result = await login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-fade-in border border-gray-100">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative z-10">
          <Link
            to="/"
            className="absolute top-6 left-6 text-slate-400 hover:text-primary-600 flex items-center gap-2 text-xs font-bold transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="mb-8">
            <img src={skynavLogo} alt="Skynav" className="h-9 w-auto mb-6" />
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Login</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Please sign in to continue</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 animate-fade-in text-center">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100 animate-shake text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-slate-400 text-sm" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium text-slate-700"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaLock className="text-slate-400 text-sm" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium text-slate-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-xs font-medium">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary-600 rounded-lg border-slate-200" />
                <span>Keep me logged in</span>
              </label>
              <Link to="#" className="text-primary-600 hover:text-primary-700 font-bold">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-600/20 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsGoogleLoading(true)
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
              }}
              className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 font-bold text-sm"
            >
              <FaGoogle className="text-red-500" />
              Google
            </button>

            <p className="text-center mt-6 text-slate-500 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:underline font-bold">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration Section */}
        <div className="w-full md:w-1/2 bg-[#04154f] relative flex flex-col items-center justify-center p-12 text-white overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 text-center">
            {/* Plane SVG Illustration */}
            <div className="mb-10 flex justify-center">
              <svg viewBox="0 0 24 24" className="w-32 h-32 text-primary-400/30 animate-pulse" fill="currentColor">
                <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold mb-4 tracking-tight">SkyNav Travel</h2>
            <p className="text-slate-300 text-base font-medium max-w-[280px] leading-relaxed mx-auto">
              Your gateway to seamless travel experiences and world-class flight booking.
            </p>
          </div>

          {/* Decorative Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
