"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi"; // Map icon
import React from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Fetch location suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      );
      const data = await response.json();
      setSuggestions(data);
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/results?query=${encodeURIComponent(query)}`);
  };

  // Find nearest restaurants
  const findNearestRestaurants = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        router.push(`/results?lat=${latitude}&lon=${longitude}`);
      }, () => {
        alert("Location access denied. Please enable location services.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="absolute left-[100px] top-1/2 transform -translate-y-1/2">
        <h1 className="text-white text-3xl font-bold mb-4">
          Find the Best Restaurants
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}
        >
          <input
            type="text"
            placeholder="Search for a destination, food, cuisine..."
            className="p-3 w-96 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay hiding dropdown to allow clicking
          />
        </form>

        {/* Autocomplete dropdown */}
        {showDropdown && (
          <ul className="bg-white mt-2 rounded-lg shadow-lg max-w-md overflow-hidden">
            {/* Find Nearest Restaurants option */}
            <li
              className="p-2 bg-gray-200 flex items-center text-gray-600 cursor-pointer hover:bg-gray-300 transition-all duration-200"
              onMouseDown={findNearestRestaurants} // Prevents dropdown from closing before click
            >
              <FiMapPin className="mr-2" /> Find Nearest Restaurants
            </li>

            {/* Location suggestions */}
            {suggestions.length > 0 && (
              <>
                <li className="p-2 bg-gray-100 flex items-center text-gray-600">
                  <FiMapPin className="mr-2" /> Location
                </li>
                {suggestions.map((place: any) => (
                  <li
                    key={place.place_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200"
                    onMouseDown={() => handleSearch(place.display_name)}
                  >
                    {place.display_name}
                  </li>
                ))}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
