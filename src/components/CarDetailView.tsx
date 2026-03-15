'use client';

import Image from 'next/image';
import { Car } from '@/types/car';
import { BookingForm } from './BookingForm';

interface CarDetailViewProps {
  car: Car;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  
  const rentalConditions = car.rentalConditions?.split('\n') || [];
  const formattedMileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ');
  const addressParts = car.address.split(',');
  const city = addressParts[addressParts.length - 2]?.trim();
  const country = addressParts[addressParts.length - 1]?.trim();

  return (
    <div className="flex flex-col lg:flex-row gap-[100px] items-start">
      <div className="flex flex-col gap-6">
        <div 
          className="relative overflow-hidden bg-[#F3F3F2]"
          style={{ 
            width: '640px', 
            height: '512px', 
            borderRadius: '19px' 
          }}
        >
          <Image 
            src={car.img || car.photo || '/placeholder-car.png'} 
            alt={`${car.brand} ${car.model}`}
            fill
            priority
            className="object-cover"
            sizes="640px"
          />
        </div>

        <BookingForm carId={car.id} />
      </div>

      <div className="flex-1 max-w-[500px]">
        <h1 className="text-[28px] font-medium text-[#121417] mb-2">
          {car.brand} <span className="text-[#3470FF]">{car.model}</span>, {car.year}
        </h1>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-xs text-[rgba(18,20,23,0.5)]">
          <span>{city}</span>
          <span className="border-l border-[rgba(18,20,23,0.1)] pl-3">{country}</span>
          <span className="border-l border-[rgba(18,20,23,0.1)] pl-3">Id: {car.id}</span>
        </div>

        <p className="text-base leading-6 text-[#121417] mb-6">
          {car.description}
        </p>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 text-[#121417]">Car Specifications:</h3>
          <div className="flex flex-col gap-2 text-xs text-[rgba(18,20,23,0.8)]">
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Fuel Consumption: {car.fuelConsumption}</p>
            <p>Engine Size: {car.engineSize}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 text-[#121417]">Accessories and functionalities:</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[rgba(18,20,23,0.5)]">
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <span key={index} className="flex items-center">
                {item}
                {index < car.accessories.length + car.functionalities.length - 1 && (
                  <div className="ml-3 w-[1px] h-3 bg-[rgba(18,20,23,0.1)]" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-[#121417]">Rental Conditions:</h3>
          <div className="flex flex-wrap gap-2">
            {rentalConditions.map((condition, i) => (
              <div key={i} className="bg-[#F9F9F9] px-[14px] py-[7px] rounded-[35px] text-xs text-[#363535]">
                {condition}
              </div>
            ))}
            <div className="bg-[#F9F9F9] px-[14px] py-[7px] rounded-[35px] text-xs text-[#363535]">
              Mileage: <span className="text-[#3470FF] font-semibold">{formattedMileage}</span>
            </div>
            <div className="bg-[#F9F9F9] px-[14px] py-[7px] rounded-[35px] text-xs text-[#363535]">
              Price: <span className="text-[#3470FF] font-semibold">{car.rentalPrice}$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}