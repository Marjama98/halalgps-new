// src/components/FeaturedRestaurants.tsx
import Image from "next/image";
import { Restaurant } from "@/data/restaurants";  // Import the correct type

type FeaturedRestaurantsProps = {
  onRestaurantClick: (restaurant: Restaurant) => void;
};

const FeaturedRestaurants = ({ onRestaurantClick }: FeaturedRestaurantsProps) => {
  const featuredRestaurants: Restaurant[] = [
    {
      id: "holmlia-kulturkafe",
      name: "Holmlia kulturkafé",
      location: { city: "Oslo", country: "Norway" }, // Update location to match the expected format
      image: "/images/Holmlia.jpg",
      cuisine: "scandinavian",
      features: ["halal", "vegetarian-options"],
      type: "",
      address: "",
      price: "",
      rating: 0,
    },
    {
      id: "two-fat-ladies",
      name: "Two Fat Ladies",
      location: { city: "Stockholm", country: "Sweden" }, // Same here
      image: "/images/twofatladies.jpg",
      cuisine: "swedish",
      features: ["halal", "outdoor-seating"],
      type: "",
      address: "",
      price: "",
      rating: 0,
    },
    {
      id: "zocalo",
      name: "Zócalo",
      location: { city: "København", country: "Denmark" }, // Update location format
      image: "/images/copenhagen.png",
      cuisine: "danish",
      features: ["halal", "family-friendly"],
      type: "",
      address: "",
      price: "",
      rating: 0,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center p-20">
        <h2 className="text-3xl font-semibold mb-3">Restaurant Highlight of the Week</h2>
        <p className="text-gray-500 mb-8">Check out some of the best halal restaurants around!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
          {featuredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              onClick={() => onRestaurantClick(restaurant)}
            >
              <Image 
                src={restaurant.image} 
                alt={restaurant.name} 
                width={400} 
                height={300} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-500">{`${restaurant.location.city}, ${restaurant.location.country}`}</p> {/* Updated to show city and country */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurant.features.map((feature) => (
                    <span 
                      key={feature} 
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {feature.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
