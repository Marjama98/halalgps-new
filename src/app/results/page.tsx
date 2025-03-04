"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { useState, useEffect, useMemo } from "react";
import { FaSortAlphaDown, FaSortNumericDown, FaTimes } from "react-icons/fa";
import FilterBar from "@/components/filterbar"; // IMPORTER FILTERBAR
import "./results.css";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") ?? "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedSort, setSelectedSort] = useState<string>("name");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(query);
    document.body.classList.add("bg-white");
    return () => document.body.classList.remove("bg-white");
  }, [query]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.type.toLowerCase().includes(query) ||
      restaurant.address.toLowerCase().includes(query) ||
      restaurant.location.toLowerCase().includes(query)
    );
  }, [query]);

  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) =>
      selectedSort === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name)
    );
  }, [filteredRestaurants, selectedSort]);

  const filteredByCuisineAndPrice = useMemo(() => {
    return sortedRestaurants.filter((restaurant) => {
      const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.type);
      const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(restaurant.price);
      return cuisineMatch && priceMatch;
    });
  }, [sortedRestaurants, selectedCuisines, selectedPrices]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center p-4 mr-[10px]">
        <a href="/" className="flex items-center">
          <img src="/images/1logo.png" alt="HALALGPS logo" className="h-10" />
        </a>
        <div className="flex space-x-10 mr-[80px]">
          <a href="/" className="text-[16px] font-regular text-gray-400 hover:text-blue-500">Home</a>
          <a href="/contact-us" className="text-[16px] font-regular text-gray-400 hover:text-blue-500">Contact Us</a>
          <a href="/about-us" className="text-[16px] font-regular text-gray-400 hover:text-blue-500">About Us</a>
          <a href="/faq" className="text-[16px] font-regular text-gray-400 hover:text-blue-500">FAQ</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content mt-16">
        {/* Search Bar */}
        <div className="mt-4 mb-2 flex justify-start w-full max-w-lg mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
            className="relative w-full"
          >
            <input
              type="text"
              placeholder="Search for a destination, food, cuisine..."
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-[20px] p-1 cursor-pointer"
              >
                <FaTimes size={18} />
              </div>
            )}
          </form>
        </div>

        {/* FILTER BAR PLASSERT HER ⬇️ */}
        <FilterBar
          selectedCuisines={selectedCuisines}
          setSelectedCuisines={setSelectedCuisines}
          selectedPrices={selectedPrices}
          setSelectedPrices={setSelectedPrices}
        />

        <div className="border-t border-gray-300 my-2"></div>

        {/* Search Results */}
        <h1 className="text-2xl font-bold mb-4 ">Search Results</h1>
        {filteredByCuisineAndPrice.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredByCuisineAndPrice.map((restaurant) => (
              <div key={restaurant.id} className="p-4 bg-white shadow rounded-lg flex flex-col hover:shadow-xl transition duration-300">
                <img src={restaurant.image} alt={restaurant.name} className="h-48 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.type} - {restaurant.address}</p>
                <p className="text-yellow-500">⭐ {restaurant.rating}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No restaurants found.</p>
        )}
      </div>
    </div>
  );
}
