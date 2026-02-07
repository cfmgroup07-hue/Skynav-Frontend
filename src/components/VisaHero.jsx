import React from 'react'
import { FaFileAlt } from 'react-icons/fa'

const VisaHero = ({ countryData }) => {
    return (
        <section className="relative h-[480px] w-full flex items-center px-6 overflow-hidden">
            {/* Background with exact image and dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${countryData.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {countryData.badge}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                        {countryData.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center">
                        <button className="bg-white text-primary-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                            <FaFileAlt className="text-primary-600" />
                            Check Required Documents
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisaHero
