import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaUpload, FaFileAlt, FaUser, FaPassport, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'
import { getVisaDetail } from '../services/visaService'
import { uploadFile } from '../services/fileService'
import { applyVisa } from '../services/visaService'
import { useAuth } from '../contexts/AuthContext'

const VisaApplicationPage = () => {
    const { country } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user, token } = useAuth()
    const isMarineCrew = searchParams.get('type') === 'marine'
    
    const [visaData, setVisaData] = useState(null)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // Personal Information
        title: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        
        // Passport Details
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportIssueCountry: '',
        
        // Contact Information
        email: '',
        phone: '',
        countryCode: '+91',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        
        // Marine Crew Specific
        cdcNumber: '',
        seamanBookNumber: '',
        joiningVesselLetter: null,
        employerLetter: null,
        
        // Travel Details
        travelDate: '',
        returnDate: '',
        purposeOfVisit: '',
        
        // Additional Documents
        passportCopy: null,
        photo: null,
        additionalDocuments: []
    })
    
    const [errors, setErrors] = useState({})
    const [uploadedFiles, setUploadedFiles] = useState({})
    const [uploadedMeta, setUploadedMeta] = useState({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (country) {
            const fetchDetail = async () => {
                const response = await getVisaDetail(country, isMarineCrew ? 'marine' : 'tourist')
                if (response.success) {
                    setVisaData(response.data)
                }
            }
            fetchDetail()
        }
        
        // Auto-fill email if user is logged in
        if (user && user.email && !formData.email) {
            setFormData(prev => ({ ...prev, email: user.email }))
        }
    }, [country, isMarineCrew, user])

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileUpload = async (e, fieldName) => {
        const file = e.target.files[0]
        if (file) {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, [fieldName]: 'Only PDF/JPG/PNG files allowed' }))
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [fieldName]: 'File must be under 5MB' }))
                return
            }
            setFormData(prev => ({ ...prev, [fieldName]: file }))
            setUploadedFiles(prev => ({ ...prev, [fieldName]: file.name }))
            if (errors[fieldName]) {
                setErrors(prev => ({ ...prev, [fieldName]: '' }))
            }
            if (token) {
                const response = await uploadFile(file, token)
                if (response.success) {
                    setUploadedMeta(prev => ({
                        ...prev,
                        [fieldName]: response.file,
                    }))
                }
            }
        }
    }

    const validateStep = (step) => {
        const newErrors = {}
        
        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
            if (!formData.gender) newErrors.gender = 'Gender is required'
            if (!formData.nationality) newErrors.nationality = 'Nationality is required'
        }
        
        if (step === 2) {
            if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required'
            if (!formData.passportIssueDate) newErrors.passportIssueDate = 'Passport issue date is required'
            if (!formData.passportExpiryDate) newErrors.passportExpiryDate = 'Passport expiry date is required'
            if (!formData.passportIssueCountry) newErrors.passportIssueCountry = 'Passport issue country is required'
            if (!formData.passportCopy) newErrors.passportCopy = 'Passport copy is required'
        }
        
        if (step === 3) {
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email format'
            }
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
            if (!formData.address.trim()) newErrors.address = 'Address is required'
            if (!formData.city.trim()) newErrors.city = 'City is required'
            if (!formData.country.trim()) newErrors.country = 'Country is required'
        }
        
        if (step === 4 && isMarineCrew) {
            if (!formData.cdcNumber.trim()) newErrors.cdcNumber = 'CDC/Seaman Book number is required'
            if (!formData.joiningVesselLetter) newErrors.joiningVesselLetter = 'Joining vessel letter is required'
            if (!formData.employerLetter) newErrors.employerLetter = 'Employer/Ship manager letter is required'
        }
        
        if (step === (isMarineCrew ? 5 : 4)) {
            if (!formData.travelDate) newErrors.travelDate = 'Travel date is required'
            if (!formData.photo) newErrors.photo = 'Photo is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo(0, 0)
        }
    }

    const handleBack = () => {
        setCurrentStep(prev => prev - 1)
        window.scrollTo(0, 0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const finalStep = isMarineCrew ? 6 : 5
        if (currentStep !== finalStep) {
            handleNext()
            return
        }
        if (validateStep(isMarineCrew ? 5 : 4)) {
            setSubmitting(true)
            const payload = {
                countrySlug: country,
                visaType: isMarineCrew ? 'marine' : 'tourist',
                personal: {
                    title: formData.title,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    nationality: formData.nationality,
                },
                passport: {
                    passportNumber: formData.passportNumber,
                    passportIssueDate: formData.passportIssueDate,
                    passportExpiryDate: formData.passportExpiryDate,
                    passportIssueCountry: formData.passportIssueCountry,
                },
                contact: {
                    email: formData.email,
                    phone: formData.phone,
                    countryCode: formData.countryCode,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                marine: isMarineCrew ? {
                    cdcNumber: formData.cdcNumber,
                    seamanBookNumber: formData.seamanBookNumber,
                } : undefined,
                travel: {
                    travelDate: formData.travelDate,
                    returnDate: formData.returnDate,
                    purposeOfVisit: formData.purposeOfVisit,
                },
                uploads: Object.entries(uploadedMeta).map(([label, meta]) => ({
                    label,
                    fileId: meta.id,
                    fileName: meta.originalName,
                    mimeType: meta.mimeType,
                    size: meta.size,
                })),
            }

            try {
                const response = await applyVisa(payload, token)
                if (response.success) {
                    navigate(`/visa-status?submitted=${response.application?._id}`)
                }
            } finally {
                setSubmitting(false)
            }
        }
    }

    const totalSteps = isMarineCrew ? 6 : 5
    const countryName = country ? country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ') : ''

    if (!visaData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(`/visas/${country}${isMarineCrew ? '?type=marine' : ''}`)}
                            className="flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium"
                        >
                            <FaArrowLeft size={16} />
                            <span>Back</span>
                        </button>
                        <div className="text-center">
                            <h1 className="text-lg font-black text-slate-900">{countryName} Visa Application</h1>
                            <p className="text-xs text-slate-500">Step {currentStep} of {totalSteps}</p>
                        </div>
                        <div className="w-20"></div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl mt-8">
                <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaUser className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Personal Information</h2>
                                    <p className="text-slate-500 text-sm">Tell us about yourself</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Title *</label>
                                        <select
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        >
                                            <option value="">Select</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Miss">Miss</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Gender *</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.gender ? 'border-red-500' : 'border-slate-300'}`}
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                                            placeholder="Enter first name"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                                            placeholder="Enter last name"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth *</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-slate-300'}`}
                                    />
                                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nationality *</label>
                                    <select
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.nationality ? 'border-red-500' : 'border-slate-300'}`}
                                    >
                                        <option value="">Select nationality</option>
                                        <option value="Indian">Indian</option>
                                        <option value="American">American</option>
                                        <option value="British">British</option>
                                        <option value="Canadian">Canadian</option>
                                        <option value="Australian">Australian</option>
                                    </select>
                                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Passport Details */}
                    {currentStep === 2 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaPassport className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Passport Details</h2>
                                    <p className="text-slate-500 text-sm">Enter your passport information</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Passport Number *</label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={formData.passportNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.passportNumber ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="Enter passport number"
                                    />
                                    {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Issue Date *</label>
                                        <input
                                            type="date"
                                            name="passportIssueDate"
                                            value={formData.passportIssueDate}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.passportIssueDate ? 'border-red-500' : 'border-slate-300'}`}
                                        />
                                        {errors.passportIssueDate && <p className="text-red-500 text-xs mt-1">{errors.passportIssueDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date *</label>
                                        <input
                                            type="date"
                                            name="passportExpiryDate"
                                            value={formData.passportExpiryDate}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.passportExpiryDate ? 'border-red-500' : 'border-slate-300'}`}
                                        />
                                        {errors.passportExpiryDate && <p className="text-red-500 text-xs mt-1">{errors.passportExpiryDate}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Passport Issue Country *</label>
                                    <select
                                        name="passportIssueCountry"
                                        value={formData.passportIssueCountry}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.passportIssueCountry ? 'border-red-500' : 'border-slate-300'}`}
                                    >
                                        <option value="">Select country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                    {errors.passportIssueCountry && <p className="text-red-500 text-xs mt-1">{errors.passportIssueCountry}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Upload Passport Copy *</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                                        <input
                                            type="file"
                                            id="passportCopy"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileUpload(e, 'passportCopy')}
                                            className="hidden"
                                        />
                                        <label htmlFor="passportCopy" className="cursor-pointer">
                                            <FaUpload className="mx-auto text-slate-400 mb-2" size={24} />
                                            <p className="text-sm font-medium text-slate-600">
                                                {uploadedFiles.passportCopy || 'Click to upload passport copy'}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                        </label>
                                    </div>
                                    {errors.passportCopy && <p className="text-red-500 text-xs mt-1">{errors.passportCopy}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Contact Information */}
                    {currentStep === 3 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaEnvelope className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Contact Information</h2>
                                    <p className="text-slate-500 text-sm">How can we reach you?</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            className="w-24 px-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="+91">+91</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                        </select>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.address ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="Street address"
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.city ? 'border-red-500' : 'border-slate-300'}`}
                                            placeholder="Enter city"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Enter state"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Enter zip code"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Country *</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.country ? 'border-red-500' : 'border-slate-300'}`}
                                        >
                                            <option value="">Select country</option>
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            <option value="Canada">Canada</option>
                                        </select>
                                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Marine Crew Specific (only for marine crew visas) */}
                    {currentStep === 4 && isMarineCrew && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaFileAlt className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Marine Crew Documents</h2>
                                    <p className="text-slate-500 text-sm">Upload required seafarer documents</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">CDC / Seaman Book Number *</label>
                                    <input
                                        type="text"
                                        name="cdcNumber"
                                        value={formData.cdcNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.cdcNumber ? 'border-red-500' : 'border-slate-300'}`}
                                        placeholder="Enter CDC/Seaman Book number"
                                    />
                                    {errors.cdcNumber && <p className="text-red-500 text-xs mt-1">{errors.cdcNumber}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Joining Vessel Letter *</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                                        <input
                                            type="file"
                                            id="joiningVesselLetter"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileUpload(e, 'joiningVesselLetter')}
                                            className="hidden"
                                        />
                                        <label htmlFor="joiningVesselLetter" className="cursor-pointer">
                                            <FaUpload className="mx-auto text-slate-400 mb-2" size={24} />
                                            <p className="text-sm font-medium text-slate-600">
                                                {uploadedFiles.joiningVesselLetter || 'Click to upload joining vessel letter'}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                        </label>
                                    </div>
                                    {errors.joiningVesselLetter && <p className="text-red-500 text-xs mt-1">{errors.joiningVesselLetter}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Employer / Ship Manager Letter *</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                                        <input
                                            type="file"
                                            id="employerLetter"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileUpload(e, 'employerLetter')}
                                            className="hidden"
                                        />
                                        <label htmlFor="employerLetter" className="cursor-pointer">
                                            <FaUpload className="mx-auto text-slate-400 mb-2" size={24} />
                                            <p className="text-sm font-medium text-slate-600">
                                                {uploadedFiles.employerLetter || 'Click to upload employer letter'}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                        </label>
                                    </div>
                                    {errors.employerLetter && <p className="text-red-500 text-xs mt-1">{errors.employerLetter}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Travel Details & Photo */}
                    {currentStep === (isMarineCrew ? 5 : 4) && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaCalendarAlt className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Travel Details & Photo</h2>
                                    <p className="text-slate-500 text-sm">Final step to complete your application</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Travel Date *</label>
                                        <input
                                            type="date"
                                            name="travelDate"
                                            value={formData.travelDate}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.travelDate ? 'border-red-500' : 'border-slate-300'}`}
                                        />
                                        {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Return Date</label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            value={formData.returnDate}
                                            onChange={handleInputChange}
                                            min={formData.travelDate || new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Purpose of Visit</label>
                                    <select
                                        name="purposeOfVisit"
                                        value={formData.purposeOfVisit}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        <option value="">Select purpose</option>
                                        <option value="Tourism">Tourism</option>
                                        <option value="Business">Business</option>
                                        <option value="Transit">Transit</option>
                                        {isMarineCrew && <option value="Joining Vessel">Joining Vessel</option>}
                                        {isMarineCrew && <option value="Crew Transit">Crew Transit</option>}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photo *</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                                        <input
                                            type="file"
                                            id="photo"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'photo')}
                                            className="hidden"
                                        />
                                        <label htmlFor="photo" className="cursor-pointer">
                                            <FaUpload className="mx-auto text-slate-400 mb-2" size={24} />
                                            <p className="text-sm font-medium text-slate-600">
                                                {uploadedFiles.photo || 'Click to upload passport size photo'}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">JPG, PNG (Max 2MB, 35x45mm)</p>
                                        </label>
                                    </div>
                                    {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                </div>

                                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <FaInfoCircle className="text-primary-600 mt-0.5" size={16} />
                                        <div className="text-sm text-primary-800">
                                            <p className="font-bold mb-1">Important Notes:</p>
                                            <ul className="list-disc list-inside space-y-1 text-xs">
                                                <li>Photo must be recent (taken within last 6 months)</li>
                                                <li>White background required</li>
                                                <li>Face should be clearly visible</li>
                                                {isMarineCrew && <li>All marine crew documents must be valid and current</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Review & Submit */}
                    {currentStep === (isMarineCrew ? 6 : 5) && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                                    <FaCheckCircle className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Review & Submit</h2>
                                    <p className="text-slate-500 text-sm">Confirm your details before submission</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm text-slate-700">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase">Applicant</p>
                                        <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase">Passport</p>
                                        <p className="font-semibold">{formData.passportNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase">Travel Date</p>
                                        <p className="font-semibold">{formData.travelDate || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase">Contact</p>
                                        <p className="font-semibold">{formData.email}</p>
                                    </div>
                                </div>
                                <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-primary-800 text-xs">
                                    Please verify all documents. Once submitted, updates require admin approval.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between items-center bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${
                                currentStep === 1
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            <FaArrowLeft className="inline mr-2" size={14} />
                            Back
                        </button>

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black transition-all shadow-lg"
                            >
                                Continue
                                <FaArrowLeft className="inline ml-2 rotate-180" size={14} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <FaCheckCircle className="inline mr-2" size={14} />
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VisaApplicationPage
