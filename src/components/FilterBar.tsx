'use client';

import { useState, useEffect } from 'react';
import { useCarStore } from '@/store/useCarStore';
import { fetchBrands } from '@/services/api';
import { ChevronDown } from 'lucide-react';

export const FilterBar = () => {
  const { setFilters, resetCars } = useCarStore();
  
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  useEffect(() => {
    const getBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to load brands:", error);
      }
    };
    getBrands();
  }, []);

  const prices = Array.from({ length: 8 }, (_, i) => 30 + i * 10);

  const handleSearch = () => {
    resetCars(); 
    setFilters({
      brand,
      rentalPrice: price,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    });
  };

  return (
    <div className="flex flex-wrap items-end justify-center gap-[18px] mb-[50px] font-manrope">
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#8A8A89] ml-1">Car brand</label>
        <div className="relative w-[224px]">
          <select 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full h-12 px-[18px] bg-[#F7F7FB] rounded-xl border-none outline-none text-[#121417] text-lg cursor-pointer appearance-none focus:ring-2 focus:ring-[#3470FF]/20 transition-all"
          >
            <option value="">Choose a brand</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#121417]" size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#8A8A89] ml-1">Price / 1 hour</label>
        <div className="relative w-[196px]">
          <select 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-12 px-[18px] bg-[#F7F7FB] rounded-xl border-none outline-none text-[#121417] text-lg cursor-pointer appearance-none focus:ring-2 focus:ring-[#3470FF]/20 transition-all"
          >
            <option value="">Choose a price</option>
            {prices.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-[#121417]" size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#8A8A89] ml-1">Car mileage / km</label>
        <div className="flex items-center">
          <div className="relative">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#121417] text-lg">From</span>
            <input 
              type="text" 
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value.replace(/\D/g, ""))}
              className="w-[160px] h-12 pl-[70px] pr-[18px] bg-[#F7F7FB] rounded-l-xl border-r border-[rgba(18,20,23,0.05)] outline-none text-[#121417] text-lg focus:ring-2 focus:ring-[#3470FF]/20 transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#121417] text-lg">To</span>
            <input 
              type="text"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value.replace(/\D/g, ""))}
              className="w-[160px] h-12 pl-[48px] pr-[18px] bg-[#F7F7FB] rounded-r-xl outline-none text-[#121417] text-lg focus:ring-2 focus:ring-[#3470FF]/20 transition-all"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="w-[136px] h-12 bg-[#3470FF] text-white font-semibold rounded-xl hover:bg-[#0B44ED] transition-all cursor-pointer shadow-sm active:scale-95"
      >
        Search
      </button>
    </div>
  );
};