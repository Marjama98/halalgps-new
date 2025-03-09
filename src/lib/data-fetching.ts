// lib/data-fetching.ts
import { Restaurant } from "@/types/types"; 

export const fetchRestaurants = async (page: number, filters?: string): Promise<Restaurant[]> => {
  try {
    // Construct the API URL with query parameters
    const url = new URL('/api/restaurants', window.location.origin);
    url.searchParams.append('page', page.toString());
    
    // If filters are provided, append them to the URL
    if (filters) {
      url.searchParams.append('filters', filters);
    }

    // Make the fetch request
    const response = await fetch(url.toString());

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    // Parse the response data
    const data = await response.json();

    // Make sure data contains the restaurants array
    if (Array.isArray(data.restaurants)) {
      return data.restaurants;
    } else {
      throw new Error('Invalid data format: restaurants array not found');
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return []; // Return an empty array in case of error
  }
};
