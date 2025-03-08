"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/searchbox";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Categories from "@/components/Categories";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import RestaurantDetailsModal from "@/components/RestaurantDetailsModal"; 
import { Restaurant } from "@/data/restaurants";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
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

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        {/* Hero Section */}
        <div
          className="flex items-center justify-start min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
          <div className="absolute left-[100px] top-1/2 transform -translate-y-1/2">
            <h1 className="text-white text-3xl font-bold mb-4">
              Discover Halal Food Near You
            </h1>
            <SearchBox onSearch={handleSearch} placeholder="Search for food, cuisine, or destination..." />
          </div>
        </div>

        {/* Featured Restaurants */}
        <FeaturedRestaurants onRestaurantClick={handleRestaurantClick} />

        {/* Categories */}
        <Categories />

        {/* Footer */}
        <Footer />

        {/* Restaurant Details Modal */}
        {selectedRestaurant && (
          <RestaurantDetailsModal
            restaurant={selectedRestaurant}
            onClose={closeModal}
          />
        )}
      </div>
    </Suspense>
  );
}
