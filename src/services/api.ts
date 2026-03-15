import axios from 'axios';
import { Car } from '@/types/car';

const BASE_URL = 'https://car-rental-api.goit.global'; 

export const api = axios.create({
  baseURL: BASE_URL,
});

interface CarFilters {
  brand?: string;
  rentalPrice?: string | number;
  minMileage?: number;
  maxMileage?: number;
}

interface FetchCarsResponse {
  cars: Car[];
  total: number;
}

export const fetchCars = async (
  page = 1, 
  limit = 12, 
  filters: CarFilters = {}
): Promise<Car[]> => {
  const { data } = await api.get<FetchCarsResponse>('/cars', {
    params: {
      page,
      limit,
      brand: filters.brand || undefined,
      rentalPrice: filters.rentalPrice || undefined,
      minMileage: filters.minMileage || undefined,
      maxMileage: filters.maxMileage || undefined,
    },
  });
  
  return data.cars; 
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/brands');
  return data;
};