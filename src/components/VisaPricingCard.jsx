import React from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { FaShieldAlt, FaLock, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

const VisaPricingCard = ({ pricing, countryName }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { country } = useParams()
    const visaType = searchParams.get('type') || 'tourist'
    
    const handleStartApplication = () => {
        const countrySlug = country || countryName.toLowerCase().replace(/\s+/g, '-')
        const url = `/visas/${countrySlug}/apply${visaType === 'marine' ? '?type=marine' : ''}`
        navigate(url)
    }
    return (
        <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                {/* Header Strip */}
                <div className="bg-primary-600 p-6 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <FaShieldAlt size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Premium Service</p>
                        <h3 className="text-lg font-black leading-tight">Get Your {countryName} Visa on Time</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                        Price Breakdown
                        <FaInfoCircle size={14} className="text-slate-300" />
                    </h4>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Government fee</span>
                            <span className="text-slate-900 font-bold">{pricing.currency || 'USD'} {pricing.governmentFee || pricing.total || 0} × 1</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-medium font-bold text-primary-600 flex items-center gap-1">
                                    <FaCheckCircle size={12} />
                                    SkyNav Fees
                                </span>
                                <span className="line-through text-slate-300">{pricing.currency || 'USD'} {pricing.platformFee || 0}</span>
                            </div>
                            <span className="text-primary-600 font-bold">{pricing.currency || 'USD'} {(pricing.platformFee || 0) - (pricing.discount || 0)}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-primary-50 rounded-2xl mb-8 border border-primary-100">
                        <p className="text-primary-800 text-[13px] font-bold leading-relaxed">
                            No advance payment. Pay only when you get your {countryName} visa.
                        </p>
                    </div>

                    <div className="flex justify-between items-end mb-8 pt-8 border-t border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">{pricing.currency || 'USD'} {pricing.total || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter mb-1">
                            <FaLock size={10} />
                            Unlock for free
                        </div>
                    </div>

                    <button 
                        onClick={handleStartApplication}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-primary-200 active:scale-95"
                    >
                        Start Application
                    </button>
                </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <FaShieldAlt size={16} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">SkyNav Protect</h4>
                    <span className="ml-auto text-[10px] font-black bg-white border border-slate-100 px-2 py-1 rounded text-green-600 uppercase">Free</span>
                </div>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                        <div className="mt-0.5">•</div>
                        <span>If Visa Delayed — No SkyNav Fee</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                        <div className="mt-0.5">•</div>
                        <span>If not approved — 100% Refund</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default VisaPricingCard
