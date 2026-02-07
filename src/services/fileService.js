import { request } from './apiClient';

export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  return request('/files/upload', { method: 'POST', token, body: formData });
};

export const getFileMeta = async (id, token) =>
  request(`/files/${id}`, { token });
