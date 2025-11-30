import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search as SearchIcon,
  MapPin,
  Filter,
  ChevronRight,
  Home,
  Building2,
  Heart,
  User,
  X,
  SlidersHorizontal
} from 'lucide-react';

interface Estate {
  id: number;
  name: string;
  slug: string;
  location: string;
  price: number;
  image: string;
  plots: number;
  available: number;
  type: string;
}

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const estates: Estate[] = [
    {
      id: 1,
      name: 'Legacy Estate',
      slug: 'legacy-estate',
      location: 'Independence Layout',
      price: 15000000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
      plots: 50,
      available: 24,
      type: 'Residential',
    },
    {
      id: 2,
      name: 'Royal Gardens',
      slug: 'royal-gardens',
      location: 'Trans-Ekulu',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      plots: 40,
      available: 18,
      type: 'Residential',
    },
    {
      id: 3,
      name: 'Diamond Heights',
      slug: 'diamond-heights',
      location: 'New Haven',
      price: 18000000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
      plots: 60,
      available: 30,
      type: 'Mixed Use',
    },
    {
      id: 4,
      name: 'Green Valley',
      slug: 'green-valley',
      location: 'Emene',
      price: 8000000,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
      plots: 80,
      available: 45,
      type: 'Residential',
    },
    {
      id: 5,
      name: 'Centenary City',
      slug: 'centenary-city',
      location: 'Enugu East',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80',
      plots: 100,
      available: 67,
      type: 'Commercial',
    },
    {
      id: 6,
      name: 'Paradise Gardens',
      slug: 'paradise-gardens',
      location: 'Abakpa Nike',
      price: 10000000,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
      plots: 35,
      available: 20,
      type: 'Residential',
    },
  ];

  const locations = ['all', 'Independence Layout', 'Trans-Ekulu', 'New Haven', 'Emene', 'Enugu East', 'Abakpa Nike'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under ₦10M' },
    { value: '10-15', label: '₦10M - ₦15M' },
    { value: '15-20', label: '₦15M - ₦20M' },
    { value: '20+', label: 'Above ₦20M' },
  ];

  const formatPrice = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(0)}M`;
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const filteredEstates = estates.filter((estate) => {
    const matchesSearch = estate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estate.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || estate.location === selectedLocation;
    
    let matchesPrice = true;
    if (priceRange === '0-10') matchesPrice = estate.price < 10000000;
    else if (priceRange === '10-15') matchesPrice = estate.price >= 10000000 && estate.price <= 15000000;
    else if (priceRange === '15-20') matchesPrice = estate.price >= 15000000 && estate.price <= 20000000;
    else if (priceRange === '20+') matchesPrice = estate.price > 20000000;

    return matchesSearch && matchesLocation && matchesPrice;
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] px-4 pt-4 pb-6">
        <h1 className="text-white font-bold text-lg mb-4">Find Properties</h1>
        
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search estates, locations..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-[#0a2540] placeholder-[#8b6947]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#8b6947]" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-all ${showFilters ? 'bg-[#c9a961] text-white' : 'bg-white text-[#8b6947]'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-white/60 text-xs mb-2">Location</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLocation === loc
                        ? 'bg-[#c9a961] text-white'
                        : 'bg-white/10 text-white/80'
                    }`}
                  >
                    {loc === 'all' ? 'All Locations' : loc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-2">Price Range</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priceRange === range.value
                        ? 'bg-[#c9a961] text-white'
                        : 'bg-white/10 text-white/80'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Results Count */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-[#8b6947] text-sm">
          <span className="font-semibold text-[#0a2540]">{filteredEstates.length}</span> estates found
        </p>
        <button className="flex items-center gap-1 text-[#0d6e5d] text-xs font-medium">
          <Filter className="w-3 h-3" />
          Sort
        </button>
      </div>

      {/* Estate Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filteredEstates.map((estate) => (
          <button
            key={estate.id}
            onClick={() => navigate(`/estate/${estate.slug}`)}
            className="bg-white rounded-2xl overflow-hidden border border-[#c9a961]/10 shadow-sm text-left"
          >
            <div className="relative h-28">
              <img src={estate.image} alt={estate.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full">
                <span className="text-[#0d6e5d] text-[9px] font-medium">{estate.available} available</span>
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0f3d5c]/80 backdrop-blur rounded-full">
                <span className="text-white text-[9px]">{estate.type}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-[#0a2540] font-semibold text-xs mb-1 truncate">{estate.name}</h3>
              <div className="flex items-center gap-1 text-[#8b6947] text-[10px] mb-2">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{estate.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#0d6e5d] font-bold text-sm">{formatPrice(estate.price)}</p>
                <ChevronRight className="w-4 h-4 text-[#c9a961]" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* No Results */}
      {filteredEstates.length === 0 && (
        <div className="px-4 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a961]/10 rounded-2xl flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-[#c9a961]" />
          </div>
          <h3 className="text-[#0a2540] font-bold mb-2">No estates found</h3>
          <p className="text-[#8b6947] text-sm">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: SearchIcon, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-1"
            >
              <div className={`p-2 rounded-xl transition-all ${isActive(item.path) ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdvancedSearch;