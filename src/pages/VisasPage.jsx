import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import VisaCountryCard from '../components/VisaCountryCard'
import { listVisas } from '../services/visaService'

const VisasPage = () => {
    const [searchParams] = useSearchParams()
    const visaType = searchParams.get('type') || 'tourist'
    const [searchQuery, setSearchQuery] = useState('')

    const isMarineCrew = visaType === 'marine'
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            setLoading(true)
            const response = await listVisas(visaType)
            if (isMounted && response.success) {
                const mapped = response.data.map((item) => ({
                    name: item.name,
                    slug: item.slug,
                    region: item.region,
                    image: item.imageUrl,
                    pricing: item.rule?.pricing || null,
                    processingTime: item.rule?.processingTime || '',
                }))
                setCountries(mapped)
            }
            setLoading(false)
        }
        load()
        return () => {
            isMounted = false
        }
    }, [visaType])

    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return countries
        return countries.filter(country =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (country.region && country.region.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [searchQuery, countries])

    // Hero section content based on visa type
    const heroContent = isMarineCrew ? {
        title: "Marine Crew Visa Services",
        subtitle: "Professional visa assistance for seafarers. Join thousands of marine crew members who trust SkyNav for their transit and joining vessel visa needs.",
        placeholder: "Search for your destination country..."
    } : {
        title: "Get Your Visa on Time",
        subtitle: "99.2% on-time delivery rate. Join 2M+ travelers who trust SkyNav for their visa needs.",
        placeholder: "Where do you want to go?"
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <section className="bg-primary-900 py-20 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        {heroContent.title}
                    </h1>
                    <p className="text-primary-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
                        {heroContent.subtitle}
                    </p>

                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder={heroContent.placeholder}
                            className="w-full pl-14 pr-6 py-5 rounded-2xl text-lg font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/50 transition-all placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                {isMarineCrew && (
                    <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium">
                            <strong>Important Note:</strong> Marine crew visa eligibility depends on port, vessel flag, nationality, and joining location. Additional documents may be required by immigration authorities.
                        </p>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 font-medium text-lg">Loading visa destinations...</p>
                    </div>
                ) : filteredCountries.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCountries.map((country, index) => (
                            <VisaCountryCard key={index} country={country} visaType={visaType} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 font-medium text-lg">No countries found matching "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-4 text-primary-600 font-bold hover:underline"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VisasPage
