"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [mainContent, setMainContent] = useState('Current page content'); // Replace with actual content fetching
  const [editedContent, setEditedContent] = useState(mainContent);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user?.role === 'admin') {
        setIsAdmin(true);
      }
    }
    fetchSession();
  }, []);

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const saveChanges = async () => {
    const response = await fetch('/api/admin/update-main-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editedContent }),
    });

    if (response.ok) {
      setMainContent(editedContent);
      alert('Content updated successfully!');
    } else {
      alert('Failed to update content.');
    }
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

        {/* Main Content */}
        <div>
          <p>{mainContent}</p>
          {isAdmin && (
            <div>
              <textarea
                value={editedContent}
                onChange={handleContentChange}
                rows={10}
                cols={50}
              />
              <button onClick={saveChanges}>Save Changes</button>
            </div>
          )}
        </div>

        {/* Featured Restaurants */}
        <FeaturedRestaurants onRestaurantClick={handleRestaurantClick} />

        {/* Categories */}
        <Categories />

        {/* Footer */}
        <Footer/>

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
