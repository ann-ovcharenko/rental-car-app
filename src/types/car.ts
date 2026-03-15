export interface Car {
  id: string | number;
  year: number;
  brand: string;
  make: string;
  model: string;
  type: string;
  img?: string;
  photo?: string;
  photoPropagation?: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string;
  mileage: number;
}

export interface CarFilters {
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
}