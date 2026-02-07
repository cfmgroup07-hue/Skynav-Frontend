import { request } from './apiClient';

export const listVisas = async (type = 'tourist') =>
  request(`/visas/list?type=${type}`);

export const getVisaDetail = async (country, type = 'tourist') =>
  request(`/visas/${country}?type=${type}`);

export const applyVisa = async (payload, token) =>
  request('/visas/apply', { method: 'POST', token, body: payload });

export const getVisaApplication = async (id, token) =>
  request(`/visas/application/${id}`, { token });

export const getMyVisaApplications = async (token) =>
  request('/visas/application/status/my', { token });

export const updateVisaApplicationStatus = async (id, status, remarks, token) =>
  request(`/visas/application/status/${id}`, {
    method: 'PATCH',
    token,
    body: { status, remarks },
  });
