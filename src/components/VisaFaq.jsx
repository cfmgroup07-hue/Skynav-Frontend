import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa'

const VisaFaq = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                    <FaQuestionCircle size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((category, catIndex) => (
                    <div key={catIndex} className="border-b border-slate-100 last:border-0">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 mt-6">
                            {category.category}
                        </h3>
                        <div className="space-y-3">
                            {category.questions.map((faq, index) => {
                                const globalIndex = `${catIndex}-${index}`
                                const isOpen = openIndex === globalIndex

                                return (
                                    <div
                                        key={index}
                                        className={`rounded-2xl transition-all duration-300 ${isOpen ? 'bg-slate-50 p-6' : 'bg-transparent border border-transparent hover:border-slate-100 p-4'}`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                            className="w-full flex items-center justify-between text-left group"
                                        >
                                            <span className={`font-bold transition-colors ${isOpen ? 'text-primary-700 text-lg' : 'text-slate-700'}`}>
                                                {faq.q}
                                            </span>
                                            {isOpen ? (
                                                <FaChevronUp className="text-primary-500" />
                                            ) : (
                                                <FaChevronDown className="text-slate-400 group-hover:text-primary-400 transition-colors" />
                                            )}
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-slate-600 leading-relaxed font-medium">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default VisaFaq
