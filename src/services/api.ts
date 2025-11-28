const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://enugu-land-api.onrender.com/api';

// Demo mode - works without backend
const DEMO_MODE = true;

// Demo user data
const DEMO_USER = {
  id: 1,
  name: 'James Okonkwo',
  email: 'demo@enugu.gov.ng',
  phone: '+234 801 234 5678',
  nin: '12345678901',
  verified: true,
  created_at: '2024-01-15'
};

// Demo estates data
const DEMO_ESTATES = [
  {
    id: 1,
    name: 'Legacy Estate',
    slug: 'legacy-estate',
    location: 'Independence Layout',
    description: 'Premium residential estate with modern amenities, 24/7 security, and excellent road network. Perfect for families seeking luxury living in Enugu.',
    total_plots: 150,
    available_plots: 45,
    min_price: '8500000',
    max_price: '15000000',
    image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  },
  {
    id: 2,
    name: 'Royal Gardens',
    slug: 'royal-gardens',
    location: 'Trans-Ekulu',
    description: 'Exclusive gated community with landscaped gardens, recreational facilities, and premium infrastructure for discerning homeowners.',
    total_plots: 200,
    available_plots: 78,
    min_price: '6500000',
    max_price: '12000000',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  },
  {
    id: 3,
    name: 'Green Valley Estate',
    slug: 'green-valley-estate',
    location: 'New Haven',
    description: 'Eco-friendly residential development with solar power, water treatment, and green spaces designed for sustainable living.',
    total_plots: 120,
    available_plots: 32,
    min_price: '5500000',
    max_price: '9500000',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  },
  {
    id: 4,
    name: 'Diamond Heights',
    slug: 'diamond-heights',
    location: 'GRA',
    description: 'Ultra-premium estate in the heart of GRA with world-class amenities, underground utilities, and breathtaking city views.',
    total_plots: 80,
    available_plots: 15,
    min_price: '18000000',
    max_price: '35000000',
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  },
  {
    id: 5,
    name: 'Sunrise Gardens',
    slug: 'sunrise-gardens',
    location: 'Abakpa Nike',
    description: 'Affordable housing estate with basic amenities, good road access, and proximity to markets and schools.',
    total_plots: 250,
    available_plots: 120,
    min_price: '3500000',
    max_price: '6000000',
    image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  },
  {
    id: 6,
    name: 'Unity Park Estate',
    slug: 'unity-park-estate',
    location: 'Achara Layout',
    description: 'Family-oriented community with parks, playgrounds, schools, and shopping centers within walking distance.',
    total_plots: 180,
    available_plots: 65,
    min_price: '7000000',
    max_price: '11000000',
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
    status: 'active'
  }
];

// Demo properties
const DEMO_PROPERTIES = [
  {
    id: 1,
    title: 'Plot 15, Legacy Estate',
    location: 'Independence Layout, Enugu',
    price: 12500000,
    size: '650 sqm',
    status: 'verified',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
  },
  {
    id: 2,
    title: 'Plot 8, Royal Gardens',
    location: 'Trans-Ekulu, Enugu',
    price: 9800000,
    size: '500 sqm',
    status: 'verified',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
  },
  {
    id: 3,
    title: 'Commercial Plot, Diamond Heights',
    location: 'GRA, Enugu',
    price: 28000000,
    size: '1000 sqm',
    status: 'verified',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
  }
];

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    // Demo mode - return mock data
    if (DEMO_MODE) {
      return this.handleDemoRequest(endpoint, options);
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  private async handleDemoRequest(endpoint: string, options: RequestInit = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body as string) : null;

    // Auth endpoints
    if (endpoint === '/auth/login' && method === 'POST') {
      // Accept any email/password for demo
      const demoToken = 'demo_token_' + Date.now();
      this.setToken(demoToken);
      localStorage.setItem('user', JSON.stringify(DEMO_USER));
      return { token: demoToken, user: DEMO_USER };
    }

    if (endpoint === '/auth/register' && method === 'POST') {
      const newUser = { ...DEMO_USER, name: body.name, email: body.email };
      const demoToken = 'demo_token_' + Date.now();
      this.setToken(demoToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { token: demoToken, user: newUser };
    }

    if (endpoint === '/auth/me') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : DEMO_USER;
    }

    // Estates
    if (endpoint === '/estates' || endpoint.startsWith('/estates')) {
      if (endpoint === '/estates') {
        return DEMO_ESTATES;
      }
      const slug = endpoint.split('/')[2];
      return DEMO_ESTATES.find(e => e.slug === slug || e.id.toString() === slug);
    }

    // Properties
    if (endpoint === '/properties' || endpoint.startsWith('/properties')) {
      if (endpoint === '/properties') {
        return DEMO_PROPERTIES;
      }
      const id = endpoint.split('/')[2];
      return DEMO_PROPERTIES.find(p => p.id.toString() === id);
    }

    // Search
    if (endpoint.startsWith('/search')) {
      return { results: DEMO_PROPERTIES, total: DEMO_PROPERTIES.length };
    }

    // Default
    return { success: true };
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { name: string; email: string; phone: string; password: string; nin?: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  async updateProfile(data: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Estates
  async getEstates() {
    return this.request('/estates');
  }

  async getEstate(slug: string) {
    return this.request(`/estates/${slug}`);
  }

  // Properties
  async getProperties() {
    return this.request('/properties');
  }

  async getProperty(id: string) {
    return this.request(`/properties/${id}`);
  }

  async searchProperties(query: string) {
    return this.request(`/search?q=${encodeURIComponent(query)}`);
  }

  // Verification
  async verifyTitle(registrationNumber: string) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        verified: true,
        property: {
          registration_number: registrationNumber,
          owner: 'John Okonkwo',
          location: 'Independence Layout, Enugu',
          size: '650 sqm',
          type: 'Residential',
          status: 'Valid',
          registered_date: '2022-05-15',
          expiry_date: '2097-05-15'
        }
      };
    }
    return this.request(`/verify/title/${registrationNumber}`);
  }

  async verifyDocument(documentId: string) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        verified: true,
        document: {
          id: documentId,
          type: 'Certificate of Occupancy',
          status: 'Authentic',
          issued_date: '2022-05-15',
          issuing_authority: 'Enugu State Ministry of Lands'
        }
      };
    }
    return this.request(`/verify/document/${documentId}`);
  }

  // Transactions
  async getTransactions() {
    if (DEMO_MODE) {
      return [
        { id: 1, type: 'Search Fee', amount: 30000, status: 'completed', date: '2024-11-25', reference: 'PSF1732567890' },
        { id: 2, type: 'Title Verification', amount: 15000, status: 'completed', date: '2024-11-20', reference: 'TV1732567891' },
      ];
    }
    return this.request('/transactions');
  }

  // Logout
  logout() {
    this.clearToken();
  }
}

export const api = new ApiService();