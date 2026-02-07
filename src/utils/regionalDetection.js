// Regional detection utility
// This file contains the detection logic that can be used across the app

// Comprehensive list of countries (subset for detection)
const countries = [
  { code: 'US', name: 'United States', currency: 'USD', language: 'en-US' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', language: 'en-GB' },
  { code: 'IN', name: 'India', currency: 'INR', language: 'en-IN' },
  { code: 'CA', name: 'Canada', currency: 'CAD', language: 'en-CA' },
  { code: 'AU', name: 'Australia', currency: 'AUD', language: 'en-AU' },
  { code: 'DE', name: 'Germany', currency: 'EUR', language: 'de' },
  { code: 'FR', name: 'France', currency: 'EUR', language: 'fr' },
  { code: 'ES', name: 'Spain', currency: 'EUR', language: 'es' },
  { code: 'IT', name: 'Italy', currency: 'EUR', language: 'it' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', language: 'nl' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', language: 'fr' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', language: 'de' },
  { code: 'AT', name: 'Austria', currency: 'EUR', language: 'de' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', language: 'sv' },
  { code: 'NO', name: 'Norway', currency: 'NOK', language: 'no' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', language: 'da' },
  { code: 'FI', name: 'Finland', currency: 'EUR', language: 'fi' },
  { code: 'PL', name: 'Poland', currency: 'PLN', language: 'pl' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', language: 'pt' },
  { code: 'GR', name: 'Greece', currency: 'EUR', language: 'el' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', language: 'en-IE' },
  { code: 'CZ', name: 'Czech Republic', currency: 'CZK', language: 'cs' },
  { code: 'HU', name: 'Hungary', currency: 'HUF', language: 'hu' },
  { code: 'RO', name: 'Romania', currency: 'RON', language: 'ro' },
  { code: 'BG', name: 'Bulgaria', currency: 'BGN', language: 'bg' },
  { code: 'HR', name: 'Croatia', currency: 'EUR', language: 'hr' },
  { code: 'SK', name: 'Slovakia', currency: 'EUR', language: 'sk' },
  { code: 'SI', name: 'Slovenia', currency: 'EUR', language: 'sl' },
  { code: 'JP', name: 'Japan', currency: 'JPY', language: 'ja' },
  { code: 'CN', name: 'China', currency: 'CNY', language: 'zh' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', language: 'ko' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', language: 'en-SG' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', language: 'ms' },
  { code: 'TH', name: 'Thailand', currency: 'THB', language: 'th' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', language: 'id' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', language: 'en-PH' },
  { code: 'VN', name: 'Vietnam', currency: 'VND', language: 'vi' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', language: 'ar' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', language: 'ar' },
  { code: 'IL', name: 'Israel', currency: 'ILS', language: 'he' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', language: 'tr' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', language: 'ar' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', language: 'en-ZA' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', language: 'en-NG' },
  { code: 'KE', name: 'Kenya', currency: 'KES', language: 'en-KE' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', language: 'pt-BR' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', language: 'es-MX' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', language: 'es-AR' },
  { code: 'CL', name: 'Chile', currency: 'CLP', language: 'es-CL' },
  { code: 'CO', name: 'Colombia', currency: 'COP', language: 'es-CO' },
  { code: 'PE', name: 'Peru', currency: 'PEN', language: 'es-PE' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', language: 'en-NZ' },
  { code: 'RU', name: 'Russia', currency: 'RUB', language: 'ru' },
  { code: 'UA', name: 'Ukraine', currency: 'UAH', language: 'uk' },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', language: 'ur' },
  { code: 'BD', name: 'Bangladesh', currency: 'BDT', language: 'bn' },
  { code: 'LK', name: 'Sri Lanka', currency: 'LKR', language: 'si' },
]

const languages = [
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'en-CA', name: 'English (Canada)' },
  { code: 'en-AU', name: 'English (Australia)' },
  { code: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'en-IE', name: 'English (Ireland)' },
  { code: 'en-ZA', name: 'English (South Africa)' },
  { code: 'en-SG', name: 'English (Singapore)' },
  { code: 'en-IN', name: 'English (India)' },
  { code: 'en-PH', name: 'English (Philippines)' },
  { code: 'en-NG', name: 'English (Nigeria)' },
  { code: 'en-KE', name: 'English (Kenya)' },
  { code: 'es', name: 'Spanish' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'es-AR', name: 'Spanish (Argentina)' },
  { code: 'es-CL', name: 'Spanish (Chile)' },
  { code: 'es-CO', name: 'Spanish (Colombia)' },
  { code: 'es-PE', name: 'Spanish (Peru)' },
  { code: 'fr', name: 'French' },
  { code: 'fr-CA', name: 'French (Canada)' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'si', name: 'Sinhala' },
]

// Country to currency mapping
const countryToCurrency = {}
countries.forEach(country => {
  countryToCurrency[country.code] = country.currency
})

// Language code to full language code mapping
const languageCodeMap = {
  'en': 'en-US',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'it': 'it',
  'pt': 'pt',
  'nl': 'nl',
  'ru': 'ru',
  'ja': 'ja',
  'zh': 'zh',
  'ko': 'ko',
  'ar': 'ar',
  'hi': 'hi',
  'th': 'th',
  'vi': 'vi',
  'id': 'id',
  'ms': 'ms',
  'tr': 'tr',
  'pl': 'pl',
  'sv': 'sv',
  'no': 'no',
  'da': 'da',
  'fi': 'fi',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'bg': 'bg',
  'hr': 'hr',
  'sk': 'sk',
  'sl': 'sl',
  'el': 'el',
  'he': 'he',
  'uk': 'uk',
  'ur': 'ur',
  'bn': 'bn',
  'si': 'si',
}

// Auto-detect user's location, language, and currency
export const detectUserSettings = async () => {
  let detectedCountry = 'US'
  let detectedLanguage = 'en-US'
  let detectedCurrency = 'USD'

  try {
    // Detect language from browser
    const browserLang = navigator.language || navigator.userLanguage || 'en-US'
    const langCode = browserLang.split('-')[0]
    const fullLangCode = browserLang.includes('-') ? browserLang : languageCodeMap[browserLang] || browserLang
    
    // Check if language exists in our list
    const langExists = languages.find(l => l.code === fullLangCode || l.code.startsWith(langCode))
    if (langExists) {
      detectedLanguage = langExists.code
    }

    // Try to detect country from timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timezoneToCountry = {
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Phoenix': 'US',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Zurich': 'CH',
      'Europe/Vienna': 'AT',
      'Europe/Stockholm': 'SE',
      'Europe/Oslo': 'NO',
      'Europe/Copenhagen': 'DK',
      'Europe/Helsinki': 'FI',
      'Europe/Warsaw': 'PL',
      'Europe/Lisbon': 'PT',
      'Europe/Athens': 'GR',
      'Europe/Dublin': 'IE',
      'Europe/Prague': 'CZ',
      'Europe/Budapest': 'HU',
      'Europe/Bucharest': 'RO',
      'Europe/Sofia': 'BG',
      'Europe/Zagreb': 'HR',
      'Europe/Bratislava': 'SK',
      'Europe/Ljubljana': 'SI',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Seoul': 'KR',
      'Asia/Singapore': 'SG',
      'Asia/Kuala_Lumpur': 'MY',
      'Asia/Bangkok': 'TH',
      'Asia/Jakarta': 'ID',
      'Asia/Manila': 'PH',
      'Asia/Ho_Chi_Minh': 'VN',
      'Asia/Dubai': 'AE',
      'Asia/Riyadh': 'SA',
      'Asia/Jerusalem': 'IL',
      'Asia/Istanbul': 'TR',
      'Africa/Cairo': 'EG',
      'Africa/Johannesburg': 'ZA',
      'Africa/Lagos': 'NG',
      'Africa/Nairobi': 'KE',
      'America/Sao_Paulo': 'BR',
      'America/Mexico_City': 'MX',
      'America/Buenos_Aires': 'AR',
      'America/Santiago': 'CL',
      'America/Bogota': 'CO',
      'America/Lima': 'PE',
      'Pacific/Auckland': 'NZ',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'Asia/Kolkata': 'IN',
      'Asia/Dhaka': 'BD',
      'Asia/Colombo': 'LK',
      'Asia/Karachi': 'PK',
    }
    
    if (timezoneToCountry[timezone]) {
      detectedCountry = timezoneToCountry[timezone]
    }

    // Try IP-based geolocation (fallback)
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (response.ok) {
        const data = await response.json()
        if (data.country_code) {
          detectedCountry = data.country_code
        }
        if (data.currency) {
          detectedCurrency = data.currency
        }
      }
    } catch (error) {
      console.log('IP geolocation failed, using timezone detection')
    }

    // Get currency from country
    if (countryToCurrency[detectedCountry]) {
      detectedCurrency = countryToCurrency[detectedCountry]
    }

    // If language matches country, use country-specific language
    const country = countries.find(c => c.code === detectedCountry)
    if (country && country.language) {
      const countryLang = languages.find(l => l.code === country.language)
      if (countryLang) {
        detectedLanguage = countryLang.code
      }
    }

  } catch (error) {
    console.log('Auto-detection error:', error)
  }

  return {
    country: detectedCountry,
    language: detectedLanguage,
    currency: detectedCurrency
  }
}

