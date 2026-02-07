import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchVisaCountries, createVisaCountry, updateVisaCountry, deleteVisaCountry, upsertVisaRule } from '../../services/adminService'

const AdminVisaRulesPage = () => {
  const { token } = useAuth()
  const [countries, setCountries] = useState([])
  const [countryForm, setCountryForm] = useState({
    name: '',
    slug: '',
    code: '',
    region: '',
    imageUrl: '',
  })
  const [ruleForm, setRuleForm] = useState({
    countryId: '',
    type: 'tourist',
    title: '',
    description: '',
    processingTime: '',
    validity: '',
    entryType: '',
    maxStay: '',
    pricing: { amount: 0, currency: 'USD' },
    documents: '',
    requirements: '',
    whyUs: '',
  })

  const load = async () => {
    const res = await fetchVisaCountries(token)
    if (res.success) setCountries(res.countries)
  }

  useEffect(() => {
    if (token) load()
  }, [token])

  const submitCountry = async (e) => {
    e.preventDefault()
    const payload = { ...countryForm }
    if (!payload.slug) payload.slug = payload.name.toLowerCase().replace(/\s+/g, '-')
    const res = await createVisaCountry(payload, token)
    if (res.success) {
      setCountryForm({ name: '', slug: '', code: '', region: '', imageUrl: '' })
      load()
    }
  }

  const submitRule = async (e) => {
    e.preventDefault()
    const payload = {
      ...ruleForm,
      documents: ruleForm.documents.split('\n').filter(Boolean),
      requirements: ruleForm.requirements.split('\n').filter(Boolean),
      whyUs: ruleForm.whyUs.split('\n').filter(Boolean),
    }
    const res = await upsertVisaRule(payload, token)
    if (res.success) {
      setRuleForm({ ...ruleForm, title: '', description: '', processingTime: '', validity: '', entryType: '', maxStay: '', documents: '', requirements: '', whyUs: '' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Add Visa Country</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitCountry}>
          {['name', 'slug', 'code', 'region', 'imageUrl'].map((field) => (
            <input
              key={field}
              value={countryForm[field]}
              onChange={(e) => setCountryForm((prev) => ({ ...prev, [field]: e.target.value }))}
              placeholder={field}
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
              required={field === 'name' || field === 'code'}
            />
          ))}
          <button className="bg-primary-600 text-white rounded-xl px-4 py-2 font-semibold">Save Country</button>
        </form>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Add / Update Visa Rule</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitRule}>
          <select
            value={ruleForm.countryId}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, countryId: e.target.value }))}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
            required
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <select
            value={ruleForm.type}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, type: e.target.value }))}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          >
            <option value="tourist">Tourist</option>
            <option value="business">Business</option>
            <option value="marine">Marine</option>
          </select>
          <input
            value={ruleForm.title}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="title"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
            required
          />
          <input
            value={ruleForm.processingTime}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, processingTime: e.target.value }))}
            placeholder="processing time"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <input
            value={ruleForm.validity}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, validity: e.target.value }))}
            placeholder="validity"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <input
            value={ruleForm.entryType}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, entryType: e.target.value }))}
            placeholder="entry type"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <input
            value={ruleForm.maxStay}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, maxStay: e.target.value }))}
            placeholder="max stay"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <input
            value={ruleForm.pricing.amount}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, pricing: { ...prev.pricing, amount: Number(e.target.value) } }))}
            placeholder="price"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm"
          />
          <textarea
            value={ruleForm.description}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="description"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm md:col-span-2"
          />
          <textarea
            value={ruleForm.documents}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, documents: e.target.value }))}
            placeholder="documents (one per line)"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm md:col-span-2"
          />
          <textarea
            value={ruleForm.requirements}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, requirements: e.target.value }))}
            placeholder="requirements (one per line)"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm md:col-span-2"
          />
          <textarea
            value={ruleForm.whyUs}
            onChange={(e) => setRuleForm((prev) => ({ ...prev, whyUs: e.target.value }))}
            placeholder="why us (one per line)"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm md:col-span-2"
          />
          <button className="bg-primary-600 text-white rounded-xl px-4 py-2 font-semibold">Save Rule</button>
        </form>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Countries</h3>
        <div className="space-y-2">
          {countries.map((c) => (
            <div key={c._id} className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-2">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-slate-400">{c.code} • {c.region}</p>
              </div>
              <button className="text-red-600 text-xs" onClick={() => deleteVisaCountry(c._id, token).then(load)}>Delete</button>
            </div>
          ))}
          {countries.length === 0 && <p className="text-sm text-slate-500">No countries yet.</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminVisaRulesPage
