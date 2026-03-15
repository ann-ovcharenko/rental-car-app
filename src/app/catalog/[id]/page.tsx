import { fetchCarById } from '@/services/api';
import { notFound } from 'next/navigation';
import { BookingForm } from '@/components/BookingForm';
import { CopyId } from '@/components/CopyId';
import { MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await fetchCarById(id);

  if (!car) return notFound();

  const addressParts = car.address?.split(',') || [];
  const city = addressParts[addressParts.length - 2]?.trim();
  const rentalConditions = typeof car.rentalConditions === 'string' 
    ? car.rentalConditions.split('\n') 
    : (car.rentalConditions || []);

  const carIdString = String(car.id);

  return (
    <main className="max-w-[1216px] mx-auto px-4 pt-32 pb-20 font-manrope">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
        
        <div className="flex flex-col gap-12">
          <div className="relative w-full h-[452px] rounded-[24px] overflow-hidden bg-[#F3F3F2]">
            <Image 
              src={car.img || car.photo || '/placeholder-car.png'} 
              alt={car.brand || 'Car image'} 
              fill
              className="object-cover"
              priority 
            />
          </div>

          <BookingForm carId={carIdString} />
        </div>

        <div className="flex flex-col">

          <div className="flex items-baseline gap-2 mb-2">
            <h1 className="text-[28px] font-medium text-[#121417]">
              {car.brand} <span className="text-brand">{car.model}</span>, {car.year}
            </h1>
            <CopyId id={carIdString} />
          </div>

          <div className="flex gap-3 text-xs text-[rgba(18,20,23,0.5)] mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-[#121417]" /> 
              <span>{city}, Ukraine</span>
            </div>
            <span className="border-l border-[rgba(18,20,23,0.1)] pl-3">
              Mileage: {car.mileage?.toLocaleString('en-US').replace(/,/g, ' ')} km
            </span>
          </div>
          
          <div className="text-2xl font-semibold text-brand mb-8">
            ${car.rentalPrice}
          </div>

          <p className="text-base leading-6 text-[#121417] mb-12">
            {car.description}
          </p>

         <div className="flex flex-col mb-[110px]">
            <h3 className="text-sm font-medium mb-5 text-[#121417]">Rental Conditions:</h3>
            <div className="flex flex-col gap-4 text-xs text-[#121417]">
              {rentalConditions.map((cond: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#121417]" strokeWidth={1.5} /> 
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-14">
            <div>
              <h3 className="text-sm font-medium mb-5 text-[#121417]">Car Specifications:</h3>
              <ul className="space-y-4 text-xs text-[#121417]">
                <li className="flex items-center gap-2">
                  <span className="w-5 text-center">📅</span> 
                  <span className="text-gray-500">Year:</span> {car.year}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 text-center">🚗</span> 
                  <span className="text-gray-500">Type:</span> {car.type}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 text-center">⛽</span> 
                  <span className="text-gray-500">Fuel Consumption:</span> {car.fuelConsumption}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 text-center">⚙️</span> 
                  <span className="text-gray-500">Engine Size:</span> {car.engineSize}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-5 text-[#121417]">Accessories & functionality:</h3>
              <div className="flex flex-col gap-4 text-xs text-[#121417]">
                {[...(car.accessories || []), ...(car.functionalities || [])].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#121417]" strokeWidth={1.5} /> 
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}