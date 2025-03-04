// src/components/RestaurantSearch.tsx

import React, { useState } from "react";
import { Restaurant } from "@/types/types";  // Import the Restaurant type

interface RestaurantSearchProps {
  setFilteredRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  allRestaurants: Restaurant[];  // Make sure the type is correctly set here
}

const RestaurantSearch: React.FC<RestaurantSearchProps> = ({ setFilteredRestaurants, allRestaurants }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    let filtered = allRestaurants;
  
    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter((restaurant) =>
        restaurant.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  
    // Filter by search query on restaurant name
    filtered = filtered.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setFilteredRestaurants(filtered);
  };
  

  return (
    <div className="mb-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search for a restaurant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">All Categories</option>
        <option value="Somali">Somali</option>
        <option value="Turkish">Turkish</option>
        <option value="Pakistani">Pakistani</option>
        <option value="Indian">Indian</option>
        <option value="Arabic">Arabic</option>
        
      </select>
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Search
      </button>
    </div>
  );
};

export default RestaurantSearch;
