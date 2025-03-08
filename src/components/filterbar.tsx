import React, { useState, useRef, useEffect } from 'react';

interface FilterBarProps {
  selectedCuisines: string[];
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDistances: string[];
  setSelectedDistances: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeatures: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  
  selectedCuisines,
  setSelectedCuisines,
  selectedPrices,
  setSelectedPrices,
  selectedDistances,
  setSelectedDistances,
  selectedFeatures,
  setSelectedFeatures,
}) => {
  // State to manage dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Refs for detecting clicks outside dropdowns
  const cuisinesRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown === 'cuisines' &&
        cuisinesRef.current &&
        !cuisinesRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        activeDropdown === 'price' &&
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        activeDropdown === 'distance' &&
        distanceRef.current &&
        !distanceRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        activeDropdown === 'features' &&
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Handling changes for filters
  const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedCuisines.includes(value)) {
      setSelectedCuisines(selectedCuisines.filter((item) => item !== value));
    } else {
      setSelectedCuisines([...selectedCuisines, value]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedPrices.includes(value)) {
      setSelectedPrices(selectedPrices.filter((item) => item !== value));
    } else {
      setSelectedPrices([...selectedPrices, value]);
    }
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedDistances.includes(value)) {
      setSelectedDistances(selectedDistances.filter((item) => item !== value));
    } else {
      setSelectedDistances([...selectedDistances, value]);
    }
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedFeatures.includes(value)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== value));
    } else {
      setSelectedFeatures([...selectedFeatures, value]);
    }
  };

  // Calculate active filter counts
  const cuisinesCount = selectedCuisines.length;
  const pricesCount = selectedPrices.length;
  const distancesCount = selectedDistances.length;
  const featuresCount = selectedFeatures.length;

  return (
    <div className="filter-bar mb-6">
      <div className="flex flex-wrap gap-2">
        {/* Cuisines Filter */}
        <div ref={cuisinesRef} className="relative">
          <button
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeDropdown === 'cuisines' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'
            } ${cuisinesCount > 0 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            onClick={() => toggleDropdown('cuisines')}
          >
            Cuisines
            {cuisinesCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {cuisinesCount}
              </span>
            )}
          </button>
          {activeDropdown === 'cuisines' && (
            <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 p-3 w-48 border border-gray-200">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="italian"
                    checked={selectedCuisines.includes('italian')}
                    onChange={handleCuisineChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Italian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="chinese"
                    checked={selectedCuisines.includes('chinese')}
                    onChange={handleCuisineChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Chinese</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="mexican"
                    checked={selectedCuisines.includes('mexican')}
                    onChange={handleCuisineChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mexican</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="japanese"
                    checked={selectedCuisines.includes('japanese')}
                    onChange={handleCuisineChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Japanese</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="indian"
                    checked={selectedCuisines.includes('indian')}
                    onChange={handleCuisineChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Indian</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div ref={priceRef} className="relative">
          <button
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeDropdown === 'price' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'
            } ${pricesCount > 0 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            onClick={() => toggleDropdown('price')}
          >
            Price
            {pricesCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {pricesCount}
              </span>
            )}
          </button>
          {activeDropdown === 'price' && (
            <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 p-3 w-48 border border-gray-200">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="$"
                    checked={selectedPrices.includes('$')}
                    onChange={handlePriceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>$ (Inexpensive)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="$$"
                    checked={selectedPrices.includes('$$')}
                    onChange={handlePriceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>$$ (Moderate)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="$$$"
                    checked={selectedPrices.includes('$$$')}
                    onChange={handlePriceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>$$$ (Expensive)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="$$$$"
                    checked={selectedPrices.includes('$$$$')}
                    onChange={handlePriceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>$$$$ (Very Expensive)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Distance Filter */}
        <div ref={distanceRef} className="relative">
          <button
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeDropdown === 'distance' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'
            } ${distancesCount > 0 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            onClick={() => toggleDropdown('distance')}
          >
            Distance
            {distancesCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {distancesCount}
              </span>
            )}
          </button>
          {activeDropdown === 'distance' && (
            <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 p-3 w-48 border border-gray-200">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="1km"
                    checked={selectedDistances.includes('1km')}
                    onChange={handleDistanceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Under 1 km</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="5km"
                    checked={selectedDistances.includes('5km')}
                    onChange={handleDistanceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Under 5 km</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="10km"
                    checked={selectedDistances.includes('10km')}
                    onChange={handleDistanceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Under 10 km</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="20km"
                    checked={selectedDistances.includes('20km')}
                    onChange={handleDistanceChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Under 20 km</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Features Filter */}
        <div ref={featuresRef} className="relative">
          <button
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeDropdown === 'features' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'
            } ${featuresCount > 0 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
            onClick={() => toggleDropdown('features')}
          >
            Features
            {featuresCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {featuresCount}
              </span>
            )}
          </button>
          {activeDropdown === 'features' && (
            <div className="absolute z-10 bg-white shadow-lg rounded-md mt-2 p-3 w-48 border border-gray-200">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="outdoor_seating"
                    checked={selectedFeatures.includes('outdoor_seating')}
                    onChange={handleFeatureChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Outdoor Seating</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="wifi"
                    checked={selectedFeatures.includes('wifi')}
                    onChange={handleFeatureChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Free Wi-Fi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="vegan"
                    checked={selectedFeatures.includes('vegan')}
                    onChange={handleFeatureChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Vegan Options</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="halal"
                    checked={selectedFeatures.includes('halal')}
                    onChange={handleFeatureChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Halal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="pet_friendly"
                    checked={selectedFeatures.includes('pet_friendly')}
                    onChange={handleFeatureChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pet Friendly</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Clear all filters button (shown only when filters are active) */}
        {(cuisinesCount > 0 || pricesCount > 0 || distancesCount > 0 || featuresCount > 0) && (
          <button
            onClick={() => {
              setSelectedCuisines([]);
              setSelectedPrices([]);
              setSelectedDistances([]);
              setSelectedFeatures([]);
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 flex items-center"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;