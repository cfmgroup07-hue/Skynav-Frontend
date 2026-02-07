import { request } from './apiClient';

export const fetchAdminUsers = (token) => request('/admin/users', { token });
export const updateUser = (id, payload, token) =>
  request(`/admin/users/${id}`, { method: 'PATCH', token, body: payload });
export const deleteUser = (id, token) =>
  request(`/admin/users/${id}`, { method: 'DELETE', token });

export const fetchAdminBookings = (token) => request('/admin/bookings', { token });

export const fetchVisaApplications = (token, status) =>
  request(`/admin/visa-applications${status ? `?status=${status}` : ''}`, { token });

export const fetchVisaCountries = (token) => request('/admin/visa-countries', { token });

export const createVisaCountry = (payload, token) =>
  request('/admin/visa-countries', { method: 'POST', token, body: payload });
export const updateVisaCountry = (id, payload, token) =>
  request(`/admin/visa-countries/${id}`, { method: 'PATCH', token, body: payload });
export const deleteVisaCountry = (id, token) =>
  request(`/admin/visa-countries/${id}`, { method: 'DELETE', token });

export const upsertVisaRule = (payload, token) =>
  request('/admin/visa-rules', { method: 'POST', token, body: payload });

export const fetchPayments = (token) => request('/admin/payments', { token });

export const fetchBanners = (token) => request('/admin/cms/banners', { token });
export const upsertBanner = (payload, token, id) =>
  request(`/admin/cms/banners${id ? `/${id}` : ''}`, {
    method: id ? 'PATCH' : 'POST',
    token,
    body: payload,
  });

export const fetchPages = (token) => request('/admin/cms/pages', { token });
export const upsertPage = (payload, token, id) =>
  request(`/admin/cms/pages${id ? `/${id}` : ''}`, {
    method: id ? 'PATCH' : 'POST',
    token,
    body: payload,
  });

export const fetchFaqs = (token) => request('/admin/cms/faqs', { token });
export const upsertFaq = (payload, token, id) =>
  request(`/admin/cms/faqs${id ? `/${id}` : ''}`, {
    method: id ? 'PATCH' : 'POST',
    token,
    body: payload,
  });

export const fetchReports = (token) => request('/admin/reports', { token });
