import React, { createContext, useContext, useState, useEffect } from 'react'

const RegionalSettingsContext = createContext()

export const RegionalSettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        country: 'India',
        currency: 'INR',
        language: 'English',
        flag: '🇮🇳'
    })

    // Simple hardcoded map for demo purposes
    const regions = {
        'India': { currency: 'INR', flag: '🇮🇳', locale: 'en-IN' },
        'United States': { currency: 'USD', flag: '🇺🇸', locale: 'en-US' },
        'United Kingdom': { currency: 'GBP', flag: '🇬🇧', locale: 'en-GB' },
        'UAE': { currency: 'AED', flag: '🇦🇪', locale: 'en-AE' },
    }

    const updateRegion = (countryName) => {
        const regionData = regions[countryName]
        if (regionData) {
            setSettings(prev => ({
                ...prev,
                country: countryName,
                currency: regionData.currency,
                flag: regionData.flag
            }))
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(regions[settings.country]?.locale || 'en-IN', {
            style: 'currency',
            currency: settings.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <RegionalSettingsContext.Provider value={{ settings, updateRegion, formatCurrency, regions }}>
            {children}
        </RegionalSettingsContext.Provider>
    )
}

export const useRegionalSettings = () => {
    const context = useContext(RegionalSettingsContext)
    if (!context) {
        throw new Error('useRegionalSettings must be used within a RegionalSettingsProvider')
    }
    return context
}
