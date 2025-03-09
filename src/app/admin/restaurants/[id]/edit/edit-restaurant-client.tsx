// src/app/admin/restaurants/[id]/edit/edit-restaurant-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Restaurant } from "@/types/types";

interface EditRestaurantClientProps {
  id: string;
}

export default function EditRestaurantClient({ id }: EditRestaurantClientProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user?.role === "admin") {
        setIsAdmin(true);
        fetchRestaurant(id); // Now using the id prop instead of params
      }
    }
    fetchSession();
  }, [id]); // Now using the id prop in dependencies

  async function fetchRestaurant(id: string) {
    const response = await fetch(`/api/admin/restaurants/${id}`);
    const data = await response.json();
    setRestaurant(data);
  }

  // Rest of your component remains the same
  const handleSave = async () => {
    if (!restaurant) return;

    const response = await fetch(`/api/admin/restaurants/${restaurant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });

    if (response.ok) {
      router.push("/admin/restaurants");
    } else {
      alert("Failed to update restaurant");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!restaurant) return;

    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setRestaurant({ ...restaurant, [name]: checked });
    } else {
      setRestaurant({ ...restaurant, [name]: value });
    }
  };

  return (
    <div>
      <Navbar />
      {isAdmin ? (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Restaurant</h1>
          {restaurant && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={restaurant.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">
            You are not authorized to access this page.
          </h1>
        </div>
      )}
      <Footer />
    </div>
  );
}