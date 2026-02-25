import React from 'react';
import useStore from '../../store/useStore';
import { mockBusinesses } from '../../data/mockBusinesses';
import { Heart, MapPin, Navigation, Star, Clock } from 'lucide-react';

const FavoritesList = ({ setActiveTab }) => {
  const { favorites, toggleFavorite, setSelectedBusiness, setMapCenter, setRouting } = useStore();

  const favoriteBusinesses = mockBusinesses.filter(b => favorites.includes(b.id));

  const handleCardClick = (business) => {
    setSelectedBusiness(business);
    setMapCenter(business.coordinates);
    setActiveTab('explore');
  };

  const handleGetDirections = (e, business) => {
    e.stopPropagation();
    setRouting({
      active: true,
      origin: useStore.getState().userLocation,
      destination: business.coordinates,
    });
    setSelectedBusiness(business);
    setActiveTab('directions');
  };

  if (favoriteBusinesses.length === 0) {
    return (
      <div className="text-center py-12 px-4 flex flex-col items-center justify-center h-full">
        <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-pink-300 dark:text-pink-800" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No favorites yet</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[250px]">
          Tap the heart icon on any place to save it here for quick access later.
        </p>
        <button 
          onClick={() => setActiveTab('explore')}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
        >
          Explore Places
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Your Saved Places
          <span className="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 text-xs py-0.5 px-2 rounded-full font-bold">
            {favoriteBusinesses.length}
          </span>
        </h3>
      </div>

      {favoriteBusinesses.map((business) => (
        <div 
          key={business.id}
          onClick={() => handleCardClick(business)}
          className="flex flex-col gap-3 p-4 rounded-2xl cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-200 shadow-sm hover:shadow-md group relative overflow-hidden"
        >
          {/* Decorative left border for favorites */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-rose-500" />

          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={business.imageUrl} 
                alt={business.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white truncate pr-2">
                  {business.name}
                </h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(business.id);
                  }}
                  className="p-1 rounded-full text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors flex-shrink-0"
                  title="Remove from favorites"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {business.category.charAt(0).toUpperCase() + business.category.slice(1)} • {business.address}
              </p>
              
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={(e) => handleGetDirections(e, business)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </button>
                
                <div className={`flex items-center gap-1 text-xs font-medium ${business.isOpen ? 'text-emerald-500' : 'text-slate-400'}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {business.isOpen ? 'Open Now' : 'Closed'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
