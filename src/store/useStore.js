import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Current Map State
      userLocation: [37.7749, -122.4194], // Default SF
      setUserLocation: (location) => set({ userLocation: location }),
      
      mapCenter: [37.7749, -122.4194],
      setMapCenter: (center) => set({ mapCenter: center }),
      
      selectedBusiness: null,
      setSelectedBusiness: (business) => set({ selectedBusiness: business }),
      
      // Filter State
      filters: {
        category: 'all',
        minRating: 0,
        distance: 50, // km
        openNow: false,
        searchQuery: '',
      },
      setFilters: (newFilters) => 
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
        
      // Favorites State
      favorites: [],
      toggleFavorite: (businessId) => set((state) => {
        const isFav = state.favorites.includes(businessId);
        if (isFav) {
          return { favorites: state.favorites.filter(id => id !== businessId) };
        } else {
          return { favorites: [...state.favorites, businessId] };
        }
      }),
      
      // Routing State
      routing: {
        active: false,
        origin: null,
        destination: null,
      },
      setRouting: (routingData) => 
        set((state) => ({ routing: { ...state.routing, ...routingData } })),
        
      clearRouting: () => 
        set({ routing: { active: false, origin: null, destination: null } }),
        
      // Theme State
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'localbizmap-storage',
      partialize: (state) => ({ 
        favorites: state.favorites,
        isDarkMode: state.isDarkMode
      }), // only persist favorites and theme
    }
  )
);

export default useStore;
