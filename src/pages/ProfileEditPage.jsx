import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaSave, FaArrowLeft, FaCheckCircle, FaCamera } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

function ProfileEditPage() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Load user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      pincode: user.pincode || '',
    })
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      // Update user profile
      updateUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
        pincode: formData.pincode.trim(),
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      setIsSaving(false)
      setShowSuccess(true)
      
      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        navigate('/my-bookings')
      }, 2000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setIsSaving(false)
      alert('Failed to update profile. Please try again.')
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-900 transition-colors mb-6 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 mb-1">
                Edit Profile
              </h1>
              <p className="text-primary-700">Manage your account information and preferences</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
            <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Profile updated successfully!</p>
              <p className="text-sm text-green-700">Your changes have been saved.</p>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden">
          {/* Profile Picture Section */}
          <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-primary-800 shadow-2xl border-4 border-white">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border-2 border-primary-200"
                title="Change profile picture"
              >
                <FaCamera className="text-primary-800 text-xs" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white mt-3">{user.name || 'User'}</h2>
            <p className="text-white/90 text-xs mt-1">{user.email}</p>
          </div>

          <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information Section */}
            <div className="bg-gradient-to-br from-primary-50/50 to-transparent rounded-xl p-4 border border-primary-100">
              <h2 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2 pb-2 border-b border-primary-200">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-700 to-primary-600 rounded-lg flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span>Personal Information</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all duration-200 bg-white ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20'
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500 pointer-events-none text-sm" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all duration-200 bg-white ${
                        errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20'
                      }`}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500 pointer-events-none text-sm" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all duration-200 bg-white ${
                        errors.phone
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20'
                      }`}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="rounded-xl p-4 border border-primary-200">
              <h2 className="text-lg font-bold text-primary-900 mb-4 pb-2 border-b border-primary-200">
                Address Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 bg-white"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 bg-white"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 bg-white"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 bg-white"
                      placeholder="Country"
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 bg-white"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-primary-200 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaSave />
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-white text-primary-900 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 border-2 border-primary-200 hover:border-primary-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditPage

