import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaTicketAlt, FaShip } from 'react-icons/fa'

const VisaCountryCard = ({ country, visaType = 'tourist' }) => {
    const slug = country.slug || country.name.toLowerCase().replace(/\s+/g, '-')
    const isMarineCrew = visaType === 'marine'
    const linkUrl = isMarineCrew ? `/visas/${slug}?type=marine` : `/visas/${slug}`

    return (
        <Link
            to={linkUrl}
            className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-2"
        >
            {/* Country Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={country.image || country.imageUrl || '/images/1.jpg'}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-primary-700/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                    {isMarineCrew ? 'Marine Crew Visa' : (country.visaCount || 'Visa Available')}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none group-hover:text-primary-700 transition-colors">
                        {country.name}
                    </h3>
                    <FaArrowRight className="text-primary-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" size={14} />
                </div>

                <div className="flex items-center gap-2 text-slate-500 mb-4">
                    {isMarineCrew ? (
                        <>
                            <FaShip size={12} className="text-primary-600" />
                            <span className="text-xs font-bold uppercase tracking-widest">Marine Crew Visa</span>
                        </>
                    ) : (
                        <>
                            <FaTicketAlt size={12} className="text-primary-600" />
                            <span className="text-xs font-bold uppercase tracking-widest">E-Visa Available</span>
                        </>
                    )}
                </div>

                {isMarineCrew && country.visaType && (
                    <div className="mb-3">
                        <p className="text-xs text-slate-600 font-medium">{country.visaType}</p>
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {isMarineCrew ? 'Processing Time' : 'Estimate Delivery'}
                    </p>
                    <p className="text-sm font-black text-slate-700 leading-none">
                        {isMarineCrew ? (
                            <span className="text-primary-600">Varies by Country</span>
                        ) : (
                            <>
                                {country.processingTime ? (
                                    <>Get on <span className="text-primary-600">{country.processingTime}</span></>
                                ) : (
                                    <span className="text-primary-600">Fast Processing</span>
                                )}
                            </>
                        )}
                    </p>
                    {!isMarineCrew && country.pricing?.amount && (
                        <p className="text-[10px] font-medium text-slate-400 mt-1">
                            From {country.pricing.currency || 'USD'} {country.pricing.amount}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default VisaCountryCard
