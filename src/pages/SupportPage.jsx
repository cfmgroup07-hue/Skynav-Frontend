import { Link } from 'react-router-dom'

function SupportPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white border border-primary-100 rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-primary-800 mb-4">Customer Support</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm text-primary-700">
                If you need help with bookings, refunds, or general inquiries, our support team is here to help.
              </p>

              <div className="pt-3">
                <h3 className="text-sm font-medium text-primary-800">Support Email</h3>
                <a href="mailto:support@sky-nav.net" className="text-primary-600 hover:underline">support@sky-nav.net</a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary-800">Phone</h3>
                <a href="tel:+61461535540" className="text-primary-600 hover:underline">+61 461 535 540</a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary-800">Business Inquiries</h3>
                <a href="mailto:hello@sky-nav.net" className="text-primary-600 hover:underline">hello@sky-nav.net</a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary-800">Office Address</h3>
              <p className="text-sm text-primary-700">
                12 Maranoa St, Paramatta Park, Cairns, Queensland, AU 4870.
              </p>

              <h3 className="text-sm font-medium text-primary-800 mt-3">Refunds</h3>
              <p className="text-sm text-primary-700">
                For refunds, please email{' '}
                <a href="mailto:refund@sky-nav.net" className="text-primary-600 hover:underline">refund@sky-nav.net</a>
              </p>

              <div className="mt-4 bg-primary-50 border border-primary-100 rounded-md p-4">
                <h4 className="text-sm font-semibold text-primary-800">Support Hours</h4>
                <p className="text-sm text-primary-700">Support Hours: <strong>24/7</strong></p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-primary-100 pt-6">
            <h2 className="text-lg font-semibold text-primary-800 mb-3">Quick help</h2>
            <ul className="space-y-2 text-sm text-primary-700">
              <li>
                - <Link to="/faq" className="text-primary-600 hover:underline">Check our FAQ</Link> for common questions.
              </li>
              <li>- Need faster help? Reply to any support email with your booking reference.</li>
              <li>- For business partnerships, mark emails with <strong>Business Inquiry</strong> in the subject.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage

