import { marineCrewVisaCountries } from './marineCrewVisaCountries'

export const visaDetails = {
    thailand: {
        title: "Thailand Digital Arrival Card (TDAC)",
        image: "https://images.unsplash.com/photo-1740198828863-71fff82d3123?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8",
        badge: "TDAC in 1 hour",
        rating: "4.7+",
        trustedBy: "125k+ Indians",
        infoGrid: [
            { label: "Visa Type", value: "TDAC", icon: "FaTicketAlt" },
            { label: "Validity", value: "90 days", icon: "FaCalendarAlt" },
            { label: "Length of Stay", value: "30 days", icon: "FaClock" },
            { label: "Entry", value: "Single", icon: "FaSignInAlt" },
            { label: "Processing", value: "Fastest", icon: "FaBolt" }
        ],
        description: "The Thailand Digital Arrival Card (TDAC) is a mandatory travel document for all foreign nationals entering Thailand. Atlys simplifies this process by handling the application digitally, ensuring you skip manual forms at the airport.",
        whyUs: [
            "Skip long immigration lines",
            "Hassle-free mobile-first application",
            "Guaranteed on-time delivery",
            "100% refund on rejection"
        ],
        pricing: {
            governmentFee: 0,
            platformFee: 99,
            discount: 99,
            total: 1
        },
        faqs: [
            {
                category: "General Information",
                questions: [
                    { q: "What is TDAC?", a: "TDAC is an electronic arrival card required for entry into Thailand." },
                    { q: "How long does it take?", a: "Typically processed within 1 hour." }
                ]
            },
            {
                category: "Eligibility & Requirements",
                questions: [
                    { q: "Who needs it?", a: "All travelers except Thai nationals." }
                ]
            }
        ],
        reviews: {
            average: 4.75,
            total: 826,
            tokens: ["Quick Decision", "Easy Application", "On Time"],
            items: [
                { name: "William Feroze", rating: 5, comment: "I got Saudi and Thailand visa on time. Excellent service.", location: "Pune, Maharashtra" },
                { name: "Aritra Adak", rating: 5, comment: "Smooth process with SkyNav. Seamless guidance for my TDAC.", location: "Bangalore, Karnataka" }
            ]
        }
    },
    unitedarabemirates: {
        title: "UAE Tourist Visa",
        image: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dWFlfGVufDB8fDB8fHww",
        badge: "Process in 24 hours",
        rating: "4.8+",
        trustedBy: "200k+ Travelers",
        infoGrid: [
            { label: "Visa Type", value: "Tourist", icon: "FaTicketAlt" },
            { label: "Validity", value: "60 days", icon: "FaCalendarAlt" },
            { label: "Length of Stay", value: "30 days", icon: "FaClock" },
            { label: "Entry", value: "Single", icon: "FaSignInAlt" },
            { label: "Processing", value: "Express", icon: "FaBolt" }
        ],
        description: "Apply for your United Arab Emirates (UAE) visa online with ease. Whether you're visiting Dubai, Abu Dhabi, or any other emirate, our streamlined process ensures you get your visa quickly and without hassle.",
        whyUs: [
            "99.9% Approval Rate",
            "Express 24h Delivery",
            "Minimum Documentation",
            "24/7 Support"
        ],
        pricing: {
            governmentFee: 3500,
            platformFee: 500,
            discount: 200,
            total: 3800
        },
        faqs: [
            {
                category: "General Information",
                questions: [
                    { q: "Do I need insurance?", a: "Travel insurance is highly recommended." },
                    { q: "Can I extend my stay?", a: "Yes, extensions are possible for certain visa types." }
                ]
            }
        ],
        reviews: {
            average: 4.8,
            total: 1250,
            tokens: ["Fast", "Reliable", "Great Support"],
            items: [
                { name: "Rahul Sharma", rating: 5, comment: " Got my Dubai visa in just 4 hours! Amazing service.", location: "Mumbai, India" }
            ]
        }
    },
    switzerland: {
        title: "Switzerland Schengen Visa",
        image: "https://images.unsplash.com/photo-1594069758873-e79e9075eb7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D",
        badge: "High Support Required",
        rating: "4.9+",
        trustedBy: "80k+ Travelers",
        infoGrid: [
            { label: "Visa Type", value: "Schengen", icon: "FaTicketAlt" },
            { label: "Validity", value: "180 days", icon: "FaCalendarAlt" },
            { label: "Length of Stay", value: "90 days", icon: "FaClock" },
            { label: "Entry", value: "Multiple", icon: "FaSignInAlt" },
            { label: "Processing", value: "Standard", icon: "FaBolt" }
        ],
        description: "Visit Switzerland with a Schengen visa. Experience the Alps, pristine lakes, and world-class cities. We assist you with document preparation and appointment booking.",
        whyUs: [
            "Expert Document Review",
            "Appointment Assistance",
            "Form Filling Service",
            "Interview Prep"
        ],
        pricing: {
            governmentFee: 7200,
            platformFee: 1500,
            discount: 0,
            total: 8700
        },
        faqs: [
            {
                category: "General",
                questions: [
                    { q: "Is travel insurance mandatory?", a: "Yes, Schengen travel insurance is mandatory." }
                ]
            }
        ],
        reviews: {
            average: 4.9,
            total: 450,
            tokens: ["Professional", "Helpful", "Accurate"],
            items: []
        }
    },
    vietnam: {
        title: "Vietnam E-Visa",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D",
        badge: "Process in 4-5 Days",
        rating: "4.6+",
        trustedBy: "150k+ Travelers",
        infoGrid: [
            { label: "Visa Type", value: "E-Visa", icon: "FaTicketAlt" },
            { label: "Validity", value: "30-90 days", icon: "FaCalendarAlt" },
            { label: "Length of Stay", value: "Up to 90 days", icon: "FaClock" },
            { label: "Entry", value: "Single/Multi", icon: "FaSignInAlt" },
            { label: "Processing", value: "Online", icon: "FaBolt" }
        ],
        description: "Apply for your Vietnam E-Visa entirely online. Valid for entry through all major international airports, landports, and seaports.",
        whyUs: [
            "100% Online Process",
            "No Passport Send",
            "Direct E-Mail Delivery",
            "24/7 Support"
        ],
        pricing: {
            governmentFee: 2100,
            platformFee: 499,
            discount: 0,
            total: 2599
        },
        faqs: [
            {
                category: "General",
                questions: [
                    { q: "Which ports can I enter?", a: "There are 33 allowed ports of entry." }
                ]
            }
        ],
        reviews: {
            average: 4.6,
            total: 980,
            tokens: ["Easy", "Cheap", "Good"],
            items: []
        }
    }
}

