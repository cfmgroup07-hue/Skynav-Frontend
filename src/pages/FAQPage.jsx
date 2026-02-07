function FAQPage() {
  const faqs = [
    {
      question: 'How do I book a flight?',
      answer: 'Simply enter your departure and destination cities, select your travel dates, and choose the number of passengers. Click search to see available flights and select the one that best suits your needs.'
    },
    {
      question: 'Can I modify or cancel my booking?',
      answer: 'Yes, you can modify or cancel your booking through your account dashboard. Cancellation policies vary by airline and fare type, so please check your booking confirmation for specific terms.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and various digital payment methods. All transactions are processed securely through encrypted payment gateways.'
    },
    {
      question: 'How do I get my boarding pass?',
      answer: 'You can access your boarding pass through your account dashboard or via our mobile app. Most airlines also send boarding passes via email 24 hours before departure.'
    },
    {
      question: 'What if my flight is delayed or cancelled?',
      answer: 'If your flight is delayed or cancelled, we\'ll notify you immediately via email and SMS. Our disruption protection team will help you find alternative flights or process refunds as per airline policies.'
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we offer optional travel insurance that covers trip cancellation, medical emergencies, and baggage loss. You can add it during the booking process.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our 24/7 customer support team via email at support@sky-nav.net, phone at +1 (555) 123-4567, or through the live chat feature on our website.'
    },
    {
      question: 'Are there any booking fees?',
      answer: 'We strive to be transparent with our pricing. Any applicable fees are clearly displayed before you complete your booking. Some airlines may charge additional fees for services like seat selection or baggage.'
    }
  ]

  return (
    <div className="min-h-screen bg-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h2>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <a href="/contact" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
            Contact our support team →
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQPage

