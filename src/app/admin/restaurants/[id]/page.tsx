"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import type { Restaurant } from "@/types/types";

interface RestaurantFormProps {
  restaurant: Restaurant;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RestaurantForm = ({ restaurant, onInputChange, onCheckboxChange }: RestaurantFormProps) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={restaurant.address}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={restaurant.phone}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            name="website"
            value={restaurant.website}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={restaurant.description}
            onChange={onInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={restaurant.image}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={restaurant.isActive}
            onChange={onCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Active</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={restaurant.isFeatured}
            onChange={onCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Featured</label>
        </div>
      </div>

      {restaurant.image && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
          <div className="relative h-48 w-96">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </form>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      <p className="mt-2">Loading...</p>
    </div>
  </div>
);

const ErrorView = ({ error, onBack }: { error: string | null; onBack: () => void }) => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || "Restaurant not found"}</p>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={onBack}
        >
          Back to Restaurants
        </button>
      </div>
    </div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-500 mb-4">{message}</p>
);

const Header = ({
  onBack,
  onDelete,
  onSave,
  saving,
}: {
  onBack: () => void;
  onDelete: () => void;
  onSave: () => void;
  saving: boolean;
}) => (
  <div className="flex justify-between items-center mb-6">
    <button
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      onClick={onBack}
    >
      Back to Restaurants
    </button>
    <div className="space-x-2">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
);

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();

  if (!params || typeof params.id !== 'string' || !params.id) {
    throw new Error('Restaurant ID is missing or invalid');
  }
  const restaurantId = params.id;

  const [state, setState] = useState<{
    restaurant: Restaurant | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
  }>({
    restaurant: null,
    loading: true,
    saving: false,
    error: null
  });

  const fetchRestaurantData = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch restaurant: ${response.statusText}`);
      }
      
      const data = await response.json();
      setState(prev => ({
        ...prev,
        restaurant: data,
        loading: false,
        error: null
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load restaurant data"
      }));
      console.error('Fetch error:', err);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      restaurant: prev.restaurant ? { ...prev.restaurant, [name]: value } : null
    }));
  }, []);

  const handleCheckboxChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;
    setState(prev => ({
      ...prev,
      restaurant: prev.restaurant ? { ...prev.restaurant, [name]: checked } : null
    }));
  }, []);

  const handleSave = async () => {
    if (!state.restaurant) return;
    
    setState(prev => ({ ...prev, saving: true }));
    
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.restaurant),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`);
      }

      const updatedRestaurant = await response.json();
      setState(prev => ({
        ...prev,
        restaurant: updatedRestaurant,
        saving: false,
        error: null
      }));
      
      window.dispatchEvent(new CustomEvent('notification', { 
        detail: { message: 'Restaurant updated successfully', type: 'success' }
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        saving: false,
        error: err instanceof Error ? err.message : "Failed to save changes"
      }));
      console.error('Save error:', err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this restaurant? This action cannot be undone."
    );
    
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }

      router.push("/admin/restaurants");
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to delete restaurant"
      }));
      console.error('Delete error:', err);
    }
  };

  const { loading, error, restaurant, saving } = state;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !restaurant) {
    return <ErrorView error={error} onBack={() => router.push("/admin/restaurants")} />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header 
        onBack={() => router.push("/admin/restaurants")}
        onDelete={handleDelete}
        onSave={handleSave}
        saving={saving}
      />

      {error && <ErrorMessage message={error} />}

      <RestaurantForm
        restaurant={restaurant}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}