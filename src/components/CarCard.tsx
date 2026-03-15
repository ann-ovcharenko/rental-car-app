'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCarStore } from '@/store/useCarStore';
import { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite } = useCarStore();
  const carId = String(car.id);
  const isFavorite = favorites.includes(carId);
  const addressParts = car.address.split(',');
  const city = addressParts[addressParts.length - 2]?.trim();
  const country = addressParts[addressParts.length - 1]?.trim();
  const formattedMileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ') + ' km';

  const carDetails = [
    city,
    country,
    car.rentalCompany,
    car.type,
    formattedMileage
  ];

  return (
    <div className="relative flex flex-col h-full bg-white group font-manrope w-[274px]">
      
      <button
        onClick={() => toggleFavorite(carId)}
        className="absolute top-4 right-4 z-10 p-0 transition-transform hover:scale-110 active:scale-90"
      >
        <Heart
          size={18}
          className={isFavorite ? 'fill-brand stroke-brand' : 'stroke-white/80 fill-none'}
        />
      </button>

      
      <div className="relative h-[268px] w-full overflow-hidden rounded-xl bg-[#F3F3F2]">
        <Image
          src={car.img || car.photo || '/placeholder-car.png'}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="274px"
        />
      </div>

     
      <div className="flex flex-col flex-grow pt-3.5 pb-0">
        <div className="flex justify-between items-center mb-2 font-medium text-base text-text-main">
          <h3 className="truncate pr-2">
            {car.brand} <span className="text-brand">{car.model}</span>, {car.year}
          </h3>
          <span className="shrink-0">${car.rentalPrice}</span>
        </div>

        
        <div className="flex flex-wrap gap-y-1 text-xs text-[rgba(18,20,23,0.5)] mb-7 leading-[1.5]">
          {carDetails.map((detail, index) => (
            <div key={index} className="flex items-center">
              <span>{detail}</span>
              {index < carDetails.length - 1 && (
                <div className="mx-1.5 w-[1px] h-3 bg-[rgba(18,20,23,0.1)]" />
              )}
            </div>
          ))}
        </div>

       
        <Link
          href={`/catalog/${carId}`}
          className="mt-auto w-full py-3 bg-brand text-white text-center text-sm font-semibold rounded-xl hover:bg-brand-hover transition-colors"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};