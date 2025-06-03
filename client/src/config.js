export const API_URL = 'https://capstone-pbgi.onrender.com';

export const fetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': ' http://localhost:5173'
  }
};

export async function tryAPI(path, customOptions = {}) {
  try {
    const options = {
      credentials: 'include', // Ensure this is always set
      ...fetchOptions,
      ...customOptions,
      headers: {
        ...fetchOptions.headers,
        ...customOptions.headers
      }
    };
    
    // Add token from cookie if available
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      options.headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
    }
    
    const response = await fetch(`${API_URL}${path}`, options);
    if (response.ok) return response;
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API request failed: ${response.status}`);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