// Marine Crew Visa Details Helper
const getMarineCrewVisaDetail = (countrySlug) => {
    const normalized = countrySlug.toLowerCase().replace(/-/g, '')
    const country = marineCrewVisaCountries.find(c => 
        c.name.toLowerCase().replace(/\s+/g, '') === normalized
    )
    
    if (!country) return null

    const mandatoryDocuments = [
        "Valid Passport (minimum 6 months validity)",
        "CDC / Seaman's Book",
        "Joining Vessel Letter",
        "Employer / Ship Manager Letter"
    ]

    return {
        title: `${country.name} Marine Crew Visa`,
        image: country.image,
        badge: country.priority === 'Very High' || country.priority === 'Critical' ? "High Priority" : "Standard Processing",
        rating: "4.7+",
        trustedBy: "10k+ Seafarers",
        infoGrid: [
            { label: "Visa Type", value: country.visaType, icon: "FaTicketAlt" },
            { label: "Region", value: country.region, icon: "FaGlobe" },
            { label: "Biometrics", value: country.requiresBiometrics ? "Required" : "Not Required", icon: "FaFingerprint" },
            { label: "Interview", value: country.requiresInterview ? "Required" : "Not Required", icon: "FaUserCheck" },
            { label: "Priority", value: country.priority, icon: "FaStar" }
        ],
        description: `Apply for your ${country.name} Marine Crew Visa. This visa is specifically designed for seafarers who need to transit through or join a vessel in ${country.name}. Eligibility depends on port, vessel flag, nationality, and joining location.`,
        whyUs: [
            "Expert Marine Crew Visa Assistance",
            "Document Preparation Support",
            "Fast Processing Times",
            "24/7 Support for Seafarers"
        ],
        mandatoryDocuments,
        pricing: {
            governmentFee: country.requiresBiometrics ? 5000 : 3000,
            platformFee: 1500,
            discount: 0,
            total: country.requiresBiometrics ? 6500 : 4500
        },
        faqs: [
            {
                category: "General Information",
                questions: [
                    { 
                        q: "What is a Marine Crew Visa?", 
                        a: "A Marine Crew Visa is a special visa category for seafarers who need to transit through or join a vessel in a foreign country. It's different from regular tourist or business visas." 
                    },
                    { 
                        q: "Who is eligible?", 
                        a: "Marine crew members with valid CDC/Seaman's Book, joining vessel letter, and employer/ship manager letter. Eligibility also depends on port, vessel flag, nationality, and joining location." 
                    }
                ]
            },
            {
                category: "Required Documents",
                questions: [
                    { 
                        q: "What documents do I need?", 
                        a: mandatoryDocuments.join(", ") 
                    },
                    { 
                        q: "Are additional documents required?", 
                        a: "Yes, additional documents may be required by immigration authorities depending on the specific country, port, and your nationality. Our team will guide you through the complete requirements." 
                    }
                ]
            },
            {
                category: "Processing & Requirements",
                questions: [
                    { 
                        q: "Do I need biometrics?", 
                        a: country.requiresBiometrics ? "Yes, biometrics are mandatory for this visa." : "No, biometrics are not required for this visa." 
                    },
                    { 
                        q: "Is an interview required?", 
                        a: country.requiresInterview ? "Yes, an interview is mandatory. We will assist you with interview preparation." : "No, an interview is not typically required." 
                    }
                ]
            }
        ],
        reviews: {
            average: 4.7,
            total: 350,
            tokens: ["Professional", "Fast", "Reliable"],
            items: [
                { 
                    name: "Captain Rajesh Kumar", 
                    rating: 5, 
                    comment: "Got my Singapore crew visa processed quickly. Excellent service for seafarers!", 
                    location: "Mumbai, India" 
                },
                { 
                    name: "Chief Engineer John", 
                    rating: 5, 
                    comment: "SkyNav made the UK seafarer visa process smooth. Highly recommended!", 
                    location: "Goa, India" 
                }
            ]
        }
    }
}

