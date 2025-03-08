'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString() || ""); // Sikrer at params aldri er null
  const [searchQuery, setSearchQuery] = useState(params.get("query") || ""); // Beholder søketeksten

  const categories = [
    { name: "Burger", icon: "🍔" },
    { name: "Pizza", icon: "🍕" },
    { name: "Kebab", icon: "🥙" },
    { name: "Asiatisk", icon: "🍜" },
    { name: "Dessert", icon: "🍩" },
    { name: "Grill", icon: "🔥" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Bevarer eksisterende søkefilter
    params.set("query", searchQuery);
    router.push(`/results?${params.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    // Sett kategori-parameteren og naviger til results-siden
    params.set("category", category);
    router.push(`/results?${params.toString()}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center p-10">
        {/* Søkefelt */}
        <form onSubmit={handleSearch} className="mb-6 flex justify-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Søk etter by eller restaurant..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Søk
          </button>
        </form>

        <h2 className="text-3xl font-semibold mb-6">Find Restaurant By Category</h2>
        <p className="text-gray-500 mb-8">
          Velg din favorittmat og oppdag de beste halal-restaurantene.
        </p>

        {/* Kategorier */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-gray-100 transition"
            >
              <span className="text-4xl">{category.icon}</span>
              <p className="mt-2 text-lg font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
