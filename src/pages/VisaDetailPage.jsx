import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaShieldAlt, FaFileAlt } from 'react-icons/fa'
import { getVisaDetail } from '../services/visaService'

import VisaHero from '../components/VisaHero'
import VisaInfoGrid from '../components/VisaInfoGrid'
import VisaFaq from '../components/VisaFaq'
import VisaReviews from '../components/VisaReviews'
import VisaPricingCard from '../components/VisaPricingCard'

const VisaDetailPage = () => {
    const { country } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const isMarineCrew = searchParams.get('type') === 'marine'

    useEffect(() => {
        if (country) {
            const fetchDetail = async () => {
                const response = await getVisaDetail(country, isMarineCrew ? 'marine' : 'tourist')
                if (response.success) {
                    setData(response.data)
                }
            }
            fetchDetail()
            window.scrollTo(0, 0)
        }
    }, [country, isMarineCrew])

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    const countryName = data.country?.name || country
    const rule = data.rule

    const detailData = {
        image: data.country?.imageUrl || '/images/1.jpg',
        badge: isMarineCrew ? 'Marine Crew Visa' : 'Visa Services',
        title: `${countryName} Visa`,
        rating: '4.9',
        trustedBy: '2M+ travelers',
        infoGrid: [
            { label: 'Processing', value: rule?.processingTime || 'Fast Processing', icon: 'FaClock' },
            { label: 'Validity', value: rule?.validity || 'As per embassy', icon: 'FaCalendarAlt' },
            { label: 'Entry Type', value: rule?.entryType || 'Single/Multiple', icon: 'FaSignInAlt' },
            { label: 'Max Stay', value: rule?.maxStay || 'Varies', icon: 'FaTicketAlt' },
            { label: 'Documents', value: `${rule?.documents?.length || 0} Required`, icon: 'FaFileAlt' },
            { label: 'Approval', value: 'High Success Rate', icon: 'FaUserCheck' },
        ],
        description: rule?.description || 'Complete visa assistance with expert guidance.',
        whyUs: rule?.whyUs?.length ? rule.whyUs : [
            'Document verification & expert review',
            'End-to-end application support',
            'Live status tracking',
            'Refund assurance if not approved',
        ],
        faqs: rule?.faqs?.length
            ? [{ category: 'General', questions: rule.faqs.map((faq) => ({ q: faq.question, a: faq.answer })) }]
            : [{ category: 'General', questions: [{ q: 'How long does it take?', a: 'Processing time depends on embassy.' }] }],
        reviews: {
            average: 4.8,
            total: 1241,
            tokens: ['Fast', 'Secure', 'Verified', 'Trusted'],
            items: [
                { name: 'Amit Sharma', location: 'India', rating: 5, comment: 'Smooth process and clear guidance.' },
                { name: 'Sarah Johnson', location: 'UK', rating: 5, comment: 'Great support and quick updates.' },
            ],
        },
        pricing: {
            governmentFee: rule?.pricing?.amount || 0,
            platformFee: 0,
            discount: 0,
            total: rule?.pricing?.amount || 0,
            currency: rule?.pricing?.currency || 'USD',
        },
        mandatoryDocuments: rule?.documents || [],
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Mobile Back Button Floating */}
            <button
                onClick={() => navigate(isMarineCrew ? '/visas?type=marine' : '/visas')}
                className="fixed top-20 left-4 z-50 p-3 bg-white/90 backdrop-blur shadow-lg rounded-full lg:hidden block"
            >
                <FaArrowLeft className="text-primary-700" />
            </button>

            {/* Hero Section */}
            <VisaHero countryData={detailData} />

            <div className="container mx-auto px-6 max-w-7xl mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

                    {/* Left Column - Content */}
                    <div className="lg:col-span-2">
                        {/* Trust Strip */}
                        <div className="flex items-center gap-4 py-4 px-6 bg-slate-50 border border-slate-100 rounded-2xl mb-12">
                            <div className="flex text-yellow-400 gap-0.5">
                                {[...Array(5)].map((_, i) => <FaCheckCircle key={i} size={12} className="text-green-500" />)}
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                                Rated <span className="text-primary-600">{detailData.rating}</span> & Trusted by {detailData.trustedBy}
                            </span>
                        </div>

                        {/* Visa Info Grid */}
                        <VisaInfoGrid infoGrid={detailData.infoGrid} />

                        {/* What is Section */}
                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">What is {detailData.title}?</h2>
                            <p className="text-slate-600 leading-relaxed text-lg font-medium max-w-2xl">
                                {detailData.description}
                            </p>
                        </div>

                        {/* Mandatory Documents Section for Marine Crew */}
                        {isMarineCrew && detailData.mandatoryDocuments && (
                            <div className="mb-16 bg-amber-50 border-l-4 border-amber-500 p-8 rounded-2xl">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                                    <FaFileAlt className="text-amber-600" />
                                    Mandatory Documents
                                </h2>
                                <ul className="space-y-3">
                                    {detailData.mandatoryDocuments.map((doc, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="text-amber-600 mt-1 shrink-0" size={16} />
                                            <span className="text-slate-700 font-medium">{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
                                    <p className="text-sm text-amber-900 font-medium">
                                        <strong>Important:</strong> Marine crew visa eligibility depends on port, vessel flag, nationality, and joining location. Additional documents may be required by immigration authorities.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Why Us / Benefits */}
                        <div className="mb-16 bg-primary-900 rounded-[40px] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
                            <h2 className="text-2xl font-black mb-8 relative z-10">Why apply on SkyNav?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                {detailData.whyUs.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                                            <FaCheckCircle className="text-white" size={14} />
                                        </div>
                                        <span className="font-bold text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partners Section (Placeholders for now, styled as requested) */}
                        <div className="mb-16">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Partners We Work With</h3>
                            <div className="flex flex-wrap gap-8 items-center opacity-50">
                                <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="h-10 w-28 bg-slate-200 rounded-lg animate-pulse" />
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <VisaFaq faqs={detailData.faqs} />

                        {/* Reviews Section */}
                        <VisaReviews reviews={detailData.reviews} />
                    </div>

                    {/* Right Column - Sticky Pricing Card */}
                    <div className="relative">
                        <VisaPricingCard pricing={detailData.pricing} countryName={countryName} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VisaDetailPage
