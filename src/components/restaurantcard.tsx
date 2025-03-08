// restaurantcard.tsx

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    location: { city: string; country: string; };
    image: string;
    cuisine: string;
    features: string[];
  };
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const router = useRouter();
  
  const { id, name, location, image, cuisine, features } = restaurant;

  const handleClick = () => {
    router.push(`/restaurants/${id}`);
  };

  return (
    <div
      className="p-4 bg-white shadow rounded-lg flex flex-col hover:shadow-xl transition duration-300 cursor-pointer h-full"
      onClick={handleClick}
    >
      <div className="relative h-48 mb-4">
        <Image 
          src={image} 
          alt={name} 
          layout="fill"  
          objectFit="cover" 
          className="rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{location.city}, {location.country}</p>
      <p className="text-sm text-gray-500">{cuisine}</p>
      <div className="text-yellow-500 flex items-center mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#6D7F43"
          className="w-5 h-5 mr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.94 6.16L22 10l-5 5.11L18.12 22 12 18.85 5.88 22 7 15.11 2 10l7.06-.84L12 3z" />
        </svg>
        {features.join(', ')}
      </div>
    </div>
  );
};

export default RestaurantCard;
