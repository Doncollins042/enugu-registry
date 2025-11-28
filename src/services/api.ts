const API_URL = import.meta.env.VITE_API_URL || 'https://enugu-registry-backend.onrender.com/api';

export const api = {
  // Auth
  async register(data: { full_name: string; email: string; phone: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async verifyOTP(data: { email: string; otp: string }) {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Estates
  async getEstates() {
    try {
      const res = await fetch(`${API_URL}/estates`);
      if (!res.ok) throw new Error('Failed to fetch estates');
      return res.json();
    } catch (error) {
      console.error('Error fetching estates:', error);
      return [];
    }
  },

  async getEstate(slug: string) {
    try {
      // First try to get by slug
      const res = await fetch(`${API_URL}/estates/${slug}`);
      if (res.ok) {
        return res.json();
      }
      
      // If not found by slug, try to get all estates and find by slug
      const allEstates = await this.getEstates();
      if (Array.isArray(allEstates)) {
        const estate = allEstates.find((e: any) => e.slug === slug || e.id.toString() === slug);
        if (estate) return estate;
      }
      
      return { error: 'Estate not found' };
    } catch (error) {
      console.error('Error fetching estate:', error);
      return { error: 'Failed to fetch estate' };
    }
  },

  async getEstateById(id: number) {
    try {
      const res = await fetch(`${API_URL}/estates/${id}`);
      if (!res.ok) throw new Error('Failed to fetch estate');
      return res.json();
    } catch (error) {
      console.error('Error fetching estate:', error);
      return null;
    }
  },

  // Plots
  async getPlots(estateId: number) {
    try {
      const res = await fetch(`${API_URL}/plots?estate_id=${estateId}`);
      if (!res.ok) throw new Error('Failed to fetch plots');
      return res.json();
    } catch (error) {
      console.error('Error fetching plots:', error);
      return [];
    }
  },

  // Transactions
  async createTransaction(data: any, token: string) {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getTransactions(token: string) {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return res.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  // Documents
  async uploadDocument(formData: FormData, token: string) {
    const res = await fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return res.json();
  },

  async getDocuments(token: string) {
    try {
      const res = await fetch(`${API_URL}/documents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch documents');
      return res.json();
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  },

  // Admin
  async getUsers(token: string) {
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getAllTransactions(token: string) {
    try {
      const res = await fetch(`${API_URL}/admin/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return res.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async createEstate(data: any, token: string) {
    const res = await fetch(`${API_URL}/admin/estates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateEstate(id: number, data: any, token: string) {
    const res = await fetch(`${API_URL}/admin/estates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteEstate(id: number, token: string) {
    const res = await fetch(`${API_URL}/admin/estates/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },
};