// Helper to handle 108 countries without bloat
export const getVisaDetail = (countrySlug, isMarineCrew = false) => {
    // Check if it's a marine crew visa first
    if (isMarineCrew) {
        const marineDetail = getMarineCrewVisaDetail(countrySlug)
        if (marineDetail) return marineDetail
    }

    const normalized = countrySlug.toLowerCase().replace(/-/g, '')
    if (visaDetails[normalized]) return visaDetails[normalized]

    // Default fallback data for other countries
    return {
        title: `${countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)} E-Visa`,
        image: `https://source.unsplash.com/1200x600/?${countrySlug},landmark`,
        badge: "Process in 24 hours",
        rating: "4.5+",
        trustedBy: "50k+ Travelers",
        infoGrid: [
            { label: "Visa Type", value: "E-Visa", icon: "FaTicketAlt" },
            { label: "Validity", value: "30 days", icon: "FaCalendarAlt" },
            { label: "Length of Stay", value: "15 days", icon: "FaClock" },
            { label: "Entry", value: "Single", icon: "FaSignInAlt" },
            { label: "Processing", value: "Standard", icon: "FaBolt" }
        ],
        description: `Easily apply for your ${countrySlug} visa online. Our platform ensures a smooth and error-free application process.`,
        whyUs: ["Easy Online Form", "Secure Payment", "24/7 Support", "Notification Alerts"],
        pricing: { governmentFee: 2500, platformFee: 500, discount: 0, total: 3000 },
        faqs: [{ category: "General", questions: [{ q: "Is this official?", a: "Yes, we process through official channels." }] }],
        reviews: { average: 4.6, total: 150, tokens: ["Reliable", "Fast"], items: [] }
    }
}
