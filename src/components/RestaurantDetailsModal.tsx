import { Restaurant } from '@/data/restaurants';
import Image from 'next/image';
import { Star, Clock, MapPin, Phone, X } from 'lucide-react';

interface RestaurantDetailsModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantDetailsModal({ restaurant, onClose }: RestaurantDetailsModalProps) {
  if (!restaurant) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );

  const renderStars = (rating: number | null) => {
    const roundedRating = rating ? Math.round(rating * 2) / 2 : 0;
    return (
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">
          <Star size={18} fill="currentColor" />
        </span>
        <span className="font-medium">{roundedRating}</span>
        {restaurant.reviews && (
          <span className="text-gray-600 ml-2">({restaurant.reviews.length} reviews)</span>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="relative h-64 w-full">
          <Image 
            src={restaurant.image} 
            alt={restaurant.name}
            className="object-cover"
            fill
          />
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="mb-4">
                {renderStars(restaurant.rating)}
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-2">{restaurant.cuisine}</span>
                {restaurant.priceRange && (
                  <span className="text-gray-700">
                    {`${restaurant.priceRange.currency} ${restaurant.priceRange.min} - ${restaurant.priceRange.max}`}
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-4">{restaurant.description}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start mb-3">
                <MapPin size={18} className="text-gray-500 mr-2 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-700">{restaurant.address}</p>
                </div>
              </div>
              
              {restaurant.contact?.phone && (
  <div className="flex items-start mb-3">
    <Phone size={18} className="text-gray-500 mr-2 mt-1" />
    <div>
      <h4 className="font-semibold mb-1">Phone</h4>
      <p className="text-gray-700">{restaurant.contact.phone}</p>
    </div>
  </div>
)}

              
              {restaurant.hours && (
                <div className="flex items-start">
                  <Clock size={18} className="text-gray-500 mr-2 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <div className="text-gray-700">
                      {Object.entries(restaurant.hours).map(([day, hours]) => (
                        <div key={day} className="grid grid-cols-2 gap-2">
                          <span>{day}:</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              {restaurant.reviews?.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
