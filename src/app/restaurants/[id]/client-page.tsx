"use client";

import { useState, useEffect } from "react";
import { restaurants } from "@/data/restaurants"; // Assuming this is where your data lives
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

// Update ClientPageProps to accept searchParams as an optional prop
type ClientPageProps = {
  id: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};

const ClientPage = ({ id, searchParams }: ClientPageProps) => {
  // Decode the URL parameter if it contains special characters
  const decodedId = decodeURIComponent(id);

  // Find the restaurant - try different matching strategies
  const restaurant = restaurants.find(
    (r) =>
      r.id === decodedId ||
      r.name.toLowerCase().replace(/\s+/g, "-") === decodedId
  );

  // Handle the case when the restaurant is not found
  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl">
            Restaurant not found: "{decodedId}"
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        {/* Display searchParams if provided */}
        {searchParams && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Search Parameters:</h2>
            <pre>{JSON.stringify(searchParams, null, 2)}</pre>
          </div>
        )}
        {/* Rest of your restaurant detail UI */}
      </div>
      <Footer />
    </div>
  );
};

export default ClientPage;
