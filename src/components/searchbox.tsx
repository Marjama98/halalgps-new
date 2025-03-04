import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Search, MapPin } from "lucide-react"; // Importing icons
import "./searchbox.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = "Search for a destination or cuisine...",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setUserLocation(data.display_name || "Current Location");
        },
        () => setUserLocation("Location not available")
      );
    }
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();
    setSuggestions(data.map((item: any) => item.display_name));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowDropdown(true);
    fetchSuggestions(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowDropdown(false);
      onSearch(searchQuery);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowDropdown(false);
    onSearch(suggestion);
  };

  const findNearestRestaurants = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`lat=${latitude}&lon=${longitude}`);
        },
        () => alert("Location access denied. Please enable location services.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="search-box relative flex items-center border border-gray-300 rounded-lg px-4 py-2">
        {/* Search Icon (Lucide) */}
        <Search className="absolute left-3 text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input pl-10 pr-4 w-full border-none focus:outline-none"
        />
      </div>

      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg z-10">
          {searchQuery.length === 0 ? (
            <li
              className="p-2 cursor-pointer hover:bg-gray-100 font-bold flex items-center"
              onClick={findNearestRestaurants}
            >
              <MapPin className="text-gray-400 w-5 h-5 mr-2" />
              Find Restaurants Near Me
            </li>
          ) : (
            <li className="p-2 cursor-default text-gray-500 flex items-center bg-gray-100">
              <MapPin className="text-gray-400 w-5 h-5 mr-2" />
              Location
            </li>
          )}

          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100 text-black"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
