// src/lib/api.ts
import { useState, useEffect } from "react";
import { restaurants } from "@/data/restaurants"; // Importing local data

// Define the Restaurant interface if not defined already
interface Restaurant {
  id: string;
  name: string;
  address: string;
  // Add other fields as necessary
};

export const useGetRestaurantData = (id: string) => {
  // Explicitly typing the state variable
  const [data, setData] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restaurant = restaurants.find((r) => r.id === id);
    if (restaurant) {
      setData(restaurant);
      setIsLoading(false);
    } else {
      setError("Restaurant not found");
      setIsLoading(false);
    }
  }, [id]);

  return { data, isLoading, error };
};
