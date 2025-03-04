"use client";
import { useState } from "react";

interface FilterBarProps {
  selectedCuisines: string[];
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
}

const cuisines = ["Somali", "Italian", "Mexican", "Japanese"];
const prices = ["$", "$$", "$$$"];

export default function FilterBar({
  selectedCuisines,
  setSelectedCuisines,
  selectedPrices,
  setSelectedPrices,
}: FilterBarProps) {
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const toggleSelection = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="flex space-x-4">
      {/* Cuisine Filter */}
      <div className="relative">
        <button
          onClick={() => setShowCuisineDropdown(!showCuisineDropdown)}
          className="filter-btn px-4 py-2 bg-gray-200 rounded-md"
        >
          Cuisine
        </button>
        {showCuisineDropdown && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10">
            {cuisines.map((cuisine) => (
              <div
                key={cuisine}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCuisines.includes(cuisine)}
                  onChange={() => toggleSelection(cuisine, setSelectedCuisines)}
                />
                <label>{cuisine}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="relative">
        <button
          onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          className="filter-btn px-4 py-2 bg-gray-200 rounded-md"
        >
          Price
        </button>
        {showPriceDropdown && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10">
            {prices.map((price) => (
              <div
                key={price}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(price)}
                  onChange={() => toggleSelection(price, setSelectedPrices)}
                />
                <label>{price}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
