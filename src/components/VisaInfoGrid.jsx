import React from 'react'
import { FaTicketAlt, FaCalendarAlt, FaClock, FaSignInAlt, FaBolt, FaFileAlt, FaGlobe, FaFingerprint, FaUserCheck, FaStar } from 'react-icons/fa'

const iconMap = {
    FaTicketAlt,
    FaCalendarAlt,
    FaClock,
    FaSignInAlt,
    FaBolt,
    FaFileAlt,
    FaGlobe,
    FaFingerprint,
    FaUserCheck,
    FaStar
}

const VisaInfoGrid = ({ infoGrid }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {infoGrid.map((info, index) => {
                const Icon = iconMap[info.icon] || iconMap.FaFileAlt
                return (
                    <div key={index} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl transition-all hover:bg-white hover:shadow-md group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Icon size={18} />
                            </div>
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{info.label}</span>
                        </div>
                        <p className="text-slate-900 font-bold text-lg">{info.value}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default VisaInfoGrid
