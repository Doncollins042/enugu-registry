import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Search, MapPin, DollarSign, Maximize2, ArrowLeft, X, SlidersHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdvancedSearchProps {
  user: any;
  onLogout: () => void;
}

export default function AdvancedSearch({ user, onLogout }: AdvancedSearchProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    status: 'all',
  });

  const estates = [
    { name: 'Legacy Estate', location: 'Independence Layout', plots: 87, available: 45, priceRange: '5M - 12M', minPrice: 5000000, maxPrice: 12000000, minSize: 450, maxSize: 800, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400', slug: 'legacy-estate' },
    { name: 'Liberty Estate', location: 'Trans Ekulu', plots: 45, available: 28, priceRange: '8M - 15M', minPrice: 8000000, maxPrice: 15000000, minSize: 500, maxSize: 1000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', slug: 'liberty-estate' },
    { name: 'Fidelity Estate', location: 'New Haven', plots: 156, available: 98, priceRange: '6M - 10M', minPrice: 6000000, maxPrice: 10000000, minSize: 400, maxSize: 650, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', slug: 'fidelity-estate' },
    { name: 'Bricks Estate', location: 'Achara Layout', plots: 92, available: 67, priceRange: '4M - 9M', minPrice: 4000000, maxPrice: 9000000, minSize: 350, maxSize: 600, image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400', slug: 'bricks-estate' },
    { name: 'Royal Gardens', location: 'GRA', plots: 64, available: 32, priceRange: '10M - 18M', minPrice: 10000000, maxPrice: 18000000, minSize: 600, maxSize: 1200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', slug: 'royal-gardens' },
    { name: 'Crown Estate', location: 'Maryland', plots: 78, available: 45, priceRange: '7M - 13M', minPrice: 7000000, maxPrice: 13000000, minSize: 450, maxSize: 750, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', slug: 'crown-estate' },
    { name: 'Premier Heights', location: 'Independence Layout', plots: 53, available: 21, priceRange: '9M - 16M', minPrice: 9000000, maxPrice: 16000000, minSize: 500, maxSize: 900, image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400', slug: 'premier-heights' },
    { name: 'Elite Gardens', location: 'Asata', plots: 41, available: 30, priceRange: '6M - 11M', minPrice: 6000000, maxPrice: 11000000, minSize: 400, maxSize: 700, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', slug: 'elite-gardens' },
  ];

  const filteredEstates = useMemo(() => {
    return estates.filter(estate => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          estate.name.toLowerCase().includes(query) ||
          estate.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location) {
        const matchLocation = estate.location.toLowerCase().includes(filters.location.toLowerCase());
        if (!matchLocation) return false;
      }

      // Price filters
      if (filters.minPrice) {
        const minP = parseInt(filters.minPrice);
        if (estate.maxPrice < minP) return false;
      }
      if (filters.maxPrice) {
        const maxP = parseInt(filters.maxPrice);
        if (estate.minPrice > maxP) return false;
      }

      // Size filters
      if (filters.minSize) {
        const minS = parseInt(filters.minSize);
        if (estate.maxSize < minS) return false;
      }
      if (filters.maxSize) {
        const maxS = parseInt(filters.maxSize);
        if (estate.minSize > maxS) return false;
      }

      // Status filter
      if (filters.status === 'available' && estate.available === 0) return false;
      if (filters.status === 'sold' && estate.available > 0) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const handleClearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      minSize: '',
      maxSize: '',
      status: 'all',
    });
    setSearchQuery('');
    toast.success('Filters cleared');
  };

  const hasActiveFilters = 
    filters.location || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.minSize || 
    filters.maxSize || 
    filters.status !== 'all' ||
    searchQuery;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Property Search</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <LogOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Property</h1>
            <p className="text-sm text-gray-600">Search and filter estates by location, price, and size</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by estate name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 border rounded-lg transition-all flex items-center gap-2 text-sm font-medium ${
                  showFilters ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">Filters</h3>
                    {hasActiveFilters && (
                      <button 
                        onClick={handleClearFilters} 
                        className="text-xs text-blue-900 hover:text-blue-800 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="e.g. Independence Layout"
                          value={filters.location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₦)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plot Size (sqm)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <Maximize2 className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.minSize}
                            onChange={(e) => setFilters({ ...filters, minSize: e.target.value })}
                            className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="relative">
                          <Maximize2 className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxSize}
                            onChange={(e) => setFilters({ ...filters, maxSize: e.target.value })}
                            className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Properties</option>
                        <option value="available">Available Only</option>
                        <option value="sold">Sold Out</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-900">{filteredEstates.length}</span> of {estates.length} estates
                </p>
                {hasActiveFilters && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    Filters Applied
                  </span>
                )}
              </div>

              {filteredEstates.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-12 text-center shadow-sm">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-sm text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`grid ${showFilters ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4`}>
                  {filteredEstates.map((estate, i) => (
                    <div
                      key={i}
                      className="group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => navigate(`/estate/${estate.slug}`)}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img src={estate.image} alt={estate.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-600 text-white rounded-full text-xs font-medium">
                          {estate.available} available
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white rounded-full text-xs font-medium">
                          {estate.plots} plots
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-base font-bold text-gray-900 mb-2">{estate.name}</h4>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{estate.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-emerald-600 font-semibold">₦{estate.priceRange}</p>
                          <p className="text-xs text-gray-500">{estate.minSize}-{estate.maxSize} sqm</p>
                        </div>
                        <button className="w-full py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all text-xs">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}