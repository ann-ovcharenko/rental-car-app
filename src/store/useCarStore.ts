import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

interface CarState {
  cars: Car[];
  favorites: string[];
  filters: {
    brand: string;
    rentalPrice: string;
    minMileage: string;
    maxMileage: string;
  };
  setCars: (newCars: Car[], append?: boolean) => void;
  toggleFavorite: (carId: string) => void;
  setFilters: (newFilters: Partial<CarState['filters']>) => void;
  resetCars: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      filters: {
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      },
      setCars: (newCars, append = false) =>
  set((state) => {
    if (!append) return { cars: newCars };
    
    const existingIds = new Set(state.cars.map(car => car.id));
    
    const uniqueNewCars = newCars.filter(car => !existingIds.has(car.id));
    
    return {
      cars: [...state.cars, ...uniqueNewCars],
    };
  }),
      toggleFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.includes(carId)
            ? state.favorites.filter((id) => id !== carId)
            : [...state.favorites, carId],
        })),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetCars: () => set({ cars: [] }),
    }),
    {
      name: 'rental-car-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);