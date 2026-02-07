const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const request = async (path, { method = 'GET', token, body, headers } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  const data = await response.json();
  return data;
};

export { API_URL, request };
