import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchBanners, upsertBanner, fetchPages, upsertPage, fetchFaqs, upsertFaq } from '../../services/adminService'

const AdminCmsPage = () => {
  const { token } = useAuth()
  const [banners, setBanners] = useState([])
  const [pages, setPages] = useState([])
  const [faqs, setFaqs] = useState([])

  const [bannerForm, setBannerForm] = useState({ title: '', imageUrl: '', linkUrl: '' })
  const [pageForm, setPageForm] = useState({ title: '', slug: '', content: '' })
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: '' })

  const load = async () => {
    const [b, p, f] = await Promise.all([fetchBanners(token), fetchPages(token), fetchFaqs(token)])
    if (b.success) setBanners(b.banners)
    if (p.success) setPages(p.pages)
    if (f.success) setFaqs(f.faqs)
  }

  useEffect(() => {
    if (token) load()
  }, [token])

  const submitBanner = async (e) => {
    e.preventDefault()
    const res = await upsertBanner(bannerForm, token)
    if (res.success) {
      setBannerForm({ title: '', imageUrl: '', linkUrl: '' })
      load()
    }
  }

  const submitPage = async (e) => {
    e.preventDefault()
    const payload = { ...pageForm }
    if (!payload.slug) payload.slug = payload.title.toLowerCase().replace(/\s+/g, '-')
    const res = await upsertPage(payload, token)
    if (res.success) {
      setPageForm({ title: '', slug: '', content: '' })
      load()
    }
  }

  const submitFaq = async (e) => {
    e.preventDefault()
    const res = await upsertFaq(faqForm, token)
    if (res.success) {
      setFaqForm({ question: '', answer: '', category: '' })
      load()
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Homepage Banners</h3>
            <p className="text-sm text-slate-500">These banners appear on the homepage hero slider.</p>
          </div>
          <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">Marketing</span>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitBanner}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Banner title</label>
            <input
              value={bannerForm.title}
              onChange={(e) => setBannerForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Summer sale banner"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Image URL</label>
            <input
              value={bannerForm.imageUrl}
              onChange={(e) => setBannerForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://..."
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Link URL (optional)</label>
            <input
              value={bannerForm.linkUrl}
              onChange={(e) => setBannerForm((prev) => ({ ...prev, linkUrl: e.target.value }))}
              placeholder="/promotions/summer"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary-600 text-white rounded-xl px-4 py-2 font-semibold shadow-sm hover:bg-primary-700">
              Save Banner
            </button>
          </div>
        </form>
        <div className="mt-6 space-y-2">
          {banners.map((b) => (
            <div key={b._id} className="border border-slate-100 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">{b.title}</p>
                <p className="text-xs text-slate-400">{b.linkUrl || 'No link'}</p>
              </div>
              <span className="text-xs text-slate-400">Banner</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">Static Pages</h3>
            <p className="text-sm text-slate-500">Create legal, policy, and support pages shown in the footer.</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Content</span>
        </div>
        <form className="space-y-6" onSubmit={submitPage}>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-slate-600">Page title</label>
            <input
              value={pageForm.title}
              onChange={(e) => setPageForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Privacy Policy"
              className="border border-slate-200 rounded-full px-5 py-2.5 text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-slate-600">Slug</label>
            <input
              value={pageForm.slug}
              onChange={(e) => setPageForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="privacy-policy"
              className="border border-slate-200 rounded-full px-5 py-2.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-start gap-4">
            <label className="text-sm font-semibold text-slate-600 pt-2">Content</label>
            <textarea
              value={pageForm.content}
              onChange={(e) => setPageForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write the page content..."
              className="border border-slate-200 rounded-3xl px-5 py-4 text-sm min-h-[160px]"
            />
          </div>
          <div className="md:pl-[140px]">
            <button className="bg-primary-700 text-white rounded-full px-6 py-2.5 font-semibold shadow-sm hover:bg-primary-800">
              Save Page
            </button>
          </div>
        </form>
        <div className="mt-6 space-y-2">
          {pages.map((p) => (
            <div key={p._id} className="border border-slate-100 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">{p.title}</p>
                <p className="text-xs text-slate-400">/{p.slug}</p>
              </div>
              <span className="text-xs text-slate-400">Page</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">FAQs</h3>
            <p className="text-sm text-slate-500">Add common questions shown on the support and FAQ pages.</p>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Support</span>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitFaq}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Question</label>
            <input
              value={faqForm.question}
              onChange={(e) => setFaqForm((prev) => ({ ...prev, question: e.target.value }))}
              placeholder="How long does visa processing take?"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Answer</label>
            <input
              value={faqForm.answer}
              onChange={(e) => setFaqForm((prev) => ({ ...prev, answer: e.target.value }))}
              placeholder="Most visas are approved within 5-7 business days."
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Category (optional)</label>
            <input
              value={faqForm.category}
              onChange={(e) => setFaqForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Visa, Payments, Documents"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm w-full"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary-600 text-white rounded-xl px-4 py-2 font-semibold">
              Save FAQ
            </button>
          </div>
        </form>
        <div className="mt-6 space-y-2">
          {faqs.map((f) => (
            <div key={f._id} className="border border-slate-100 rounded-xl px-4 py-3 text-sm">
              <p className="font-semibold text-slate-700">{f.question}</p>
              <p className="text-xs text-slate-400">{f.category || 'General'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCmsPage
