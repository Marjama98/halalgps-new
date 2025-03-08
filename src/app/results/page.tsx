'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { restaurants } from '@/data/restaurants';
import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import FilterBar from '@/components/filterbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import RestaurantCard from '@/components/restaurantcard';

// Create a Results component that uses the search params
function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get existing query parameters
  const query = searchParams?.get('query') ?? '';
  const cuisinesFromURL = searchParams?.get('cuisines')?.split(',').filter(Boolean) || [];
  const pricesFromURL = searchParams?.get('prices')?.split(',').filter(Boolean) || [];
  const distancesFromURL = searchParams?.get('distances')?.split(',').filter(Boolean) || [];
  const featuresFromURL = searchParams?.get('features')?.split(',').filter(Boolean) || [];

  // Get page from URL or default to 1
  const pageFromURL = searchParams?.get('page') ? parseInt(searchParams.get('page') || '1') : 1;

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState(query);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(query);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(cuisinesFromURL);
  const [selectedPrices, setSelectedPrices] = useState<string[]>(pricesFromURL);
  const [selectedDistances, setSelectedDistances] = useState<string[]>(distancesFromURL);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(featuresFromURL);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const resultsPerPage = 12; // Number of restaurants per page

  useEffect(() => {
    setSearchTerm(query);
    document.body.classList.add('bg-white');
    return () => document.body.classList.remove('bg-white');
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCuisines, selectedPrices, selectedDistances, selectedFeatures]);

  // Update current page from URL when it changes
  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  // Debounce Effect: Update debounced search term after 300ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay as specified

    return () => clearTimeout(handler); // Cleanup function
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update URL only when debounced search term changes
  useEffect(() => {
    const updateURLParams = () => {
      const params = new URLSearchParams();

      if (debouncedSearchTerm) params.set('query', debouncedSearchTerm);
      if (selectedCuisines.length) params.set('cuisines', selectedCuisines.join(','));
      if (selectedPrices.length) params.set('prices', selectedPrices.join(','));
      if (selectedDistances.length) params.set('distances', selectedDistances.join(','));
      if (selectedFeatures.length) params.set('features', selectedFeatures.join(','));
      if (currentPage > 1) params.set('page', currentPage.toString());

      router.push(`/results?${params.toString()}`, { scroll: false });
    };

    updateURLParams();
  }, [debouncedSearchTerm, selectedCuisines, selectedPrices, selectedDistances, selectedFeatures, currentPage, router]);

  // Filter restaurants based on selected filters
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) =>
      (restaurant.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ?? false) ||
      (restaurant.type?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ?? false) ||
      (restaurant.address?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ?? false)
    );
  }, [debouncedSearchTerm]);

  // Further filter based on selected filters
  const filteredByCuisinePriceDistanceAndFeature = useMemo(() => {
    return filteredRestaurants.filter((restaurant) => {
      const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.type);
      const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(restaurant.price);
      // Add distance filter logic if available in your restaurant data
      const distanceMatch = selectedDistances.length === 0 || true; // Modify based on your distance data
      const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every((feature) => restaurant.features.includes(feature));

      return cuisineMatch && priceMatch && distanceMatch && featureMatch;
    });
  }, [filteredRestaurants, selectedCuisines, selectedPrices, selectedDistances, selectedFeatures]);

  // Pagination logic
  const totalResults = filteredByCuisinePriceDistanceAndFeature.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const currentResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return filteredByCuisinePriceDistanceAndFeature.slice(startIndex, startIndex + resultsPerPage);
  }, [filteredByCuisinePriceDistanceAndFeature, currentPage, resultsPerPage]);

  const handlePageChange = (page: number) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchTerm(query); // Update search term state
    setShowSuggestions(false); // Hide suggestions after search
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);

    // Update URL immediately when a suggestion is selected
    const params = new URLSearchParams();
    params.set('query', suggestion);
    if (selectedCuisines.length) params.set('cuisines', selectedCuisines.join(','));
    if (selectedPrices.length) params.set('prices', selectedPrices.join(','));
    if (selectedDistances.length) params.set('distances', selectedDistances.join(','));
    if (selectedFeatures.length) params.set('features', selectedFeatures.join(','));

    router.push(`/results?${params.toString()}`, { scroll: false });
  };

  // Generate an array of page numbers to display in pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // If there are 7 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        pageNumbers.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  // Suggestions filter based on search term
  const suggestions = filteredRestaurants.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="content flex-grow mt-16 px-5">
        <div className="min-h-[calc(100vh-220px)]">
          <div className="mt-4 mb-12">
            <FilterBar
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
              selectedDistances={selectedDistances}
              setSelectedDistances={setSelectedDistances}
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
            />
            {/* Render filtered results */}
            <div className="grid grid-cols-3 gap-4">
              {currentResults.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </button>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={typeof page !== 'number'}
                  className={currentPage === page ? 'bg-blue-500' : ''}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Wrap Results component in Suspense boundary
export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
}
