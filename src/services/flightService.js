import { request } from './apiClient';

export const searchFlights = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/flights/search${query ? `?${query}` : ''}`);
};

export const getFlight = (id) => request(`/flights/${id}`);

export const createFlight = (payload, token) =>
  request('/flights/create', { method: 'POST', token, body: payload });

export const updateFlight = (id, payload, token) =>
  request(`/flights/update/${id}`, { method: 'PATCH', token, body: payload });

export const deleteFlight = (id, token) =>
  request(`/flights/delete/${id}`, { method: 'DELETE', token });
