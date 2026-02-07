import { request } from './apiClient';

export const createPayment = (payload, token) =>
  request('/payments/create', { method: 'POST', token, body: payload });

export const requestRefund = (reference, token) =>
  request('/refunds/request', { method: 'POST', token, body: { reference } });
