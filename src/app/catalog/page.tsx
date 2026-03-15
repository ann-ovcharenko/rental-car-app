'use client';

import { useEffect, useState } from 'react';
import { fetchCars } from '@/services/api';
import { useCarStore } from '@/store/useCarStore';
import { FilterBar } from '@/components/FilterBar';
import { CarCard } from '@/components/CarCard';

export default function CatalogPage() {
  const { cars, setCars, filters } = useCarStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getFormattedFilters = () => ({
    ...filters,
    minMileage: filters.minMileage ? Number(filters.minMileage) : undefined,
    maxMileage: filters.maxMileage ? Number(filters.maxMileage) : undefined,
  });

  useEffect(() => {
    const loadInitialCars = async () => {
      setLoading(true);
      setPage(1);
      try {
        const formattedFilters = getFormattedFilters();
        const data = await fetchCars(1, 12, formattedFilters);
        setCars(data);
        setHasMore(data.length === 12);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialCars();
  }, [filters, setCars]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const formattedFilters = getFormattedFilters();
      const data = await fetchCars(nextPage, 12, formattedFilters);
      setCars(data, true);
      setPage(nextPage);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-[1216px] mx-auto px-4 pt-32 pb-20 font-manrope">
      <FilterBar />
      
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[29px] gap-y-[50px] justify-items-center">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-20 text-gray-500 text-lg">
            No cars found matching your criteria.
          </div>
        )
      )}

      {loading && (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3470FF]"></div>
        </div>
      )}

      {!loading && hasMore && cars.length > 0 && (
        <div className="flex justify-center w-full mt-20 mb-[150px]">
          <button 
            onClick={handleLoadMore}
            className="w-[156px] h-[44px] border border-[#3470FF] rounded-[12px] text-[#101828] text-base font-semibold leading-[1.25] font-manrope whitespace-nowrap bg-transparent flex items-center justify-center cursor-pointer outline-none transition-colors duration-200 hover:border-[#0B44ED]"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}