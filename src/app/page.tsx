"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/searchbox"; // Import SearchBox
import FeaturedRestaurants from "@/components/FeaturedRestaurants"; // Import FeaturedRestaurants
import Categories from "@/components/Categories"; // Import Categories
import Footer from "../components/footer"; // Importer footeren


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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/results?lat=${latitude}&lon=${longitude}`);
        },
        () => {
          alert("Location access denied. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="flex items-center justify-start min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute left-[100px] top-1/2 transform -translate-y-1/2">
          <h1 className="text-white text-3xl font-bold mb-4">
            Discover Halal Food Near You
          </h1>
          {/* Use the SearchBox component */}
          <SearchBox onSearch={handleSearch} placeholder="Search for food, cuisine, or destination..." />
        </div>
      </div>

      {/* Featured Restaurants */}
      <FeaturedRestaurants />

      {/* Categories */}
      <Categories />

      {/* Footer */}
            <Footer />

            
        
    </div>
  );
}
