import React, { useMemo } from 'react';
import useStore from '../../store/useStore';
import { mockBusinesses } from '../../data/mockBusinesses';
import { Star, Clock, MapPin, Navigation, Heart } from 'lucide-react';

const BusinessList = () => {
  const { 
    filters, 
    selectedBusiness, 
    setSelectedBusiness, 
    setMapCenter,
    favorites,
    toggleFavorite,
    setRouting
  } = useStore();

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter((business) => {
      if (filters.category !== 'all' && business.category !== filters.category) return false;
      if (business.rating < filters.minRating) return false;
      if (filters.openNow && !business.isOpen) return false;
      if (filters.searchQuery && !business.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const handleCardClick = (business) => {
    setSelectedBusiness(business);
    setMapCenter(business.coordinates);
  };

  const handleGetDirections = (e, business) => {
    e.stopPropagation();
    setRouting({
      active: true,
      origin: useStore.getState().userLocation,
      destination: business.coordinates,
    });
    setSelectedBusiness(business);
  };

  if (filteredBusinesses.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No places found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      {filteredBusinesses.map((business) => {
        const isSelected = selectedBusiness?.id === business.id;
        const isFav = favorites.includes(business.id);

        return (
          <div 
            key={business.id}
            onClick={() => handleCardClick(business)}
            className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
              isSelected 
                ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 shadow-md shadow-blue-500/5' 
                : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm'
            }`}
          >
            {/* Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
              <img 
                src={business.imageUrl} 
                alt={business.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(business.id);
                }}
                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md bg-black/20 hover:bg-black/40 transition-colors ${
                  isFav ? 'text-red-500' : 'text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col pt-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">
                {business.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {business.address}
              </p>
              
              <div className="flex items-center gap-3 mt-1.5 text-xs font-medium">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{business.rating}</span>
                  <span className="text-slate-400 font-normal">({business.reviews})</span>
                </div>
                
                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                
                <div className={`flex items-center gap-1 ${business.isOpen ? 'text-emerald-500' : 'text-slate-400'}`}>
                  <span>{business.isOpen ? 'Open' : 'Closed'}</span>
                </div>
              </div>

              {/* Added to fill exact space and push button to bottom */}
              <div className="flex-1" />

              <button 
                onClick={(e) => handleGetDirections(e, business)}
                className={`mt-2 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                Directions
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessList;
