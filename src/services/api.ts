const API_URL = 'https://enugu-registry-backend.onrender.com/api';

export const api = {
  async getEstates() {
    const response = await fetch(`${API_URL}/estates`);
    return response.json();
  },

  async getEstate(slug: string) {
    const response = await fetch(`${API_URL}/estates/${slug}`);
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async register(name: string, email: string, phone: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    return response.json();
  },
};