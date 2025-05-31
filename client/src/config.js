export const API_URL = 'https://capstone-pbgi.onrender.com';

export const fetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Origin': 'https://capstone-ochre-kappa.vercel.app'
  },
  mode: 'cors'
};

export async function tryAPI(path, customOptions = {}) {
  try {
    const options = {
      ...fetchOptions,
      ...customOptions,
      headers: {
        ...fetchOptions.headers,
        ...customOptions.headers
      }
    };
    
    const response = await fetch(`${API_URL}${path}`, options);
    if (response.ok) return response;
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API request failed: ${response.status}`);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
