import React from 'react'
import { FaStar, FaUserCircle } from 'react-icons/fa'

const VisaReviews = ({ reviews }) => {
    return (
        <section className="mt-16 border-t border-slate-100 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={18} fill={i < Math.floor(reviews.average) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={20} />
                            ))}
                        </div>
                        <span className="text-3xl font-black text-slate-900">{reviews.average}</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">User Reviews</h2>
                    <p className="text-slate-500 font-medium">{reviews.total} verified travelers</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {reviews.tokens.map((token, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-sm font-bold"
                        >
                            {token}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.items.map((review, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                <FaUserCircle size={32} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{review.name}</h4>
                                <p className="text-xs text-slate-400 font-medium">{review.location}</p>
                            </div>
                        </div>

                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} stroke="currentColor" />
                            ))}
                        </div>

                        <p className="text-slate-600 leading-relaxed text-sm font-medium">
                            "{review.comment}"
                        </p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 border-2 border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                View All Reviews
            </button>
        </section>
    )
}

export default VisaReviews
